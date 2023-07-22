import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DatabaseContext";
import { toast } from "react-hot-toast";
import useAdmin from "../../hooks/useAdmin";
import { AuthContext } from "../../context/AuthContext";
import useTeacher from "../../hooks/useTeacher";

export default function RequisitionContainer() {
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();
  const [isTeacher] = useTeacher(user?.email);
  console.log(isTeacher);
  let [sid, setSid] = useState("");
  let [name, setName] = useState("");
  let [dept, setDept] = useState("");
  let [faculty, setFaculty] = useState("");
  let [ls, setLS] = useState("");
  let [date, setDate] = useState("");
  let [reason, setReason] = useState("");
  let [EmployeeId, setEmployeeId] = useState("");
  let { postRequisition } = useData();
  let [role, setRole] = useState();

  function onSubmitHandle(e) {
    if (isTeacher) {
      setRole("Teacher");
    } else {
      setRole("Student");
    }
    e.preventDefault();
    const requisitionData = {
      name: name,
      id: sid,
      dept: dept,
      faculty: faculty,
      ls: ls,
      date: date,
      reason: reason,
      isVerified: "false",
      employeeId: EmployeeId,
      role: role,
    };
    console.log(requisitionData);
    fetch(`http://localhost:5000/api/v1/add-requisition`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requisitionData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          navigate("/");
          toast.success("Posted your Requisition");
        } else if (data.success === false) {
          toast.error("Please Enter your data correctly");
        }
      });
  }
  return (
    <div className="container m-10">
      <button onClick={() => navigate("/")} className="flex space-x-1 mt-5">
        <ArrowLeftIcon className="w-6" /> <span>Back</span>
      </button>
      <div>
        <form
          className="flex flex-col w-1/2 space-y-3 mt-10"
          onSubmit={(e) => onSubmitHandle(e)}
        >
          <div>
            <input
              type="text"
              name="name"
              id=""
              className="w-full border"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {!isTeacher ? (
            <>
              {" "}
              <div>
                <input
                  type="text"
                  name="studentId"
                  id=""
                  className="w-full border"
                  placeholder="Enter Student ID"
                  value={sid}
                  onChange={(e) => setSid(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <input
                  type="text"
                  name="EmployeeId"
                  id=""
                  className="w-full border"
                  placeholder="Enter Employee ID"
                  value={EmployeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <input
              type="text"
              name="faculty"
              id=""
              className="w-full border"
              placeholder="Enter Faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="department"
              id=""
              className="w-full border"
              placeholder="Enter Department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
          </div>
          {!isTeacher && (
            <div>
              <input
                type="text"
                name="semester"
                id=""
                className="w-full border"
                placeholder="Level Semester"
                value={ls}
                onChange={(e) => setLS(e.target.value)}
              />
            </div>
          )}

          <div>
            <input
              type="date"
              name="date"
              id=""
              className="w-full border"
              placeholder="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <textarea
              name="reason"
              id=""
              rows="5"
              placeholder="Your Reason in short"
              className="border w-full"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>

          <button className="bg-blue-400 px-3 py-1 w-20 rounded-lg">
            {" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
