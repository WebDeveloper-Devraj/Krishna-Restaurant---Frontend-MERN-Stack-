import styles from "./MenuPage.module.css";
import MenuCategoryButtons from "./MenuCategoryButtons";
import MenuDishes from "./MenuDishes";

const MenuCategories = () => {
  return (
    <div className={styles.menu_section}>
      <MenuCategoryButtons />
      <MenuDishes />
    </div>
  );
};

export default MenuCategories;
