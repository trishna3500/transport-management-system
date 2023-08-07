import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useUser = (email) => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const [isUser, setIsUser] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/api/v1/users/user/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsUser(true);
          setIsUserLoading(false);
          setUserData(data.data[0]);
          if (data.data[0].role === "employee") {
            setUserRole("employee");
          } else if (data.data[0].role === "student") {
            setUserRole("student");
          } else if (data.data[0].role === "teacher") {
            setUserRole("teacher");
          } else {
            setUserRole("admin");
          }
          console.log(data, userRole);
        });
    }
  }, [user?.email]);
  console.log(isUser, userRole);
  return [isUser, isUserLoading, userData, userRole];
};

export default useUser;
