import React, { useEffect, useState } from "react";
import styles from "./adminLayout.module.css";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/restaurant/admin/orders`, {
          credentials: "include",
        });
        const data = await res.json();

        const sortedOrders = data.orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `${BASE_URL}/restaurant/admin/orders/update-status/${orderId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update order");

      const result = await res.json();
      if (result.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: status } : order
          )
        );
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const handleMarkAsPaid = async (orderId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/restaurant/admin/orders/update-payment/${orderId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus: "paid" }),
        }
      );

      if (!res.ok) throw new Error("Failed to update payment status");

      const result = await res.json();

      if (result.success) {
        setOrders((prevOrders) =>
          prevOrders.map((prevOrder) =>
            prevOrder._id === orderId
              ? { ...prevOrder, paymentStatus: "paid" }
              : prevOrder
          )
        );
      }
    } catch (err) {
      console.error("Error updating payment status:", err);
    }
  };

  const renderOrderStatus = (order) => {
    if (order.status !== "completed" && order.status !== "delivered") {
      return (
        <button
          className={styles.markCompleteButton}
          onClick={() => handleUpdateStatus(order._id, "completed")}
        >
          Mark as Completed
        </button>
      );
    } else if (order.status === "completed") {
      return (
        <>
          <button className={styles.completeButton}>Completed</button>
          <button
            className={styles.markDeliverButton}
            onClick={() => handleUpdateStatus(order._id, "delivered")}
          >
            Mark as Delivered
          </button>
        </>
      );
    } else if (order.status === "delivered") {
      return <button className={styles.deliveredButton}>Delivered</button>;
    }
  };

  return (
    <div className={styles["manage-orders"]}>
      <h2 className={styles.heading}>Manage Orders</h2>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Dish(es)</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className={styles.noData}>
                No orders to display.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-6).toUpperCase()}</td>
                <td>{order.userId?.username || "Guest"}</td>
                <td>
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.dishId?.name || "Dish"} (x{item.quantity})
                      {i < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </td>
                <td>
                  <span
                    className={
                      order.status === "pending"
                        ? styles.statusPending
                        : order.status === "preparing"
                        ? styles.statusPreparing
                        : order.status === "completed"
                        ? styles.statusCompleted
                        : styles.statusCompleted
                    }
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      order.paymentStatus === "paid"
                        ? styles.statusPaid
                        : styles.statusUnpaid
                    }
                  >
                    {order.paymentStatus}
                  </span>
                  {order.paymentMethod === "cash" &&
                    order.paymentStatus === "unpaid" && (
                      <button
                        className={styles.markPaidButton}
                        onClick={() => handleMarkAsPaid(order._id)}
                      >
                        Mark as Paid
                      </button>
                    )}
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{renderOrderStatus(order)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
