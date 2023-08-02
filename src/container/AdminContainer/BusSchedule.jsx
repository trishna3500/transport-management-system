import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddBusSchedule() {
  const navigate = useNavigate();
  function onSubmitHandle(e) {
    e.preventDefault();
    const form = e.target;
    const tripName = form.tripName.value;
    const schedule = form.schedule.value;
    const busNumber = form.busNumber.value;
    const day = form.day.value;
    const scheduleType = form.scheduleType.value;

    const addedSchedule = {
      busType: tripName,
      schedule: schedule,
      busNumber: busNumber,
      day: day,
      location: scheduleType,
    };

    console.log(addedSchedule);
    fetch("http://localhost:5000/api/v1/add-schedule", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addedSchedule),
    })
      .then((res) => res.json())
      .then((data) => {
        form.reset();
        toast.success("Bus Schedule added successfully");
        navigate("/");
      });
  }

  return (
    <>
      <div className="flex justify-center items-center mt-20 mx-60">
        <form
          className="flex flex-col w-1/2 space-y-3"
          onSubmit={(e) => onSubmitHandle(e)}
        >
          <div>
            <select className="w-full border" name="tripName">
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Employee">Employee</option>
              {/* <option value="Teacher + Employee">Teacher + Employee</option> */}
            </select>
          </div>
          <div>
            <input
              type="text"
              name="schedule"
              id=""
              className="w-full border"
              placeholder="Schedule"
            />
          </div>
          <div>
            <input
              type="text"
              name="busNumber"
              id=""
              className="w-full border"
              placeholder="Bus Number"
            />
          </div>
          <div className="">
            <select className="w-full border" name="day">
              <option value="Sunday to Thursday">Sunday to Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
          <div className="flex gap-3">
            <input
              type="radio"
              name="scheduleType"
              id="fromcampus"
              value="fromcampus"
            />
            <label for="fromcampus">From Campus</label>
            <br />
            <input
              type="radio"
              name="scheduleType"
              id="fromtown"
              value="fromtown"
            />
            <label for="fromtown">From Town</label>
            <input
              type="radio"
              name="scheduleType"
              id="fromTerminal"
              value="fromTerminal"
            />
            <label for="fromtown">From Terminal</label>
          </div>
          <div>
            <button className="bg-green-400 rounded-lg hover:bg-green-500 hover:rounded-2xl px-5 py-2 font-medium">
              Add Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
