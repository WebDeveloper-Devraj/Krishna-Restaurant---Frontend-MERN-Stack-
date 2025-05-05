import { useSelector } from "react-redux";
import styles from "./Gallery.module.css";
import GallerySubCategoryButton from "./GallerySubCategoryButton";

const GallerySubCategoryButtons = () => {
  const { activeSubCategory, subCategories } = useSelector(
    (store) => store.galleryCategories
  );

  return (
    <div className={styles.subCategories}>
      {subCategories.map((subCategory) => (
        <GallerySubCategoryButton
          key={subCategory}
          category={subCategory}
          activeSubCategory={activeSubCategory}
        />
      ))}
    </div>
  );
};

export default GallerySubCategoryButtons;
