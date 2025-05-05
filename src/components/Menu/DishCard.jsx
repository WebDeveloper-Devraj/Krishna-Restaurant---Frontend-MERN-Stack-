import { Link } from "react-router-dom";
import styles from "./MenuPage.module.css";

const DishCard = ({ dish }) => {
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
      <img src={dish.image} alt={dish.name} />
      <div className={styles.dish_card_body}>
        <h3>{dish.name}</h3>
        <p>{truncateDescription(dish.description, 10)}</p>
      </div>
      <span>&#x20B9; {dish.price}</span>
      <center>
        <button className={styles.order_btn}>Order Now</button>
      </center>
    </Link>
  );
};

export default DishCard;
