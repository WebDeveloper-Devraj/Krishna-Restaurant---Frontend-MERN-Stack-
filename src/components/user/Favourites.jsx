import React, { useState } from "react";
import styles from "./Favourites.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { favouritesSliceActions } from "../../store/slices/favourites";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Favourites = () => {
  const favouritesIds = useSelector((store) => store.favourites.dishIds);
  const allDishes = useSelector((store) => store.menuCategories.dishes);
  const user = useSelector((store) => store.authorise);

  const favouritesDishes = allDishes.filter((dish) =>
    favouritesIds.includes(dish._id)
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleFavourite = async (dishId) => {
    const res = await fetch(`${BASE_URL}/restaurant/favourites/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id, dishId }),
    });

    const result = await res.json();
    if (result.success) {
      dispatch(
        favouritesSliceActions.setFavourites(result.updatedFavouritesIds)
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Favourite Dishes</h2>

      {favouritesDishes.length === 0 ? (
        <p className={styles.noOrder}>You have no favourites yet.</p>
      ) : (
        favouritesDishes.map((dish) => (
          <div className={styles.orderCard} key={dish._id}>
            <div className={styles.orderHeader}>
              <span>{dish.name}</span>
              <span className={styles.price}>₹{dish.price}</span>
            </div>

            <img
              src={`${dish.image}`}
              alt={dish.name}
              className={styles.image}
            />

            <div className={styles.orderFooter}>
              <button
                className={styles.cartBtn}
                onClick={() => navigate(`/restaurant/dishes/${dish._id}`)}
              >
                View Dish
              </button>
              <button
                className={styles.removeBtn}
                onClick={() => handleToggleFavourite(dish._id)}
              >
                Remove ❌
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favourites;
