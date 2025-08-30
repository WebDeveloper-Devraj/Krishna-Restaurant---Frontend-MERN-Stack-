import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase.js";

import { IoClose } from "react-icons/io5";

import styles from "./LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSignUpActions } from "../../store/slices/loginSignUp";
import { authoriseActions } from "../../store/slices/authorise";
import { flashMessageActions } from "../../store/slices/flashMessage";
import { Link, useNavigate } from "react-router-dom";
import {
  loadCartFromLocalStorage,
  mergeGuestCartWithUserCart,
} from "../../store/slices/cart";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  const dispatch = useDispatch();
  const { open } = useSelector((store) => store.loginSignUpUi);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Prevent actual submission
    } else {
      setIsLoading(true);
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch(`${BASE_URL}/restaurant/user/login`, {
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
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "success",
          })
        );

        if (result.user.role === "admin") {
          navigate("/admin/manage-orders");
        } else {
          navigate("/restaurant");
        }
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "error",
          })
        );
      }
      setIsLoading(false);
    }

    setValidated(true);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send token to your backend for creating/fetching user
      const token = await user.getIdToken();

      const response = await fetch(
        `http://localhost:5000/restaurant/user/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // send Firebase token
          },
          credentials: "include",
        }
      );

      const resultData = await response.json();

      if (resultData.success) {
        dispatch(authoriseActions.setUser(resultData.user));
        const guestCart = loadCartFromLocalStorage();
        dispatch(mergeGuestCartWithUserCart(resultData.user._id, guestCart));
        dispatch(
          flashMessageActions.setFlashMessage({
            message: resultData.message,
            type: "success",
          })
        );

        navigate("/restaurant");
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: resultData.message,
            type: "error",
          })
        );
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      dispatch(
        flashMessageActions.setFlashMessage({
          message: "Google login failed",
          type: "error",
        })
      );
    }
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
            <h2>Welcome Back!</h2>
            <p>Login to access your account</p>
            <form
              className={`needs-validation ${validated ? "was-validated" : ""}`}
              noValidate
              onSubmit={handleSubmit}
            >
              <div className={styles.formGroup}>
                <label htmlFor="email">What's your Email?</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  className="form-control"
                  required
                />
                <div
                  className="invalid-feedback"
                  style={{ marginTop: "0px", marginBottom: "-5px" }}
                >
                  Please enter a valid email.
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Your password?</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  minLength="6"
                  placeholder="Password"
                  className="form-control"
                  required
                />
                <div
                  className="invalid-feedback"
                  style={{ marginTop: "0px", marginBottom: "-10px" }}
                >
                  Password must be at least 6 characters.
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
                  "Login"
                )}
              </button>
            </form>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={styles.googleLogin}
            >
              Login with Google
            </button>

            <p className={styles.signupRoute}>
              Don’t have an account?{" "}
              <Link to="/restaurant/user/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
