import aboutUsHero from "../../assets/about us/aboutUsHero.mp4";
import { Link } from "react-router-dom";
import styles from "./AboutUs.module.css";

const AboutUsHero = () => {
  return (
    <section className={styles.hero_section}>
      {/* Background Video */}
      <div className={styles.video_background}>
        <video autoPlay muted loop>
          <source src={`${aboutUsHero}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay for text visibility */}
      <div className={styles.overlay}></div>

      {/* Centered Content */}
      <div className={styles.content}>
        <h1>Experience the Art of Culinary Excellence</h1>
        <p>
          "From our kitchen to your table, savor the flavors of passion,
          tradition, and creativity. <br /> Dive into a world where every meal
          tells a story and every bite leaves a memory."
        </p>

        {/* CTA Buttons */}
        <div className={styles.cta_buttons}>
          <Link to="/restaurant/menu">
            <button className={`${styles.cta_btn} ${styles.view_menu}`}>
              View Menu
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
