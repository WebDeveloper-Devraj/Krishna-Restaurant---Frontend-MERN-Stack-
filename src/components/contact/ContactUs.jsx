import React from "react";
import styles from "./ContactUs.module.css";
import ContactHeroSection from "./ContactHeroSection";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <div className={styles.contactUsPage}>
      <ContactHeroSection />
      <ContactDetails />
      <ContactForm />
    </div>
  );
};

export default ContactUs;
