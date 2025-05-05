import { useEffect } from "react";
import styles from "./FlashMessage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { flashMessageActions } from "../../store/slices/flashMessage";

const FlashMessage = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.flashMessage);

  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => {
      dispatch(flashMessageActions.clearFlashMessage());
    }, 4900);

    return () => clearTimeout(timeout);
  }, [message, dispatch]);

  return (
    <>
      {message && (
        <div
          className={`${styles.flashMessage} ${
            type === "error" ? styles.error : styles.success
          }`}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default FlashMessage;
