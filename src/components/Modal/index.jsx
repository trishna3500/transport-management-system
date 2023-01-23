import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useData } from "../../context/DatabaseContext";

export default function EditScheduleModal({ isOpen, closeModal, data }) {
  let [trip, setTrip] = useState(data.trip);
  let [time, setTime] = useState(data.time);
  let [bus, setBus] = useState(data.bus);
  let [day, setDay] = useState(data.day);
  let [type, setType] = useState(data.type);

  let { editSchedule } = useData();

  function onSubmitHandle(e) {
    e.preventDefault();
    let update = {
      trip,
      time,
      bus,
      day,
      type,
    };
    editSchedule(data.id, update);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Schedule
                  </Dialog.Title>
                  <div className="mt-2 px-20 py-10">
                    <div className="container">
                      <div className="flex justify-center">
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
                              <option value="Teacher + Employee">
                                Teacher + Employee
                              </option>
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
                              value={day}
                              className="w-full border"
                              onChange={(e) => setDay(e.target.value)}
                            >
                              <option>Choose day</option>
                              <option value="Sunday to Thursday">
                                Sunday to Thursday
                              </option>
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
                              checked={type === "fromcampus"}
                            />
                            <label for="fromcampus">From Campus</label>
                            <br />
                            <input
                              onChange={(e) => setType(e.target.value)}
                              type="radio"
                              name="scheduletype"
                              id="fromshohor"
                              value="fromshohor"
                              checked={type === "fromshohor"}
                            />
                            <label for="fromshohor">From Sohor</label>
                          </div>
                          <div className="flex space-x-3">
                            <input
                              type="submit"
                              value="Edit"
                              onClick={closeModal}
                              className="bg-lime-500 rounded-md px-5 py-2 text-white"
                            />
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
