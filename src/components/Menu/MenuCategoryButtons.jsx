import MenuCategoryButton from "./MenuCategoryButton";
import styles from "./MenuPage.module.css";
import { useSelector } from "react-redux";

const MenuCategoryButtons = () => {
  const { activeCategory, categories } = useSelector(
    (store) => store.menuCategories
  );
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <MenuCategoryButton
          key={category}
          category={category}
          activeCategory={activeCategory}
        />
      ))}
    </div>
  );
};

export default MenuCategoryButtons;
