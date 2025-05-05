import React, { useEffect, useState } from "react";
import styles from "./User.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { flashMessageActions } from "../../store/slices/flashMessage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const CurrentOrder = () => {
  const user = useSelector((store) => store.authorise);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/restaurant/orders/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
          setLoading(false);
        } else {
          console.error("Failed to load orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      }
    };

    fetchOrders();
  }, []);

  const oneDay = 24 * 60 * 60 * 1000;

  const currentOrders = orders
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      const timeDiff = now - orderDate;

      return timeDiff <= oneDay;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleRetryPayment = async (order) => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    if (!order.razorpayOrderId) {
      alert("No Razorpay order found for this order. Please contact support.");
      return;
    }

    const options = {
      key: "rzp_test_rTaOUyjCmi7198",
      amount: order.totalAmount * 100,
      currency: "INR",
      name: "Devraj's Kitchen",
      description: "Retrying payment for Order",
      order_id: order.razorpayOrderId, // 👈 use existing order ID
      handler: async function (response) {
        const data = {
          orderCreationId: order.razorpayOrderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const verifyRes = await fetch(
          `${BASE_URL}/restaurant/payment/success`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );

        const result = await verifyRes.json();
        if (result.success) {
          setOrders((prevOrders) =>
            prevOrders.map((prevOrder) =>
              prevOrder._id === order._id
                ? { ...prevOrder, paymentStatus: "paid" }
                : prevOrder
            )
          );

          dispatch(
            flashMessageActions.setFlashMessage({
              message: "Payment completed successfully!",
              type: "success",
            })
          );
        } else {
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: user.username,
        contact: user.phoneNo,
      },
      theme: {
        color: "#ff6f3c", // a vibrant food-friendly orange
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
    <div className={styles.currentOrderContainer}>
      <h2 className={styles.heading}>Your Ongoing Orders</h2>

      {loading ? (
        <LoadingSpinner />
      ) : currentOrders.length == 0 ? (
        <div className={styles.emptyState}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046750.png"
            alt="empty"
            className={styles.emptyImage}
          />
          <h3>No current orders</h3>
          <p>Looks like you haven’t placed any orders yet.</p>
          <Link to="/restaurant/menu" className={styles.orderBtn}>
            Explore Menu
          </Link>
        </div>
      ) : (
        currentOrders.map((order, index) => {
          return (
            <div key={index} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <p>
                  <strong>Order ID:</strong>{" "}
                  {order.razorpayOrderId || order._id}
                </p>
                <p>
                  <strong>Order Status:</strong> {order.status}
                </p>
                <p>
                  <strong>ETA:</strong> {order.ETA + " min"}
                </p>
              </div>

              <hr className={styles.divider} />

              <div className={styles.orderItems}>
                {order.items.map((item, idx) => (
                  <div key={idx} className={styles.item}>
                    <p>
                      {item.dishId.name} × {item.quantity}
                    </p>
                    <p>₹{item.dishId.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <hr className={styles.divider} />

              <div className={styles.total}>
                <div>Total: ₹{order.totalAmount}</div>

                <div>payment method: {order.paymentMethod}</div>

                <div>
                  payment status: {order.paymentStatus}
                  {order.paymentMethod === "online" &&
                    order.paymentStatus === "unpaid" && (
                      <button
                        className={styles.payNowButton}
                        onClick={() => handleRetryPayment(order)}
                      >
                        Pay Now
                      </button>
                    )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CurrentOrder;
