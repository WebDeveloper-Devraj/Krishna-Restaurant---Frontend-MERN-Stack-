import { useState } from "react";
import styles from "./Gallery.module.css";

const GallerySubmition = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Prevent actual submission
    } else {
      // form submition logic
    }

    setValidated(true);
  };

  return (
    <section className={styles.submissionSection}>
      <h2>Submit Your Photos</h2>
      <form
        className={`${styles.submissionForm} ${
          validated ? "was-validated" : ""
        } needs-validation`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            required
          />

          <div className="invalid-feedback" style={{ marginBottom: "-10px" }}>
            Please enter your name
          </div>

          <div className="valid-feedback" style={{ marginBottom: "-10px" }}>
            looks good!
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            required
          />

          <div className="invalid-feedback" style={{ marginBottom: "-10px" }}>
            Please enter a valid email
          </div>

          <div className="valid-feedback" style={{ marginBottom: "-10px" }}>
            looks good!
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="review">Description</label>
          <textarea
            id="review"
            rows="4"
            className="form-control"
            placeholder="Enter description"
            required
          ></textarea>

          <div className="invalid-feedback" style={{ marginBottom: "-10px" }}>
            Please provide description
          </div>
          <div
            className="valid-feedback"
            style={{ marginBottom: "-10px" }}
          >
            looks good!
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="photo">Upload Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="form-control"
            placeholder="Upload your photo"
            required
          />

          <div className="invalid-feedback" style={{ marginBottom: "-10px" }}>
            Please choose a photo
          </div>

          <div
            className="valid-feedback"
            style={{ marginBottom: "-10px" }}
          >
            looks good!
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default GallerySubmition;
