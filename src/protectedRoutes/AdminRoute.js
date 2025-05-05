import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.authorise);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/restaurant");
    }
  }, [user, navigate]);

  return children;
};

export default AdminRoute;
