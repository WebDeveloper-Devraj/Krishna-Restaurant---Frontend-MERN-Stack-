import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>404</h1>
        <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/restaurant" className={styles.homeLink}>
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
