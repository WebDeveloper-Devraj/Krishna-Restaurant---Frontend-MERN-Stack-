import { Link } from "react-router-dom";
import styles from "./FeaturedDishes.module.css";
import FeaturedDishCard from "./FeaturedDishCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { menuCategoriesActions } from "../../store/slices/menuCategories";
import { flashMessageActions } from "../../store/slices/flashMessage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const FeaturedDishes = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((store) => store.menuCategories.dishes);
  const featuredDishes = dishes.filter((dish) => dish.featured);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      const response = await fetch(`${BASE_URL}/restaurant/dishes`);
      const data = await response.json();
      if (data.success) {
        dispatch(menuCategoriesActions.setDishes(data.dishes)); // Save fetched data in Redux
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: "Error in fetching dishes!",
            type: "error",
          })
        );
      }
      setLoading(false);
    };

    fetchDishes();
  }, [dispatch]);

  return (
    <section id={styles.featured_dishes}>
      <h2>
        <span>Today's Specials</span>
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : featuredDishes.length == 0 ? (
        <p className={styles.no_dishes_msg}>
          No featured dishes available today.
        </p>
      ) : (
        <div className={styles.dish_cards}>
          {featuredDishes.map((dish, index) => (
            <FeaturedDishCard key={index} dish={dish} />
          ))}
        </div>
      )}

      <Link to="/restaurant/menu">
        <button className={`${styles.cta_btn} ${styles.view_menu}`}>
          View Full Menu
        </button>
      </Link>
    </section>
  );
};

export default FeaturedDishes;
