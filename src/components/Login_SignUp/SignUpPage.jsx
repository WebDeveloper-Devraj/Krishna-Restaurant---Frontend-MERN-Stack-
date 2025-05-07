import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "./SignUpPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSignUpActions } from "../../store/slices/loginSignUp";
import { useNavigate } from "react-router-dom";
import {
  loadCartFromLocalStorage,
  mergeGuestCartWithUserCart,
} from "../../store/slices/cart";
import { authoriseActions } from "../../store/slices/authorise";
import { flashMessageActions } from "../../store/slices/flashMessage";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { open } = useSelector((store) => store.loginSignUpUi);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Prevent actual submission
    } else {
      setIsLoading(true);
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch(`${BASE_URL}/restaurant/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        dispatch(authoriseActions.setUser(result.user));
        const guestCart = loadCartFromLocalStorage();
        dispatch(mergeGuestCartWithUserCart(result.user._id, guestCart));
        navigate("/restaurant");
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
        navigate("/restaurant/user/signup");
      }
      setIsLoading(false);
    }

    setValidated(true);
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      dispatch(loginSignUpActions.setOpen(true));
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(loginSignUpActions.setOpen(false));

    setTimeout(() => {
      navigate("/restaurant"); // Navigate after animation completes
    }, 320);
  };

  return (
    <>
      <div className={`${styles.login_page} ${open && styles.open}`}>
        <div className={styles.login_content}>
          <div className={styles.close_icon} onClick={handleClose}>
            <IoClose />
          </div>
          <div>
            <h5>Sign Up to Krishna Restaurant!</h5>
            <p>Start your journy</p>

            <form
              className={`needs-validation ${validated ? "was-validated" : ""}`}
              noValidate
              onSubmit={handleSubmit}
            >
              <div className={styles.formGroup}>
                <label htmlFor="name">What's your name?</label>
                <input
                  type="text"
                  id="name"
                  name="username"
                  placeholder="Name"
                  className="form-control"
                  required
                />

                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Please enter your name
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">What's your e-mail?</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  required
                />

                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Please enter a valid email.
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Your password?</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  minLength="6"
                  className="form-control"
                  required
                />

                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Password must be at least 6 characters.
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phoneNo">Phone Number</label>
                <input
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="98xxxxxxxx"
                  pattern="^[0-9]{10}$"
                  className="form-control"
                  required
                />

                <div
                  className="invalid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Enter a valid 10-digit phone number.
                </div>
                <div
                  className="valid-feedback"
                  style={{ marginTop: "-2px", marginBottom: "-8px" }}
                >
                  Looks good!
                </div>
              </div>

              <button
                type="submit"
                className={styles.login}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner}></span> Loading...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
