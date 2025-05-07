import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Checkout.module.css";
import { orderSliceActions } from "../../store/slices/order";
import { cartActions } from "../../store/slices/cart";
import { useNavigate } from "react-router-dom";
import { flashMessageActions } from "../../store/slices/flashMessage";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Checkout = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.authorise);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("Cash");

  // Calculate total cart amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.dishId.price * item.quantity,
    0
  );

  // Handle checkout form submission
  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (paymentMode === "Online") {
      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // Create order on backend
      const response = await fetch(`${BASE_URL}/restaurant/payment/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount * 100,
          items: cartItems,
        }),
        credentials: "include",
      });

      const orderRes = await response.json();
      const order = orderRes.order;

      if (!order) {
        alert("Server error. Are you online?");
        return;
      }

      // saving initial order too in redux store
      const response2 = await fetch(
        `${BASE_URL}/restaurant/orders/${user._id}`
      );
      const allOrders1 = await response2.json();
      dispatch(orderSliceActions.setOrders(allOrders1.orders));

      const newCartRes = await fetch(
        `${BASE_URL}/restaurant/cart/remove-multiple`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            dishIds: cartItems.map((item) => item.dishId._id),
          }),
        }
      );

      const newCartData = await newCartRes.json();
      const newCart = newCartData.cart;
      dispatch(cartActions.setCart(newCart.items));

      // Razorpay payment options
      const options = {
        key: "rzp_test_rTaOUyjCmi7198", // Replace with your Razorpay key
        amount: order.amount,
        currency: "INR",
        name: "Devraj's Kitchen",
        description: "In-Restaurant Order",
        order_id: order.id,
        handler: async function (response) {
          // Confirm payment on backend
          const data = {
            orderCreationId: order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const res = await fetch(`${BASE_URL}/restaurant/payment/success`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const result = await res.json();

          if (result.success) {
            // saving final paid order too in redux store
            const response3 = await fetch(
              `${BASE_URL}/restaurant/orders/${user._id}`
            );
            const allOrders2 = await response3.json();
            dispatch(orderSliceActions.setOrders(allOrders2.orders));

            navigate("/restaurant/user/current-order");
            dispatch(
              flashMessageActions.setFlashMessage({
                message: "your order placed successfully",
                type: "success",
              })
            );
          }
        },
        prefill: {
          name: data.name,
          contact: data.phone,
        },
        theme: { color: "#ff5722" },
        modal: {
          // this is the key part
          ondismiss: function () {
            // navigate to current order page even if payment wasn't successful
            navigate("/restaurant/user/current-order");
            dispatch(
              flashMessageActions.setFlashMessage({
                message: "Payment was not completed. You can try again!",
                type: "error",
              })
            );
          },
        },
      };

      // Open Razorpay payment window
      const rzp = new window.Razorpay(options);
      rzp.open(); // This line opens Razorpay's checkout window where the user actually pays
      setIsLoading(false);
    } else {
      const response = await fetch(`${BASE_URL}/restaurant/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          items: cartItems,
          totalAmount: totalAmount,
          paymentMethod: "cash",
          paymentStatus: "unpaid", // since it's COD
        }),
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        // Update orders in Redux
        const response2 = await fetch(
          `${BASE_URL}/restaurant/orders/${user._id}`
        );
        const allOrders = await response2.json();
        dispatch(orderSliceActions.setOrders(allOrders));

        // Clear cart
        const newCartRes = await fetch(
          `${BASE_URL}/restaurant/cart/remove-multiple`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user._id,
              dishIds: cartItems.map((item) => item.dishId._id),
            }),
          }
        );

        const newCartData = await newCartRes.json();
        const newCart = newCartData.cart;
        dispatch(cartActions.setCart(newCart.items));

        // Flash message and redirect
        dispatch(
          flashMessageActions.setFlashMessage({
            message: "Your COD order placed successfully!",
            type: "success",
          })
        );

        navigate("/restaurant/user/current-order");
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: "Something went wrong. Please try again!",
            type: "error",
          })
        );
      }
      setIsLoading(false);
    }
  };

  // Load Razorpay checkout script dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => {
        alert("Razorpay SDK failed to load");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkoutWrapper}>
        <h2 className={styles.checkoutTitle}>Confirm Your Order</h2>

        <div className={styles.orderSummary}>
          {cartItems.map((item, idx) => (
            <div key={idx} className={styles.orderItem}>
              <strong>{item.dishId.name}</strong> × {item.quantity} = ₹
              {item.dishId.price * item.quantity}
            </div>
          ))}
          <hr />
          <h3 className={styles.total}>Total: ₹{totalAmount}</h3>
        </div>

        <form onSubmit={handleCheckout} className={styles.checkoutForm}>
          <label className={styles.label} htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className={styles.input}
            defaultValue={user.username}
            required
          />

          <label className={styles.label} htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className={styles.input}
            defaultValue={user.phoneNo}
            required
          />

          <div className={styles.paymentOptions}>
            <label>
              <input
                type="radio"
                name="payment"
                value="Cash"
                checked={paymentMode === "Cash"}
                onChange={(e) => setPaymentMode(e.target.value)}
              />{" "}
              Cash
            </label>
            <label style={{ marginLeft: "1rem" }}>
              <input
                type="radio"
                name="payment"
                value="Online"
                checked={paymentMode === "Online"}
                onChange={(e) => setPaymentMode(e.target.value)}
              />{" "}
              Online
            </label>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span> Placing Order...
              </>
            ) : (
              <>Place Order & {paymentMode === "Online" ? "Pay" : "Confirm"}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
