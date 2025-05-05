import React from "react";
import styles from "./User.module.css";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.authorise);

  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.profile_card}>
        <h2 className={styles.profile_header}>👤 My Profile</h2>
        <div className={styles.info_item}>
          <FaUser className={styles.icon} />
          <span>{user.username}</span>
        </div>
        <div className={styles.info_item}>
          <FaEnvelope className={styles.icon} />
          <span>{user.email}</span>
        </div>
        <div className={styles.info_item}>
          <FaPhoneAlt className={styles.icon} />
          <span>{user.phoneNo || "Not Provided"}</span>
        </div>
        <div className={styles.info_item}>
          <FaMapMarkerAlt className={styles.icon} />
          <span>{user.address || "Not Provided"}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
