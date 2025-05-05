import styles from "./Testimonials.module.css";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className={styles.testimonial_card}>
      <p>"{testimonial.review}"</p>
      <p>rating: {testimonial.rating}</p>
      <h4>- {testimonial.name}</h4>
    </div>
  );
};

export default TestimonialCard;
