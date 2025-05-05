import React, { useEffect, useState } from "react";
import styles from "./adminLayout.module.css";
import FlashMessage from "../components/FlashMessage/FlashMessage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });

  const [siteVisits, setSiteVisits] = useState(0);

  const [recentOrders, setRecentOrders] = useState([]);

  const weeklySalesData = [
    { date: "Mon", sales: 120 },
    { date: "Tue", sales: 200 },
    { date: "Wed", sales: 150 },
    { date: "Thu", sales: 300 },
    { date: "Fri", sales: 250 },
    { date: "Sat", sales: 400 },
    { date: "Sun", sales: 350 },
  ];

  const YearlySalesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 700 },
    { month: "Mar", sales: 900 },
    { month: "Apr", sales: 600 },
    { month: "May", sales: 1100 },
    { month: "Jun", sales: 800 },
    { month: "Jul", sales: 1200 },
    { month: "Aug", sales: 950 },
    { month: "Sep", sales: 750 },
    { month: "Oct", sales: 1050 },
    { month: "Nov", sales: 980 },
    { month: "Dec", sales: 1300 },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      const res = await fetch(`${BASE_URL}/restaurant/admin/dashboard`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setSummary(data);
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch(`${BASE_URL}/restaurant/site-visits`);
        const data = await res.json();
        setSiteVisits(data.visits);
      } catch (err) {
        console.error("Error fetching site visits:", err);
      }
    };

    fetchVisits();
  }, []);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/restaurant/admin/orders/recent-orders`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        setRecentOrders(data);
      } catch (err) {
        console.error("Error fetching recent orders:", err);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <>
      <FlashMessage />
      <div className={styles.dashboard}>
        <h2 className={styles.title}>Admin Dashboard</h2>

        {/* Summary Cards */}
        <div className={styles.cardsContainer}>
          <div className={`${styles.card} ${styles.orders}`}>
            <h3>Orders</h3>
            <p>{summary.totalOrders}</p>
          </div>
          <div className={`${styles.card} ${styles.revenue}`}>
            <h3>Revenue</h3>
            <p>{summary.totalRevenue}</p>
          </div>
          <div className={`${styles.card} ${styles.customers}`}>
            <h3>Customers</h3>
            <p>{summary.totalCustomers}</p>
          </div>
          <div className={`${styles.card} ${styles.visits}`}>
            <h3>Site Visits</h3>
            <p>{siteVisits}</p>
          </div>
        </div>

        {/* Weekly Sales Chart (Dummy Data) */}
        <div className={styles.section}>
          <h3>Weekly Sales Overview (Dummy)</h3>
          <div className={styles.chartPlaceholder}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yearly Sales Chart (Dummy Data) */}
        <div className={styles.section}>
          <h3>Yearly Sales Overview (Dummy)</h3>
          <div className={styles.chartPlaceholder}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={YearlySalesData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className={styles.section}>
          <h3>Recent Orders</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Customer</th>
                <th>Dishes</th>
                <th>Order Status</th>
                <th>Payment</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className={styles.noOrders}>
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-6).toUpperCase()}</td>
                    <td>{order.userId.username}</td>
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
                          order.status === "delivered" || "completed"
                            ? styles.statusCompleted
                            : order.status === "preparing"
                            ? styles.statusPreparing
                            : styles.statusPending
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
                    </td>
                    <td>₹{order.totalAmount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Top Dishes */}
        {/* <div className={styles.section}>
          <h3>Top Selling Dishes</h3>
          <ul className={styles.list}>
            <li>🍕 Margherita Pizza – 120 Orders</li>
            <li>🍔 Veg Burger – 95 Orders</li>
            <li>🥗 Caesar Salad – 80 Orders</li>
          </ul>
        </div> */}

        {/* Customer Insights */}
        {/* <div className={styles.section}>
          <h3>Customer Insights</h3>
          <p>
            <strong>Avg. Order Value:</strong> $22
          </p>
          <p>
            <strong>Returning Customers:</strong> 45%
          </p>
          <p>
            <strong>Peak Order Time:</strong> 7:00 PM – 9:00 PM
          </p>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
