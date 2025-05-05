import { useState } from "react";
import styles from "./AddNewDishForm.module.css";
import { flashMessageActions } from "../store/slices/flashMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AddNewDishForm = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Prevent actual submission
    } else {
      const formData = new FormData(form);
      // const data = Object.fromEntries(formData.entries());

      const response = await fetch(
        `${BASE_URL}/restaurant/admin/dishes/add`,
        {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log("result:", result);

      if (result.success) {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "success",
          })
        );
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "error",
          })
        );
      }

      navigate("/admin/manage-dishes");
    }

    setValidated(true);
  };

  return (
    <>
      <div className={styles.newDish}>
        <div className={styles.newDishContent}>
          <div>
            <h2>Add New Dish</h2>
            <form
              className={`needs-validation ${validated ? "was-validated" : ""}`}
              noValidate
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className={styles.formGroup}>
                <label htmlFor="name">Dish Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Dish Name"
                  className="form-control"
                  required
                />
                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Please enter a Dish Name
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description: </label>
                <textarea
                  rows={4}
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description..."
                  className="form-control"
                  required
                />
                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Please Give some Description
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="price">Price: </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  className="form-control"
                  required
                />
                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Please enter price
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="image">Image: </label>
                <input type="file" id="image" name="image" required />
                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Please select image for dish
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category: </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Category"
                  className="form-control"
                  required
                />
                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Please Enter Category
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="ingredients">
                  Ingredients:(please enter ingredients separated by space)
                </label>
                <input
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  placeholder="enter categories separated by space"
                  className="form-control"
                  required
                />
                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Please Enter Ingredients
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="featured">Featured: </label>
                <input
                  type="text"
                  id="featured"
                  name="featured"
                  placeholder="Featured"
                  className="form-control"
                  required
                />
                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Please choose a option
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <button type="submit" className={styles.submit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewDishForm;
