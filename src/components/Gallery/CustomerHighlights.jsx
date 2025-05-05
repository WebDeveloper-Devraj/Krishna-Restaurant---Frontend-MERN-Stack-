import { useSelector } from "react-redux";
import styles from "./Gallery.module.css";
import CustomerPhoto from "./CustomerPhoto";

const CustomerHighlights = () => {
  const { galleryImages: images } = useSelector(
    (store) => store.galleryCategories
  );

  return (
    <section className={styles.customerHighlightsSection}>
      <h2>Customer Highlights</h2>
      <p>Tag us @krishnaRestaurant to get featured in our gallery!</p>

      {images.length === 0 ? (
        <p className={styles.no_highlights_msg}>
          No customer highlights yet. Be the first to get featured!
        </p>
      ) : (
        <div className={styles.customerGallery}>
          {images.map((image, index) => (
            <CustomerPhoto key={index} image={image} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CustomerHighlights;
