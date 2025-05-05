import React, { useEffect, useState } from "react";
import styles from "./CartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart } from "../../store/slices/cart";
import { flashMessageActions } from "../../store/slices/flashMessage";

const CartPage = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.authorise);
  const userId = user ? user._id : null;

  // fetch user cart details
  useEffect(() => {
    if (userId) dispatch(fetchCart(userId));
  }, [userId]);

  // Calculate Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.dishId.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      navigate("/restaurant/user/login");
      dispatch(
        flashMessageActions.setFlashMessage({
          message: "You must login before checkout!",
          type: "error",
        })
      );
    } else {
      navigate("/restaurant/checkout");
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.cartContainer}>
        <h2 className={styles.cartHeading}>Your Order</h2>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is empty.</p>
            <Link to="/restaurant/menu">
              <button className={styles.browseBtn}>Browse Menu</button>
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <Link
                  to={`/restaurant/dishes/${item.dishId._id}`}
                  key={item.dishId._id}
                  className={styles.link}
                >
                  <div className={styles.cartItem}>
                    <img src={item.dishId.image} alt={item.dishId.name} />
                    <div className={styles.details}>
                      <h3>{item.dishId.name}</h3>
                      <p>Price: ₹{item.dishId.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <hr />
                </Link>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <h3>Total: ₹{totalPrice}</h3>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
