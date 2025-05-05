import styles from "./ContactUs.module.css";
import contactHero from "../../assets/contactUs/contactHero.png";

const ContactHeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay}>
        <img src={contactHero} alt="contact image" />
        <h1>Contact Us</h1>
        <p>
          We’re here to help! Get in touch with us for any queries or feedback.
        </p>
      </div>
    </section>
  );
};

export default ContactHeroSection;
