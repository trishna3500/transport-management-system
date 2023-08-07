import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useAdmin = (email) => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/api/v1/users/${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data[0].role === "admin") {
            setIsAdmin(true);
            setIsAdminLoading(false);
          } else {
            setIsAdmin(false);
          }
        });
    }
  }, [email]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
