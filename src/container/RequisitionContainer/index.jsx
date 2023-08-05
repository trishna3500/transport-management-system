import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import TimePicker from "react-time-picker";
import { AuthContext } from "../../context/AuthContext";
import useUser from "../../hooks/useUser";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
export default function RequisitionContainer() {
  const { user } = useContext(AuthContext);
  const [value, onChange] = useState("10:00");
  let navigate = useNavigate();
  const [isUser, isUserLoading, userData] = useUser(user?.email);
  console.log(isUser, isUserLoading, userData);
  let [sid, setSid] = useState("");
  let [name, setName] = useState("");
  let [dept, setDept] = useState("");
  let [faculty, setFaculty] = useState("");
  let [ls, setLS] = useState("");
  let [date, setDate] = useState("");
  let [reason, setReason] = useState("");
  let [EmployeeId, setEmployeeId] = useState("");
  const requisitionTime = [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
  ];
  function onSubmitHandle(e) {
    e.preventDefault();
    const form = e.target;
    const starting_time = form.starting_time.value;
    const ending_time = form.ending_time.value;
    const purpose = form.purpose.value;
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
      role: userData.role,
      email: user?.email,
      starting_time: starting_time,
      ending_time: ending_time,
      purpose: purpose,
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
    <div className="  m-10">
      <button onClick={() => navigate("/")} className="flex space-x-1 mt-5">
        <ArrowLeftIcon className="w-6" /> <span>Back</span>
      </button>
      <div className="flex justify-center w-11/12">
        <form
          className="flex flex-col w-1/2 space-y-3 mt-10"
          onSubmit={(e) => onSubmitHandle(e)}
        >
          <div>
            <input
              type="text"
              name="name"
              required
              className="w-full border"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {userData?.role === "student" ? (
            <>
              {" "}
              <div>
                <input
                  type="text"
                  name="studentId"
                  required
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
                  required
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
              required
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
              required
              className="w-full border"
              placeholder="Enter Department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
          </div>
          {userData?.role === "student" && (
            <div>
              <input
                type="text"
                name="semester"
                required
                className="w-full border"
                placeholder="Level Semester"
                value={ls}
                onChange={(e) => setLS(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-5">
            <input
              type="date"
              name="date"
              required
              className="w-full border"
              placeholder="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <select
              className="select select-primary w-full max-w-xs"
              name="starting_time"
              required
            >
              <option disabled selected>
                Pick your Starting Time
              </option>
              {requisitionTime.map((time) => (
                <option>{time}</option>
              ))}
            </select>
            <select
              className="select select-primary w-full max-w-xs"
              name="ending_time"
              required
            >
              <option disabled selected>
                Pick your Ending Time
              </option>
              {requisitionTime.map((time) => (
                <option>{time}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <h1 className="font-medium">
              Purpose <span className="text-red-600">*</span> :
            </h1>
            <div className="flex gap-1">
              <input
                type="radio"
                name="purpose"
                id="official"
                value="official"
                className="radio radio-primary"
                checked
              />
              <label for="official">Official</label>
            </div>

            <div className="flex gap-1">
              <input
                type="radio"
                name="purpose"
                id="personal"
                value="personal"
                className="radio radio-primary"
              />
              <label for="personal">Personal</label>
            </div>
          </div>
          <div>
            <textarea
              name="reason"
              required
              rows="5"
              placeholder="Your Reason in short"
              className="border w-full"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>

          <button className="bg-green-400 hover:bg-green-500 rounded-lg hover:rounded-xl px-5 py-2 w-24">
            {" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
