import React, { useRef, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scrollActions } from "../../store/slices/scroll";
import { FaShoppingCart } from "react-icons/fa";
import {
  cartSliceActions,
  saveCartToLocalStorage,
} from "../../store/slices/cart";
// import ComboBox from "../comboBox/comboBox";
import { authoriseActions } from "../../store/slices/authorise";
import { flashMessageActions } from "../../store/slices/flashMessage";
import { FaUserCircle } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const scrolled = useSelector((store) => store.scroll);
  const user = useSelector((store) => store.authorise);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // to change background color of header when scrolled
  useEffect(() => {
    // adding handleScroll function to window at first time (useEffect)
    const handleScroll = () => {
      dispatch(scrollActions.setScrolled(window.scrollY > 50));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const response = await fetch(`${BASE_URL}/restaurant/user/logout`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      setIsDropdownOpen(false);
      dispatch(cartSliceActions.resetCart());
      dispatch(authoriseActions.setUser(null));
      saveCartToLocalStorage([]);
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : null}`}>
      <div className={styles.header_container}>
        {/* Logo */}
        <NavLink to="/restaurant">
          <div className={styles.logo}>
            <img src={logo} alt="Restaurant Logo" />
          </div>
        </NavLink>

        {/* Navigation Menu */}
        <nav className={styles.navigation}>
          <ul>
            <li>
              <NavLink
                to="/restaurant"
                end
                className={({ isActive }) =>
                  isActive ? styles.activeLink : null
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/restaurant/menu"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : null
                }
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/restaurant/about"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : null
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/restaurant/gallery"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : null
                }
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/restaurant/contact"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : null
                }
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/restaurant/cart"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : null
                }
              >
                <FaShoppingCart
                  className={styles.cartIcon}
                  size={22}
                  color="white"
                />
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        {/* <div className={styles.search_bar}>
            <ComboBox />
            <button type="button" className={styles.serachButton}>
              Search
            </button>
          </div> */}

        {/* Action Buttons */}
        <div className={styles.action_buttons}>
          {user ? (
            <div className={styles.user_dropdown_container} ref={dropdownRef}>
              <FaUserCircle
                className={styles.user_icon}
                size={28}
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className={styles.dropdown_menu}>
                  <NavLink to="/restaurant/user/profile">👤 Profile</NavLink>
                  <NavLink to="/restaurant/user/current-order">
                    🛵 Current Order
                  </NavLink>
                  {/* <NavLink to="/restaurant/user/orders">
                    📜 Order History
                  </NavLink> */}
                  <NavLink to="/restaurant/user/favourites">
                    ❤️ Favourites
                  </NavLink>
                  <NavLink to="/restaurant/user/settings">⚙️ Settings</NavLink>
                  <hr />
                  <button onClick={handleLogout}>👋 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className={`btn ${styles.login}`}
                onClick={() => {
                  navigate("/restaurant/user/login");
                }}
              >
                Login
              </button>

              <button
                className={`btn  ${styles.signup}`}
                onClick={() => {
                  navigate("/restaurant/user/signup");
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
