import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import styles from "./AdminHeader.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scrollActions } from "../store/slices/scroll";
import { cartSliceActions, saveCartToLocalStorage } from "../store/slices/cart";
import { authoriseActions } from "../store/slices/authorise";
import { flashMessageActions } from "../store/slices/flashMessage";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const scrolled = useSelector((store) => store.scroll);

  // to change background color of header when scrolled
  useEffect(() => {
    // adding handleScroll function to window at first time (useEffect)
    const handleScroll = () => {
      dispatch(scrollActions.setScrolled(window.scrollY > 50));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const handleLogout = async () => {
    const response = await fetch(`${BASE_URL}/restaurant/user/logout`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      dispatch(authoriseActions.setUser(null));
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
      navigate("/restaurant");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Lora:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : null}`}
      >
        <div className={styles.header_container}>
          {/* Logo */}
          <NavLink to="/admin/manage-orders">
            <div className={styles.logo}>
              <img src={logo} alt="Restaurant Logo" />
            </div>
          </NavLink>

          {/* Navigation Menu */}
          <nav className={styles.navigation}>
            <ul>
              <li>
                <NavLink
                  to="/admin/manage-orders"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : null
                  }
                >
                  Manage Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/manage-dishes"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : null
                  }
                >
                  Manage Dishes
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className={styles.action_buttons}>
            <button onClick={handleLogout}>👋 Logout</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
