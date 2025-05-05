import React from "react";
import { Outlet } from "react-router-dom"; // Outlet will render the nested routes
import styles from "./AdminLayout.module.css";
import AdminHeader from "./AdminHeader";
import Dashboard from "./Dashboard";

const AdminLayout = () => {
  return (
    <div className={styles["admin-layout"]}>
      <AdminHeader />
      <Dashboard />
      <main>
        <Outlet /> {/* This will render the admin page components */}
      </main>
    </div>
  );
};

export default AdminLayout;
