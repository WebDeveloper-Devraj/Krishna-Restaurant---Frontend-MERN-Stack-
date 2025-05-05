import styles from "./Testimonials.module.css";
import TestimonialCard from "./TestimonialCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { flashMessageActions } from "../../store/slices/flashMessage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Testimonials = () => {
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
    <section id={styles.testimonials}>
      <h2>
        <span>What Our Customers Say</span>
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : testimonials.length === 0 ? (
        <p className={styles.no_testimonials_msg}>
          No testimonials available yet.
        </p>
      ) : (
        <div className={styles.testimonial_cards}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard testimonial={testimonial} key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonials;
