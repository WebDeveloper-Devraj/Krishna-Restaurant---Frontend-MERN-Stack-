import styles from "./MenuPage.module.css";
import MenuHero from "./MenuHero";
import MenuCategories from "./MenuCategories";

const MenuPage = () => {
  return (
    <div className={styles.menu_page}>
      <MenuHero />
      <MenuCategories />
    </div>
  );
};

export default MenuPage;
