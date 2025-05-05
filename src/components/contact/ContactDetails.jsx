import styles from "./ContactUs.module.css";

const ContactDetails = () => {
  return (
    <section className={styles.contactDetailsSection}>
      <h2>Our Contact Information</h2>
      <p>Feel free to reach out to us using any of the methods below:</p>
      <div className={styles.contactDetails}>
        <div className={styles.contactItem}>
          <h3>Email</h3>
          <p>devrajpujari292@gmail.com</p>
        </div>
        <div className={styles.contactItem}>
          <h3>Phone</h3>
          <p>+91 9321892873</p>
        </div>
        <div className={styles.contactItem}>
          <h3>Address</h3>
          <p>Sariput nagar, MIDC andheri(E), mumbai-400093</p>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
