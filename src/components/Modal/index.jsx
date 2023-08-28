import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-hot-toast";

export default function EditScheduleModal({ isOpen, closeModal, data }) {
  // console.log(data);
  function handleEditSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const busType = form.busType?.value;
    const schedule = form.schedule?.value;
    const busNumber = form.busNumber?.value;
    const day = form.day?.value;
    const location = form.location?.value;

    const updatedInfo = {
      busType: busType || data?.busNumber,
      schedule: schedule || data?.schedule,
      busNumber: busNumber || data?.busNumber,
      day: day || data?.day,
      location: location || data?.location,
    };
    // console.log(updatedInfo);
    fetch(`http://localhost:5000/api/v1/edit-schedule/${data._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toast.success("Updated Bus Schedule");
      });
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
                    className="text-xl font-medium leading-6 text-gray-900 text-center"
                  >
                    Edit Schedule
                  </Dialog.Title>
                  <div className="mt-2 px-2 py-10">
                    <div className="container">
                      <div className="flex justify-center">
                        <form
                          className="flex flex-col w-1/2 space-y-3"
                          onSubmit={handleEditSubmit}
                        >
                          <div>
                            <select className="w-full border" name="busType">
                              <option value={data?.busType}>
                                {data?.busType}
                              </option>
                              <option value="Student">Student</option>
                              <option value="Teacher">Teacher</option>
                              <option value="Employee">Employee</option>
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
                              placeholder={data.busNumber}
                            />
                          </div>
                          <div className="">
                            <select className="w-full border" name="day">
                              <option value={data?.day}>{data?.day}</option>
                              <option value="Sunday to Thursday">
                                Sunday to Thursday
                              </option>
                              <option value="Friday">Friday</option>
                              <option value="Saturday">Saturday</option>
                            </select>
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="location"
                              id="fromcampus"
                              value="fromcampus"
                            />
                            <label for="fromcampus">From Campus</label>
                            <br />
                            <input
                              type="radio"
                              name="location"
                              id="fromtown"
                              value="fromtown"
                            />
                            <label for="fromtown">From Town</label>
                          </div>
                          <div className="flex space-x-3">
                            <button className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium  hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                              Confirm
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
