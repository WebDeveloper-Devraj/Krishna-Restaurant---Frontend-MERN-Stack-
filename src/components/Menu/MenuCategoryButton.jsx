import { useDispatch } from "react-redux";
// import { menuCategoriesActions } from "../store/menuCategories";
import { menuCategoriesActions } from "../../store/slices/menuCategories";
import styles from "./MenuCategoryButton.module.css";

const MenuCategoryButton = ({ category, activeCategory }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${activeCategory === category ? styles.active : ""}`}
      onClick={() => {
        dispatch(menuCategoriesActions.setActiveCategory(category));
      }}
    >
      {category}
    </button>
  );
};

export default MenuCategoryButton;
