import { useDispatch } from "react-redux";
import styles from "./GalleryCategoryButton.module.css";
import { galleryCategoriesActions } from "../../store/slices/galleryCategories";

const GalleryCategoryButton = ({ category, activeCategory }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${activeCategory === category ? styles.active : ""}`}
      onClick={() => {
        dispatch(galleryCategoriesActions.setActiveCategory(category));
      }}
    >
      {category}
    </button>
  );
};

export default GalleryCategoryButton;
