import { Link, useNavigate } from "react-router-dom";
import Schedule from "../../components/Table";
import { AuthContext } from "../../context/AuthContext";

import { useContext, useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import useTeacher from "../../hooks/useTeacher";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeContainer() {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isTeacher] = useTeacher(user?.email);
  console.log(isTeacher);
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
  // console.log(
  //   "studentfromShohor:",
  //   studentFromShohor,
  //   "teacherFromShohor",
  //   teacherFromShohor,
  //   "weekendBusForStudentsFromCampus",
  //   weekendBusForStudentsFromCampus,
  //   "weekendBusForTeachersFromCampus",
  //   weekendBusForTeachersFromCampus,
  //   "weekendBusForStudentsFromShohor",
  //   weekendBusForStudentsFromShohor,
  //   "weekendBusForTeachersFromShohor",
  //   weekendBusForTeachersFromShohor
  // );

  const navigate = useNavigate();
  return (
    <div className="bg-stone-100">
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
                    className="bg-green-400 px-3 py-2"
                    // onClick={() => navigate(user ? "/add-schedule" : "/signin")}
                  >
                    Add Schedule
                  </button>
                </Link>
              )}
              {isAdmin && (
                <Link to="/teacher-signup">
                  <button
                    className="bg-green-400 px-3 py-2"
                    // onClick={() => navigate(user ? "/add-schedule" : "/signin")}
                  >
                    Add Teacher
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
                class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white"
                onClick={() => navigate("/dashboard")}
              >
                <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                <span class="relative">Driver Info</span>
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-medium text-center">
            Week Days Schedule
          </h1>
          <h1 className="text-3xl font-medium text-center">From Campus</h1>
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
    </div>
  );
}
