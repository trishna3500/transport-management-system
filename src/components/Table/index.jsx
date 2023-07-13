import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useContext, useEffect, Children } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useData } from "../../context/DatabaseContext";
import EditScheduleModal from "../Modal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Schedule({ data, special, title }) {
  const { user, logout } = useContext(AuthContext);
  let { deleteSchedule } = useData();
  let [isOpen, setIsOpen] = useState(false);

  const [busSchedule, setBusSchedule] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/all-bus")
      .then((res) => res.json())
      .then((data) => setBusSchedule(data));
  }, []);

  const studentFromShohor = busSchedule?.data?.filter(
    (bus) => bus.busType === "student"
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const busData = busSchedule?.data;

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Day
              </th>

              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Trip Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Departure time
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Bus No.
              </th>

              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <TableBody busData={busData}>{busData}</TableBody>
        </table>
      </div>
    </div>
  );
}

export const TableBody = (busData) => {
  const { busType, Schedule, busNumber, day, location } = busData;
  console.log(busType, Schedule, busNumber, day);
  return (
    <div>
      <tbody>
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-600 whitespace-no-wrap">
              <span className=" capitalize">{busType}</span>
            </p>
          </td>

          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-600 whitespace-no-wrap">
              <span className=" capitalize"> {Schedule}</span>
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{busNumber}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              />
              <p className="text-gray-600 whitespace-no-wrap">{day}</p>
            </span>
          </td>

          <>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button
                // onClick={() => openModal()}
                className="text-lime-600 whitespace-no-wrap"
              >
                <PencilSquareIcon className="w-6" />
              </button>

              {/* <EditScheduleModal
              // isOpen={isOpen}
              // data={}
              // closeModal={closeModal}
              /> */}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button
                // onClick={() => deleteSchedule(.id)}
                className="text-red-600 whitespace-no-wrap"
              >
                <TrashIcon className="w-6" />
              </button>
            </td>
          </>
        </tr>
      </tbody>
    </div>
  );
};

export const TableHeader = () => {
  return (
    <div>
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Day
          </th>

          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Trip Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Departure time
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Bus No.
          </th>

          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Edit
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Delete
          </th>
        </tr>
      </thead>
    </div>
  );
};
