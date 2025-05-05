import { Link } from "react-router-dom";
import styles from "./FeaturedDishes.module.css";

const FeaturedDishCard = ({ dish }) => {
  const truncateDescription = (text, maxWords = 10) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + " ...";
  };

  return (
    <Link
      to={`/restaurant/dishes/${dish._id}`}
      className={`card ${styles.dish_card}`}
    >
      <img
        src={dish.image}
        className="card-img-top"
        alt={dish.name}
      />
      <div className={`card-body ${styles.cardBody}`}>
        <h3 className={`card-title ${styles.dishTitle}`}>{dish.name}</h3>
        <p className={`card-text ${styles.dish_description}`}>
          {truncateDescription(dish.description, 10)}
        </p>
        <span className={styles.dish_price}>&#x20B9; {dish.price}</span>
        <div>
          <button
            className={`btn btn-primary ${styles.cta_btn} ${styles.order_now}`}
          >
            Order Now
          </button>
        </div>
      </div>
    </Link>
  );
};
export default FeaturedDishCard;
