import styles from "./DishDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addItemToCart,
  fetchCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../../store/slices/cart";
import { favouritesSliceActions } from "../../store/slices/favourites";
import { flashMessageActions } from "../../store/slices/flashMessage";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const DishDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const dish = useSelector((store) =>
    store.menuCategories.dishes.find((d) => d._id === id)
  );

  const user = useSelector((store) => store.authorise);
  const userId = user ? user._id : null;

  const cartItem = useSelector((store) =>
    store.cart.items.find((item) => item.dishId?._id === id)
  );

  // fetch user cart details
  useEffect(() => {
    if (userId) dispatch(fetchCart(userId));
  }, [userId]);

  const handleAddToCart = () => {
    dispatch(addItemToCart(userId, dish, 1));
  };

  const handleIncreaseQuantity = () => {
    dispatch(updateCartItemQuantity(userId, dish._id, cartItem.quantity + 1));
  };

  const handleDecreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      dispatch(updateCartItemQuantity(userId, dish._id, cartItem.quantity - 1));
    } else {
      dispatch(removeCartItem(userId, dish._id));
    }
  };

  const favouritesIds = useSelector((store) => store.favourites.dishIds);

  const isFavourite = favouritesIds.includes(dish._id);

  const handleToggleFavourite = async (dishId) => {
    if (!userId) {
      dispatch(
        flashMessageActions.setFlashMessage({
          message: "You must be logged in to add as favourite dish",
          type: "error",
        })
      );
      navigate("/restaurant/user/login");
      return;
    }
    const res = await fetch(
      `${BASE_URL}/restaurant/favourites/toggle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, dishId }),
      }
    );

    const data = await res.json();
    if (data.success) {
      dispatch(favouritesSliceActions.setFavourites(data.updatedFavouritesIds));
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.dishDetailContainer}>
        <img src={dish.image} alt={dish.name} className={styles.dishImage} />
        <div className={styles.dishDetails}>
          <h2 className={styles.dishName}>{dish.name}</h2>
          <p className={styles.dishDescription}>{dish.description}</p>
          <p className={styles.dishInfo}>
            <strong>Price:</strong>
            <span className={styles.dishPrice}>{dish.price}</span>
          </p>
          <p className={styles.dishInfo}>
            <strong>Ingredients:</strong> {dish.ingredients.join(", ")}
          </p>
          <p className={styles.dishInfo}>
            <strong>Category:</strong> {dish.category}
          </p>

          {/* ❤️ Favourite Button */}
          <button
            className={styles.favIconBtn}
            onClick={() => handleToggleFavourite(dish._id)}
          >
            {isFavourite ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart color="gray" />
            )}
          </button>

          {cartItem ? (
            <>
              <div className={styles.quantityContainer}>
                <button
                  className={styles.quantityButton}
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className={styles.quantityText}>{cartItem.quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
              <a
                className={styles.goToCartButton}
                onClick={() => navigate("/restaurant/cart")}
              >
                Go to Cart 🛒
              </a>
            </>
          ) : (
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishDetailPage;
