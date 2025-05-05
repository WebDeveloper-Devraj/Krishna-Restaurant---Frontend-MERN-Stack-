import React, { useEffect, useState } from "react";
import styles from "./OrderHistory.module.css";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((store) => store.authorise);
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

  const orderHistory = orders
    .slice() // avoid mutating Redux state
    .filter(
      (order) => order.status === "delivered" || order.status === "cancelled"
    ) // filter by status
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
    .map((order) => ({
      orderId: order.razorpayOrderId,
      date: new Date(order.createdAt).toLocaleString(),
      items: order.items.map((item) => ({
        name: item.dishId?.name,
        quantity: item.quantity,
        price: item.dishId?.price,
      })),
      total: order.totalAmount,
      status: order.status,
    }));

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Order History</h2>
      {loading ? (
        <LoadingSpinner />
      ) : orderHistory.length === 0 ? (
        <p className={styles.noOrder}>You haven't placed any orders yet.</p>
      ) : (
        orderHistory.map((order) => (
          <div className={styles.orderCard} key={order.orderId}>
            <div className={styles.orderHeader}>
              <span>
                <strong>Order ID:</strong> {order.orderId}
              </span>
              <span>
                <strong>Date:</strong> {order.date}
              </span>
            </div>
            <ul className={styles.itemList}>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} × {item.quantity} — ₹{item.price}
                </li>
              ))}
            </ul>
            <div className={styles.orderFooter}>
              <span className={styles.total}>Total: ₹{order.total}</span>
              <span
                className={`${styles.status} ${
                  styles[order.status.toLowerCase()]
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
