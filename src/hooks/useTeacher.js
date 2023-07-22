import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useTeacher = (email) => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isTeacherLoading, setIsTeacherLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/api/v1/users/teacher/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data[0].role === "teacher") {
            setIsTeacher(true);
            setIsTeacherLoading(false);
          }
          console.log(data);
        });
    }
  }, [email]);
  console.log(isTeacher);
  return [isTeacher, isTeacherLoading];
};

export default useTeacher;
