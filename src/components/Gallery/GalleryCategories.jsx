import styles from "./Gallery.module.css";
import GalleryCategoryButtons from "./GalleryCategoryButtons";
import GallerySubCategoryButtons from "./GallerySubCategoryButtons";
import GalleryItems from "./GalleryItems";

const Categories = () => {
  return (
    <section className={styles.categoriesSection}>
      <h2>Our Gallery</h2>
      <GalleryCategoryButtons />
      <GallerySubCategoryButtons />
      <GalleryItems />
    </section>
  );
};

export default Categories;
