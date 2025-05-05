import React from "react";
import styles from "./LoadingSpinner.module.css"; // ✅ Correct import for CSS Module

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner} />
    </div>
  );
};

export default LoadingSpinner;
