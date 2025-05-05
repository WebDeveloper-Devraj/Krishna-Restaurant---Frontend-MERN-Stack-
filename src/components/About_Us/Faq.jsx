import styles from "./AboutUs.module.css";

const Faq = () => {
  return (
    <section className={styles.faqSection}>
      <h2>Frequently Asked Questions</h2>
      <div className={styles.faqs}>
        <div className={styles.faq}>
          <h3>Do you offer catering services?</h3>
          <p>
            Yes, we offer catering for events of all sizes. Contact us for
            details!
          </p>
        </div>
        <div className={styles.faq}>
          <h3>Are reservations required?</h3>
          <p>Reservations are recommended for weekends and large groups.</p>
        </div>
        <div className={styles.faq}>
          <h3>Do you have vegetarian options?</h3>
          <p>
            Yes, we have a variety of vegetarian dishes available on our menu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faq;
