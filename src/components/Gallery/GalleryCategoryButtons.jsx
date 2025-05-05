import GalleryCategoryButton from "./GalleryCategoryButton";
import { useSelector } from "react-redux";
import styles from "./Gallery.module.css";

const GalleryCategoryButtons = () => {
  const { activeCategory, categories } = useSelector(
    (store) => store.galleryCategories
  );

  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <GalleryCategoryButton
          key={category}
          category={category}
          activeCategory={activeCategory}
        />
      ))}
    </div>
  );
};

export default GalleryCategoryButtons;
