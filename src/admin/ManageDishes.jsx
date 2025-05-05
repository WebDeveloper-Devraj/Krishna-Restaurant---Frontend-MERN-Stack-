import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./ManageDishes.module.css";
import { flashMessageActions } from "../store/slices/flashMessage";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ManageDishes = () => {
  const [dishes, setDishes] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDishes = async () => {
      const res = await fetch(`${BASE_URL}/restaurant/admin/dishes`, {
        credentials: "include",
      });
      const data = await res.json();
      setDishes(data.dishes);
    };

    fetchDishes();
  }, []);

  const handleDelete = async (dishId) => {
    const password = prompt("Enter admin password to confirm deletion:");

    if (!password) {
      alert("Deletion cancelled.");
      return;
    }

    const res = await fetch(`${BASE_URL}/restaurant/admin/dishes/${dishId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password }), // send password in body
    });

    const data = await res.json();

    console.log(data);

    if (data.success) {
      setDishes((prev) => prev.filter((dish) => dish._id !== dishId));
      dispatch(
        flashMessageActions.setFlashMessage({
          message: data.message,
          type: "success",
        })
      );
    } else {
      dispatch(
        flashMessageActions.setFlashMessage({
          message: data.message,
          type: "error",
        })
      );
    }
  };

  return (
    <div className={styles.manageDishes}>
      <h2 className={styles.heading}>Manage Dishes</h2>

      <div className={styles.addSection}>
        <button
          className={styles.addDishButton}
          onClick={() => navigate("/admin/addNewDishForm")}
        >
          + Add New Dish
        </button>
      </div>

      <table className={styles.dishesTable}>
        <thead>
          <tr>
            <th>Dish Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.length === 0 ? (
            <tr>
              <td colSpan="7" className={styles.noData}>
                No orders to display.
              </td>
            </tr>
          ) : (
            dishes.map((dish) => (
              <tr key={dish._id}>
                <td>{dish._id.slice(-6)}</td>
                <td>
                  <img
                    className={styles.dishImage}
                    src={dish.image}
                    alt={dish.name}
                  />
                </td>
                <td>{dish.name}</td>
                <td>{dish.price}</td>
                <td>{dish.category}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => navigate(`/admin/editDishForm/${dish._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      handleDelete(dish._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDishes;
