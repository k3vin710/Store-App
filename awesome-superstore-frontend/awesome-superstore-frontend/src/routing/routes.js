import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgetPassword from "../pages/ForgetPassword";
import AddProduct from "../pages/AddProduct";
import UserProfile from "../pages/UserProfile";
import Dashboard from "../pages/Dashboard";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";
import AddAddress from "../pages/AddAddress";
import EditAddress from "../pages/EditAddress";
import ChangePassword from "../pages/ChangePassword";
import OrderDetails from "../pages/OrderDetails";

// Explicitly have route paths so we can reference it in the navigation code
export const ROUTE_PATHS = {
  default: "*",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  addProduct: "/add-product",
  userProfile: "/user-profile",
  dashboard: "/dashboard",
  cart: "/cart",
  orders: "/orders",
  addAddress: "/add-address",
  editAddress: "/edit-address",
  changePassword: "/change-password",
  orderDetails: "/order-details"
};

export const routes = [
  { path: ROUTE_PATHS.default, element: <LoginPage /> },
  { path: ROUTE_PATHS.login, element: <LoginPage /> },
  { path: ROUTE_PATHS.register, element: <RegisterPage /> },
  { path: ROUTE_PATHS.forgotPassword, element: <ForgetPassword /> },
  { path: ROUTE_PATHS.addProduct, element: <AddProduct /> },
  { path: ROUTE_PATHS.userProfile, element: <UserProfile /> },
  { path: ROUTE_PATHS.dashboard, element: <Dashboard /> },
  { path: ROUTE_PATHS.cart, element: <CartPage /> },
  { path: ROUTE_PATHS.orders, element: <OrdersPage /> },
  { path: ROUTE_PATHS.addAddress, element: <AddAddress />},
  { path: ROUTE_PATHS.editAddress, element: <EditAddress />},
  { path: ROUTE_PATHS.changePassword, element: <ChangePassword />},
  { path: ROUTE_PATHS.orderDetails, element: <OrderDetails />},
  // 3.  Dashboard ( show products)
  // 4.  User Profile (address & user details)
  // 5.  Cart Page(Current Orders)
  // 6.  Orders page (past orders)
  // 7.  Returns page  ( returns/:order_id )
  // 8.  Admin (to add / modify products )
  { path: "*", element: <Navigate to="/" /> },
];
