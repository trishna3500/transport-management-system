import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useUser = (email) => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const [isUser, setIsUser] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/api/v1/users/user/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsUser(true);
          setIsUserLoading(false);
          setUserData(data.data[0]);
          console.log(data);
        });
    }
  }, [user?.email]);
  console.log(isUser);
  return [isUser, isUserLoading, userData];
};

export default useUser;
