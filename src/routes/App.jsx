import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header_Footer/Header";
import Footer from "../components/Header_Footer/Footer";
import { Outlet } from "react-router-dom";
import FlashMessage from "../components/FlashMessage/FlashMessage";
import { useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  useEffect(() => {
    const checkVisitAndTrack = () => {
      const cookies = document.cookie
        .split("; ")
        .map((cookie) => cookie.trim());
      const hasVisited = cookies.some((cookie) =>
        cookie.startsWith("hasVisited=true")
      );

      if (!hasVisited) {
        // 🔁 Track the visit
        fetch(`${BASE_URL}/restaurant/track-visit`, {
          method: "POST",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => console.log("Visit Tracked:", data))
          .catch((err) => console.error("Tracking Error:", err));

        // 🍪 Set the cookie
        document.cookie = "hasVisited=true; max-age=86400; path=/";
      }
    };

    checkVisitAndTrack();
  }, []);

  return (
    <>
      <div className="app-container">
        <FlashMessage />
        <Header />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
