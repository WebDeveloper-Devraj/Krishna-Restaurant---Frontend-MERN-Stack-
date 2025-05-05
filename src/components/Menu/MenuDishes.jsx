import styles from "./MenuPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import DishCard from "./DishCard";
import { menuCategoriesActions } from "../../store/slices/menuCategories";
import { flashMessageActions } from "../../store/slices/flashMessage";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const MenuDishes = () => {
  const { dishes, activeCategory } = useSelector(
    (store) => store.menuCategories
  );
  const dispatch = useDispatch();
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

  const filteredDishes =
    activeCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory);

  return (
    <div className={styles.dishes}>
      {loading ? (
        <LoadingSpinner />
      ) : filteredDishes.length === 0 ? (
        <p className={styles.no_dishes_msg}>
          No dishes found in this category.
        </p>
      ) : (
        filteredDishes.map((dish) => <DishCard key={dish._id} dish={dish} />)
      )}
    </div>
  );
};

export default MenuDishes;
