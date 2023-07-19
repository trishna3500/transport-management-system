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
  const [isAdmin] = useAdmin(user?.email);
  const [busSchedule, setBusSchedule] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/all-bus")
      .then((res) => res.json())
      .then((data) => setBusSchedule(data));
  }, []);

  const studentFromShohor = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Student" &&
      bus.location === "fromshohor" &&
      bus.day === "Sunday to Thursday"
  );

  const teacherFromShohor = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Teacher" &&
      bus.location === "fromshohor" &&
      bus.day === "Sunday to Thursday"
  );
  const studentFromCampus = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Student" &&
      bus.location === "fromcampus" &&
      bus.day === "Sunday to Thursday"
  );
  const teacherFromCampus = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Teacher" &&
      bus.location === "fromcampus" &&
      bus.day === "Sunday to Thursday"
  );
  const weekendBusForStudentsFromCampus = busSchedule?.data?.filter(
    (bus) =>
      bus.day !== "Sunday to Thursday" &&
      bus.busType === "Student" &&
      bus.location === "fromcampus"
  );
  const weekendBusForTeachersFromCampus = busSchedule?.data?.filter(
    (bus) =>
      bus.day !== "Sunday to Thursday" &&
      bus.busType === "Teacher" &&
      bus.location === "fromcampus"
  );
  const weekendBusForStudentsFromShohor = busSchedule?.data?.filter(
    (bus) =>
      bus.day !== "Sunday to Thursday" &&
      bus.busType === "Student" &&
      bus.location === "fromshohor"
  );
  const weekendBusForTeachersFromShohor = busSchedule?.data?.filter(
    (bus) =>
      bus.day !== "Sunday to Thursday" &&
      bus.busType === "Teacher" &&
      bus.location === "fromshohor"
  );
  console.log(
    "studentfromShohor:",
    studentFromShohor,
    "teacherFromShohor",
    teacherFromShohor,
    "weekendBusForStudentsFromCampus",
    weekendBusForStudentsFromCampus,
    "weekendBusForTeachersFromCampus",
    weekendBusForTeachersFromCampus,
    "weekendBusForStudentsFromShohor",
    weekendBusForStudentsFromShohor,
    "weekendBusForTeachersFromShohor",
    weekendBusForTeachersFromShohor
  );
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
              {isAdmin && (
                <Link to="/add-schedule">
                  <button
                    className="bg-green-400"
                    // onClick={() => navigate(user ? "/add-schedule" : "/signin")}
                  >
                    {user ? "Add Schedule" : "Login"}
                  </button>
                </Link>
              )}

              {isAdmin && (
                <button
                  className={classNames(
                    user ? " bg-red-600 " : " bg-yellow-300",
                    "text-black rounded-md px-4 py-2"
                  )}
                  onClick={() =>
                    navigate(user ? "/view-requisition" : "/requisition")
                  }
                >
                  View Bus Requisition
                </button>
              )}

              {user?.email && !isAdmin && (
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
          {/* Teacher from Shohor  */}
          <Schedule
            data={teacherFromShohor}
            special={false}
            title="Teacher From Shohor"
          />
          {/* Student from Shohor  */}
          <Schedule
            data={studentFromShohor}
            special={false}
            title="Student From Shohor"
          />
          {/* Teacher from campus  */}
          <Schedule
            data={teacherFromCampus}
            special={false}
            title="Teacher From Campus"
          />
          {/* Student from campus */}
          <Schedule
            data={studentFromCampus}
            special={false}
            title="Student From Campus"
          />

          {/* special trip  */}
          <div className="mt-10">
            <h1 className="text-xl font-bold text-center ">Special Trip</h1>
          </div>
          {/* Student special Bus From Campus  */}
          <Schedule
            data={weekendBusForStudentsFromCampus}
            title="Student Bus From Campus"
          />
          <Schedule
            data={weekendBusForTeachersFromCampus}
            title="Teacher Bus From Campus"
          />
          <Schedule
            data={weekendBusForStudentsFromShohor}
            title="Student Bus From Shohor"
          />
          <Schedule
            data={weekendBusForTeachersFromShohor}
            title="Teacher Bus From Shohor"
          />
        </div>
      </div>
    </>
  );
}
