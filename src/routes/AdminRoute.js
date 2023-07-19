import { useContext, useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  // const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();

  console.log(isAdmin);
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/signin" />;
};

export default AdminRoute;
