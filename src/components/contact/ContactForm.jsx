import { useState } from "react";
import styles from "./ContactUs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { flashMessageActions } from "../../store/slices/flashMessage";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ContactForm = () => {
  const [validated, setValidated] = useState(false);
  const user = useSelector((store) => store.authorise);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/restaurant/user/login");
      dispatch(
        flashMessageActions.setFlashMessage({
          message: "Please log in before submitting review!",
          type: "error",
        })
      );
      return;
    }

    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Prevent actual submission
      setValidated(true); // ✅ Only enable validation styling when invalid
      return;
    } else {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      setIsSubmitting(true); // start

      const response = await fetch(`${BASE_URL}/restaurant/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      setIsSubmitting(false); // finally

      if (result.success) {
        form.reset(); // ✅ Clear form fields
        setValidated(false); // ✅ Reset validation styling
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "success",
          })
        );
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "error",
          })
        );
      }
    }
  };

  return (
    <section className={styles.contactFormSection}>
      <h2>Send Us a Message</h2>
      <form
        className={`${styles.contactForm} ${
          validated ? "was-validated" : ""
        } needs-validation`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className={styles.formGroup}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            defaultValue={user ? user.username : ""}
            required
            className={`${styles.formInput} form-control`}
            placeholder="name"
          />

          <div className="invalid-feedback" style={{ marginBottom: "-10px" }}>
            Please enter your name
          </div>

          <div className="valid-feedback" style={{ marginBottom: "-10px" }}>
            Looks good!
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className={`${styles.formTextarea} form-control`}
            placeholder="Enter your message"
          ></textarea>

          <div className="invalid-feedback" style={{ marginBottom: "-10px" }}>
            Please enter your message
          </div>

          <div className="valid-feedback" style={{ marginBottom: "-10px" }}>
            Looks good!
          </div>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
