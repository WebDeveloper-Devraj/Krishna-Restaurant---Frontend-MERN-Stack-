import { useDispatch } from "react-redux";
import styles from "./GallerySubCategoryButton.module.css";
import { galleryCategoriesActions } from "../../store/slices/galleryCategories";

const GallerySubCategoryButton = ({ category, activeSubCategory }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${activeSubCategory === category ? styles.subActive : ""}`}
      onClick={() => {
        dispatch(galleryCategoriesActions.setActiveSubCategory(category));
      }}
    >
      {category}
    </button>
  );
};

export default GallerySubCategoryButton;
