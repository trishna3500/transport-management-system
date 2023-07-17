import { useState } from "react";
import { useData } from "../../context/DatabaseContext";

export default function AddBusSchedule() {
  let [trip, setTrip] = useState();
  let [time, setTime] = useState("");
  let [bus, setBus] = useState("");
  let [day, setDay] = useState("");
  let [type, setType] = useState("");

  let { postSchedule } = useData();

  function onSubmitHandle(e) {
    e.preventDefault();
    const form = e.target;
    const tripName = form.tripName.value;
    const schedule = form.schedule.value;
    const busNumber = form.busNumber.value;
    const day = form.day.value;
    const scheduleType = form.scheduleType.value;

    console.log(tripName, schedule, busNumber, day, scheduleType);
    const addedSchedule = {
      busType: tripName,
      schedule: schedule,
      busNumber: busNumber,
      day: day,
      location: scheduleType,
    };

    fetch("http://localhost:5000/api/v1/add-schedule", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addedSchedule),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
                name="tripName"
                value={trip}
                onChange={(e) => {
                  setTrip(e.target.value);
                }}
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Employee">Employee</option>
                <option value="Teacher + Employee">Teacher + Employee</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="schedule"
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
                name="busNumber"
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
                name="day"
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="Sunday to Thursday">Sunday to Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <div>
              <input
                onChange={(e) => setType(e.target.value)}
                type="radio"
                name="scheduleType"
                id="fromcampus"
                value="fromcampus"
              />
              <label for="fromcampus">From Campus</label>
              <br />
              <input
                onChange={(e) => setType(e.target.value)}
                type="radio"
                name="scheduleType"
                id="fromshohor"
                value="fromshohor"
              />
              <label for="fromshohor">From Sohor</label>
            </div>
            <div>
              <button className="bg-lime-400 px-3 py-2">Add Schedule</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
