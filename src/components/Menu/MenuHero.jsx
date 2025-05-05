import styles from "./MenuPage.module.css";
import menuHero from "../../assets/menuHero.mp4";
import { Link } from "react-router-dom";

const MenuHero = () => {
  return (
    <section className={styles.hero_section}>
      {/* Background Video */}
      <div className={styles.video_background}>
        <video autoPlay muted loop>
          <source src={`${menuHero}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay for text visibility */}
      <div className={styles.overlay}></div>

      {/* Centered Content */}
      <div className={styles.content}>
        <h1>Explore Our Delicious Menu</h1>
        <p>From appetizers to desserts, savor the taste of excellence!</p>

        {/* CTA Buttons */}
        <div className={styles.cta_buttons}>
          <Link to="/restaurant/gallery">
            <button className={`${styles.cta_btn} ${styles.view_gallery}`}>
              View Gallery
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuHero;
