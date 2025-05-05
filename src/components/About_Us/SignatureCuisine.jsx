import styles from "./AboutUs.module.css";
import signatureCuisineVideo from "../../assets/about us/signatureCuisineVideo.mp4";

const SignatureCuisine = () => {
  return (
    <section className={styles.cuisineSection}>
      <div className={styles.cuisineSection_text}>
        <h2>Signature Cuisine</h2>
        <p>
          Welcome to a culinary journey like no other. Our signature dishes
          combine the artistry of classic recipes with the excitement of modern
          flavors. Each plate is thoughtfully crafted to awaken your taste buds
          and create lasting memories.
        </p>
        <p>
          We take pride in sourcing fresh, local ingredients to ensure every
          bite is bursting with authenticity. From the vibrant spices of our
          Chilli Chicken to the creamy indulgence of our Cheesecake, every dish
          tells a story of passion and tradition. At the heart of our kitchen is
          a commitment to delivering excellence and innovation, creating meals
          that are as delightful to the eye as they are to the palate.
        </p>
      </div>

      <div className={styles.cuisine_video}>
        <video autoPlay muted loop>
          <source src={`${signatureCuisineVideo}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.cuisineVideoOverlay}></div>
      </div>
    </section>
  );
};

export default SignatureCuisine;
