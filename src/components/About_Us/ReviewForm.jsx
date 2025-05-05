import { useState } from "react";
import styles from "./AboutUs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { flashMessageActions } from "../../store/slices/flashMessage";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ReviewForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authorise);

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
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
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Prevent actual submission
    } else {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.userId = user._id;

      const response = await fetch(`${BASE_URL}/restaurant/testimonial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);
      if (result.success) {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: "Review submitted successfully.",
            type: "success",
          })
        );
      }
    }

    setValidated(true);
  };

  return (
    <section className={styles.reviewForm}>
      <div className={styles.reviewFormDiv}>
        <h2>Leave a Review</h2>
        <form
          className={`${styles.form} ${
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
              defaultValue={user ? user.username : ""}
              placeholder="Enter your name"
              required
            />
            <div className="invalid-feedback" style={{ marginBottom: "-15px" }}>
              Please enter your name.
            </div>

            <div className="valid-feedback" style={{ marginBottom: "-10px" }}>
              looks good!
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="review">Review</label>
            <textarea
              id="review"
              rows="4"
              name="review"
              className="form-control"
              placeholder="Give your review"
              required
            ></textarea>
            <div className="invalid-feedback" style={{ marginBottom: "-15px" }}>
              Please give your review.
            </div>

            <div className="valid-feedback" style={{ marginBottom: "-10px" }}>
              looks good!
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="rating">Rating</label>
            <select id="rating" name="rating" className="form-control">
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Terrible</option>
            </select>
            <div className="invalid-feedback" style={{ marginBottom: "-15px" }}>
              Please give ratings.
            </div>

            <div className="valid-feedback" style={{ marginBottom: "-10px" }}>
              looks good!
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
