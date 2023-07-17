import { Link, useNavigate } from "react-router-dom";
import Schedule, { TableBody } from "../../components/Table";
import { AuthContext } from "../../context/AuthContext";
import { useData } from "../../context/DatabaseContext";
import { useContext, useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeContainer() {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const [isAdmin] = useAdmin(user?.email);
  const [busSchedule, setBusSchedule] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/all-bus")
      .then((res) => res.json())
      .then((data) => setBusSchedule(data));
  }, []);
  const studentFromShohor = busSchedule?.data?.filter(
    (bus) => bus.busType === "student"
  );
  console.log(studentFromShohor);
  let { alldata } = useData();

  let navigate = useNavigate();

  let fromcampus = alldata.filter(function checkAdult(type) {
    return type.type === "fromcampus" && type.day === "Sunday to Thursday";
  });

  let fromshohor = alldata.filter(function checkAdult(type) {
    return type.type === "fromshohor" && type.day === "Sunday to Thursday";
  });

  let sfromcampus = alldata.filter(function checkAdult(type) {
    return type.type === "fromcampus" && type.day !== "Sunday to Thursday";
  });

  let sfromshohor = alldata.filter(function checkAdult(type) {
    return type.type === "fromshohor" && type.day !== "Sunday to Thursday";
  });

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between mb-20">
            <h2 className="text-4xl font-semibold leading-tight text-center">
              Transport Management System
            </h2>
            <div className="flex justify-end space-x-5">
              <button
                className={classNames(
                  user ? " bg-lime-300 " : " bg-yellow-300",
                  "text-black rounded-md px-4 py-2"
                )}
                onClick={() => navigate(user ? "/add-schedule" : "/signin")}
              >
                {user ? "Add Schedule" : "Login"}
              </button>
              <button
                className={classNames(
                  user ? " bg-red-600 " : " bg-yellow-300",
                  "text-black rounded-md px-4 py-2"
                )}
                onClick={() =>
                  navigate(user ? "/view-requisition" : "/requisition")
                }
              >
                {isAdmin && "  View Bus Requisition"}
                {user?.email && "Bus Requisition"}
              </button>
              {user?.email && (
                <Link to="/requisition">
                  <button className="bg-sky-400 px-8 py-2">
                    Make Requisition
                  </button>
                </Link>
              )}

              <button
                className={classNames(
                  "text-black bg-lime-700 rounded-md px-4 py-2"
                )}
                onClick={() => navigate("/driver")}
              >
                Driver Info
              </button>
            </div>
          </div>
          {/* from campus  */}
          <Schedule data={fromcampus} special={false} title="From Campus" />
          {/* from sohor  */}
          <Schedule data={fromshohor} special={false} title="From Shohor" />

          {/* special trip  */}
          <div className="mt-10">
            <h1 className="text-xl font-bold">Speciallll Trip</h1>
          </div>
          {/* special campus  */}
          <Schedule data={sfromcampus} special={true} title="From Campus" />
          {/* special shohor  */}
          <Schedule>
            {studentFromShohor?.map((buses) => (
              <TableBody></TableBody>
            ))}
          </Schedule>

          <Schedule data={sfromshohor} special={true} title="From Shohor" />
        </div>
      </div>
    </>
  );
}
