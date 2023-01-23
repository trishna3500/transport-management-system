import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DatabaseContext";

export default function RequisitionContainer() {
  let navigate = useNavigate();

  let [sid, setSid] = useState("");
  let [name, setName] = useState("");
  let [dept, setDept] = useState("");
  let [faculty, setFaculty] = useState("");
  let [ls, setLS] = useState("");
  let [date, setDate] = useState("");
  let [reason, setReason] = useState("");

  let { postRequisition } = useData();

  function onSubmitHandle(e) {
    e.preventDefault();
    postRequisition(sid, name, dept, faculty, ls, date, reason);
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
              name=""
              id=""
              className="w-full border"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name=""
              id=""
              className="w-full border"
              placeholder="Enter Student ID"
              value={sid}
              onChange={(e) => setSid(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name=""
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
              name=""
              id=""
              className="w-full border"
              placeholder="Enter Department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name=""
              id=""
              className="w-full border"
              placeholder="Level Semester"
              value={ls}
              onChange={(e) => setLS(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              name=""
              id=""
              className="w-full border"
              placeholder="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <textarea
              name=""
              id=""
              rows="5"
              className="border w-full"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>

          <div>
            <input
              type="submit"
              value="Submit"
              className="bg-lime-500 rounded-md px-5 py-2 text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
