import styles from "./Gallery.module.css";

const GalleryPhotos = ({ images }) => {
  return images.map((image, index) => (
    <div key={index} className={styles.galleryItem}>
      <img src={image.url} alt={`Gallery Item ${index + 1}`} />
    </div>
  ));
};

export default GalleryPhotos;
