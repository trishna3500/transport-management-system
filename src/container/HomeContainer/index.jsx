import { Link, useNavigate } from "react-router-dom";
import Schedule from "../../components/Table";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import useUser from "../../hooks/useUser";

export default function HomeContainer() {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isUser] = useUser(user?.email);
  console.log(isUser);
  const [busSchedule, setBusSchedule] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/all-bus")
      .then((res) => res.json())
      .then((data) => setBusSchedule(data));
  }, []);

  const studentFromTown = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Student" &&
      bus.location === "fromtown" &&
      bus.day === "Sunday to Thursday"
  );

  const teacherFromTown= busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Teacher" &&
      bus.location === "fromtown" &&
      bus.day === "Sunday to Thursday"
  );
  const employeeFromTown = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Employee" &&
      bus.location === "fromtown" &&
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
  const employeeFromCampus = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Employee" &&
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
  const weekendBusForEmployeeFromCampus = busSchedule?.data?.filter(
    (bus) =>
      bus.day !== "Sunday to Thursday" &&
      bus.busType === "Employee" &&
      bus.location === "fromcampus"
  );
  const weekendBusForStudentsFromTown = busSchedule?.data?.filter(
    (bus) =>
      bus.day !== "Sunday to Thursday" &&
      bus.busType === "Student" &&
      bus.location === "fromtown"
  );
  const weekendBusForTeachersFromTown = busSchedule?.data?.filter(
    (bus) =>
      bus.day !== "Sunday to Thursday" &&
      bus.busType === "Teacher" &&
      bus.location === "fromtown"
  );
  const weekendBusForEmployeeFromTown = busSchedule?.data?.filter(
    (bus) =>
      bus.day !== "Sunday to Thursday" &&
      bus.busType === "Employee" &&
      bus.location === "fromtown"
  );

  const studentFromTerminal = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Student" &&
      bus.location === "fromTerminal" &&
      bus.day === "Sunday to Thursday"
  );

  const employeeFromTerminal = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Employee" &&
      bus.location === "fromTerminal" &&
      bus.day === "Sunday to Thursday"
  );
  const weekendBusForStudentFromTerminal = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Student" &&
      bus.location === "fromTerminal" &&
      bus.day !== "Sunday to Thursday"
  );

  const weekendBusForEmployeeFromTerminal = busSchedule?.data?.filter(
    (bus) =>
      bus.busType === "Employee" &&
      bus.location === "fromTerminal" &&
      bus.day !== "Sunday to Thursday"
  );

  // console.log(
  //   weekendBusForStudentFromTerminal,
  //   weekendBusForTeacherFromTerminal,
  //   weekendBusForEmployeeFromTerminal
  // );
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
    <div className="bg-stone-100 mt-12">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between mb-20">
            <h2 className="text-4xl font-semibold leading-tight text-center">
              Transport Management System
            </h2>
            <div className="flex justify-end space-x-5">
              {isAdmin && (
                <Link to="/add-schedule">
                  <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                    <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    Add Schedule
                  </button>
                </Link>
              )}
              {isAdmin && (
                <div className="flex gap-4">
                  <Link to="/teacher-signup">
                    <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                      <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      Add Teacher
                    </button>
                  </Link>
                  <Link to="/employee-signup">
                    <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                      <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      Add Employee
                    </button>
                  </Link>
                </div>
              )}
              {isAdmin && (
                <button
                  className="relative rounded px-5  overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                  onClick={() =>
                    navigate(user ? "/view-requisition" : "/requisition")
                  }
                >
                  <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  View Bus Requisition
                </button>
              )}

              {user?.email && !isAdmin && (
                <Link to="/requisition">
                  <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                    <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
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
          <h1 className="text-5xl font-medium text-center -mt-10 mb-5">
            Week Days Schedule
          </h1>
          <h1 className="text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
            From Town
          </h1>
          {/* Student from Town  */}
          <Schedule
            data={studentFromTown}
            special={false}
            title="For Students"
          />

          {/* Teacher from Town  */}
          <Schedule
            data={teacherFromTown}
            special={false}
            title="For Teachers"
          />
          {/* Employee from Town  */}
          <Schedule
            data={employeeFromTown}
            special={false}
            title="For Employee"
          />
          <h1 className="text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            From Campus
          </h1>
          {/* Student from campus */}
          <Schedule
            data={studentFromCampus}
            special={false}
            title="For Students"
          />
          {/* Teacher from campus  */}
          <Schedule
            data={teacherFromCampus}
            special={false}
            title="For Teachers"
          />
          {/* Employee from campus  */}
          <Schedule
            data={employeeFromCampus}
            special={false}
            title="For Employee"
          />
          <h1 className="text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            From Terminal
          </h1>
          {/* Student from Terminal */}
          <Schedule
            data={studentFromTerminal}
            special={false}
            title="For Students"
          />

          {/* Employee from Terminal  */}
          <Schedule
            data={employeeFromTerminal}
            special={false}
            title="For Employee"
          />

          {/* special trip  */}

          <h1 className="text-5xl font-medium text-center mb-5">
            Weekend Special Trip
          </h1>
          <h1 className="text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
            From Town
          </h1>
          {/* Student special Bus From Campus  */}
          <Schedule
            data={weekendBusForStudentsFromTown}
            title="For Students"
          />
          <Schedule
            data={weekendBusForTeachersFromTown}
            title="For Teachers"
          />
          <Schedule
            data={weekendBusForEmployeeFromTown}
            title="For Employee"
          />

          <h1 className="text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
            From Campus
          </h1>
          <Schedule
            data={weekendBusForStudentsFromCampus}
            title="For Students"
          />
          <Schedule
            data={weekendBusForTeachersFromCampus}
            title="For Teachers"
          />
          <Schedule
            data={weekendBusForEmployeeFromCampus}
            title="For Employee"
          />
          <h1 className="text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
            From Terminal
          </h1>
          <Schedule
            data={weekendBusForStudentFromTerminal}
            title="For Students"
          />

          <Schedule
            data={weekendBusForEmployeeFromTerminal}
            title="For Employee"
          />
        </div>
      </div>
    </div>
  );
}
