import { useDispatch } from "react-redux";
import styles from "./AboutUs.module.css";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Review = () => {
  const [testimonials, setTestimonials] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonial = async () => {
      const res = await fetch(`${BASE_URL}/restaurant/testimonial`);
      const data = await res.json();

      if (data.success) {
        setTestimonials(data.testimonials);
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: "Error in fetching reviews!",
            type: "error",
          })
        );
      }
      setLoading(false);
    };

    fetchTestimonial();
  }, []);

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.reviewsDiv}>
        <h2>Reviews</h2>
        {loading ? (
          <LoadingSpinner />
        ) : testimonials.length === 0 ? (
          <p className={styles.no_reviews_msg}>No reviews available yet.</p>
        ) : (
          <div className={styles.reviews}>
            {testimonials.map((testimonial, index) => (
              <ReviewCard key={index} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Review;
