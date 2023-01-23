import { useState } from "react";
import { useData } from "../../context/DatabaseContext";

export default function BusSchedule() {
  let [trip, setTrip] = useState();
  let [time, setTime] = useState("");
  let [bus, setBus] = useState("");
  let [day, setDay] = useState("");
  let [type, setType] = useState("");

  let { postSchedule } = useData();

  function onSubmitHandle(e) {
    e.preventDefault();
    postSchedule(trip, time, bus, day, type);
  }

  return (
    <>
      <div className="container">
        <div className="flex justify-center mt-20">
          <form
            className="flex flex-col w-1/2 space-y-3"
            onSubmit={(e) => onSubmitHandle(e)}
          >
            <div>
              <select
                className="w-full border"
                value={trip}
                onChange={(e) => {
                  setTrip(e.target.value);
                }}
              >
                <option>Choose trip name</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Employee">Employee</option>
                <option value="Teacher + Employee">Teacher + Employee</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name=""
                id=""
                className="w-full border"
                placeholder="Schedule"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name=""
                id=""
                className="w-full border"
                placeholder="Bus Number"
                value={bus}
                onChange={(e) => setBus(e.target.value)}
              />
            </div>
            <div className="">
              <select
                className="w-full border"
                onChange={(e) => setDay(e.target.value)}
              >
                <option>Choose day</option>
                <option value="Sunday to Thursday">Sunday to Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <div>
              <input
                onChange={(e) => setType(e.target.value)}
                type="radio"
                name="scheduletype"
                id="fromcampus"
                value="fromcampus"
              />
              <label for="fromcampus">From Campus</label>
              <br />
              <input
                onChange={(e) => setType(e.target.value)}
                type="radio"
                name="scheduletype"
                id="fromshohor"
                value="fromshohor"
              />
              <label for="fromshohor">From Sohor</label>
            </div>
            <div>
              <input
                type="submit"
                value="Add Schedule"
                className="bg-lime-500 rounded-md px-5 py-2 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
