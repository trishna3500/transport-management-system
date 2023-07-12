import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return "Hola";
  }
  console.log(isAdmin);
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default AdminRoute;
