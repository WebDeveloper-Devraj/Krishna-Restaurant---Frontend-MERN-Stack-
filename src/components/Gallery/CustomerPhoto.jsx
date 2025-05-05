import styles from "./Gallery.module.css";

const CustomerPhoto = ({ index, image }) => {
  return (
    <div key={index} className={styles.customerItem}>
      <img src={image.img} alt={`Customer ${index + 1}`} />
    </div>
  );
};

export default CustomerPhoto;
