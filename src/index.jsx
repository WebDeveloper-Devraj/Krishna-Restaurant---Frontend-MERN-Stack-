import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "./routes/App";
import Home from "./components/Home/Home";
import MenuPage from "./components/Menu/MenuPage";
import AboutUs from "./components/About_Us/AboutUs";
import Gallery from "./components/Gallery/Gallery";
import ContactUs from "./components/contact/ContactUs";
import DishDetailPage from "./components/DishDetailPage/DishDetailPage";
import CartPage from "./components/CartPage/CartPage";
import SignUpPage from "./components/Login_SignUp/SignUpPage";
import LoginPage from "./components/Login_SignUp/LoginPage";
import Profile from "./components/user/Profile";
import CurrentOrder from "./components/user/CurrentOrder";
import OrderHistory from "./components/user/OrderHistory";
import Favourites from "./components/user/Favourites";
import Settings from "./components/user/Settings";
import Checkout from "./components/Checkout/Checkout";
import AdminLayout from "./admin/AdminLayout";
import ManageOrders from "./admin/ManageOrders";
import ManageDishes from "./admin/ManageDishes";
import AddNewDishForm from "./admin/AddNewDishForm";
// import Users from "./admin/Users";
import AdminRoute from "./protectedRoutes/AdminRoute";
import EditDishForm from "./admin/EditDishForm";
import NotFound from "./components/notFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/restaurant",
    element: <App />,
    children: [
      { path: "/restaurant", element: <Home /> },
      {
        path: "/restaurant/user/signup",
        element: (
          <>
            <Home />
            <SignUpPage />
          </>
        ),
      },
      {
        path: "/restaurant/user/login",
        element: (
          <>
            <Home />
            <LoginPage />
          </>
        ),
      },
      { path: "/restaurant/user/profile", element: <Profile /> },
      { path: "/restaurant/user/current-order", element: <CurrentOrder /> },
      // { path: "/restaurant/user/orders", element: <OrderHistory /> },
      { path: "/restaurant/user/favourites", element: <Favourites /> },
      { path: "/restaurant/user/settings", element: <Settings /> },
      { path: "/restaurant/menu", element: <MenuPage /> },
      { path: "/restaurant/dishes/:id", element: <DishDetailPage /> },
      { path: "/restaurant/cart", element: <CartPage /> },
      { path: "/restaurant/about", element: <AboutUs /> },
      { path: "/restaurant/gallery", element: <Gallery /> },
      { path: "/restaurant/contact", element: <ContactUs /> },
      { path: "/restaurant/checkout", element: <Checkout /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: "/admin/manage-orders", element: <ManageOrders /> },
      { path: "/admin/manage-dishes", element: <ManageDishes /> },
      // { path: "/admin/users", element: <Users /> },
      { path: "/admin/addNewDishForm", element: <AddNewDishForm /> },
      { path: "/admin/editDishForm/:dishId", element: <EditDishForm /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
