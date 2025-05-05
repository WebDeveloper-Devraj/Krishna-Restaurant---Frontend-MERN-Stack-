import styles from "./AboutUs.module.css";

const ReviewCard = ({ testimonial }) => {
  return (
    <div className={styles.review}>
      <blockquote>"{testimonial.review}"</blockquote>
      <blockquote>rating: {testimonial.rating}</blockquote>
      <p> - {testimonial.name}</p>
    </div>
  );
};

export default ReviewCard;
