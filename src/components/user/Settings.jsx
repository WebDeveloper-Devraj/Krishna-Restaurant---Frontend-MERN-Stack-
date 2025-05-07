import React, { useState } from "react";
import styles from "./Settings.module.css";
import { useSelector, useDispatch } from "react-redux";
import { flashMessageActions } from "../../store/slices/flashMessage";
import { useNavigate } from "react-router-dom";
import { authoriseActions } from "../../store/slices/authorise";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Settings = () => {
  const user = useSelector((store) => store.authorise);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [validated, setValidated] = useState(false);

  // const [theme, setTheme] = useState("light");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() === false) {
      event.stopPropagation(); // Prevent actual submission
    } else {
      setIsUpdating(true);
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const { currentPassword, newPassword, confirmPassword } = data;

      if (currentPassword || newPassword || confirmPassword) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          return alert("Please fill all password fields.");
        }

        if (newPassword.length < 6) {
          return alert("New password must be at least 6 characters.");
        }

        if (newPassword !== confirmPassword) {
          return alert("New password and confirm password do not match.");
        }
      }

      const res = await fetch(`${BASE_URL}/restaurant/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        dispatch(authoriseActions.setUser(result.user));

        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "success",
          })
        );

        navigate("/restaurant");
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "error",
          })
        );
      }

      setIsUpdating(false);
    }
    setValidated(true);
  };

  const handleAccountDelete = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() === false) {
      event.stopPropagation(); // Prevent actual submission
    } else {
      setIsDeleting(true);
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch(`${BASE_URL}/restaurant/user/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: data.password,
        }),
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "success",
          })
        );

        dispatch(authoriseActions.setUser(null));
        navigate("/restaurant");
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "error",
          })
        );
      }
      setIsDeleting(false);
    }

    setValidated(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.settingsContainer}>
        <h2>Settings</h2>

        {/* Profile Section */}
        <section className={styles.section}>
          <h3>👤 Profile Information</h3>
          <form
            className={`needs-validation ${validated ? "was-validated" : ""}`}
            noValidate
            onSubmit={handleUpdateProfile}
          >
            <div className={styles.fieldGroup}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                defaultValue={user.username}
              />

              <div
                className="invalid-feedback"
                style={{ marginTop: "0px", marginBottom: "-5px" }}
              >
                Please enter your username
              </div>

              <div
                className="valid-feedback"
                style={{ marginTop: "0px", marginBottom: "-5px" }}
              >
                Looks good!
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                disabled
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Phone:</label>
              <input
                type="tel"
                name="phoneNo"
                placeholder="Enter your number"
                className="form-control"
                pattern="^[0-9]{10}$"
                required
                defaultValue={user.phoneNo}
              />

              <div
                className="invalid-feedback"
                style={{ marginTop: "0px", marginBottom: "-5px" }}
              >
                Please enter a valid phone number
              </div>

              <div
                className="valid-feedback"
                style={{ marginTop: "0px", marginBottom: "-5px" }}
              >
                Looks good!
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label>Current Password:</label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>New Password:</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Confirm New Password:</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              className={styles.updateBtn}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <span className={styles.spinner}></span> Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
        </section>

        {/* Preferences Section */}
        {/* <section className={styles.section}>
          <h3>⚙️ Preferences</h3>
          <div className={styles.toggleRow}>
            <label>Theme: {theme === "light" ? "🌞 Light" : "🌙 Dark"}</label>
            <button className={styles.themeBtn}>
              Switch to {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </section> */}

        {/* Account Section */}
        <section className={styles.section}>
          <h3>⚠️ Account</h3>
          <button
            className={styles.deleteBtn}
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete My Account
          </button>

          {showDeleteConfirm && (
            <form
              onSubmit={handleAccountDelete}
              className={`${styles.deleteConfirmForm} needs-validation ${
                validated ? "was-validated" : ""
              }`}
              noValidate
            >
              <input
                type="password"
                name="password"
                placeholder="Enter your password to confirm"
                className="form-control"
                minLength="6"
                required
              />

              <div
                className="invalid-feedback"
                style={{ marginTop: "0px", marginBottom: "-5px" }}
              >
                Password must be at least 6 characters.
              </div>

              <div
                className="valid-feedback"
                style={{ marginTop: "0px", marginBottom: "-5px" }}
              >
                Looks good!
              </div>

              <button
                type="submit"
                className={styles.confirmDeleteBtn}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className={styles.spinner}></span> Deleting...
                  </>
                ) : (
                  "Confirm Delete"
                )}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Settings;
