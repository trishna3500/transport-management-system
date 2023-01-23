import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DatabaseContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeContainer() {
  let { alldata, deleteSchedule } = useData();
  let { currentUser } = useAuth();
  let navigate = useNavigate();

  let fromcampus = alldata.filter(function checkAdult(type) {
    // console.log(type.day);
    return type.type === "fromcampus" && type.day === "Sunday to Thursday";
  });

  let fromshohor = alldata.filter(function checkAdult(type) {
    // console.log(type.type);
    return type.type === "fromshohor" && type.day === "Sunday to Thursday";
  });

  let sfromcampus = alldata.filter(function checkAdult(type) {
    console.log(type.day);
    return type.type === "fromcampus" && type.day !== "Sunday to Thursday";
  });

  let sfromshohor = alldata.filter(function checkAdult(type) {
    console.log(type.day);
    return type.type === "fromshohor" && type.day !== "Sunday to Thursday";
  });

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-4xl font-semibold leading-tight text-center">
              Transport Management System
            </h2>
            <div className="flex justify-end space-x-5">
              <button
                className={classNames(
                  currentUser ? " bg-lime-300 " : " bg-yellow-300",
                  "text-black rounded-md px-4 py-2"
                )}
                onClick={() => navigate(currentUser ? "/admin" : "/signin")}
              >
                {currentUser ? "Profile" : "Login"}
              </button>
              <button
                className={classNames(
                  currentUser ? " bg-red-600 " : " bg-yellow-300",
                  "text-black rounded-md px-4 py-2"
                )}
                onClick={() => navigate(currentUser ? "/admin" : "/signin")}
              >
                View Bus Requisition
              </button>
            </div>
          </div>
          {/* from campus  */}
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-20">
            <h1>From Campus</h1>
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Trip Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Departure time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Bus No.
                    </th>
                    {currentUser ? (
                      <>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Edit
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Delete
                        </th>
                      </>
                    ) : (
                      ""
                    )}
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" /> */}
                  </tr>
                </thead>
                <tbody>
                  {fromcampus.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            <span className=" capitalize"> {item.trip}</span>
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.time}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <p className="text-gray-600 whitespace-no-wrap">
                              {item.bus}
                            </p>
                          </span>
                        </td>
                        {currentUser ? (
                          <>
                            {" "}
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <button className="text-gray-600 whitespace-no-wrap">
                                <PencilSquareIcon className="w-6" />
                              </button>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <button
                                onClick={() => deleteSchedule(item.id)}
                                className="text-red-600 whitespace-no-wrap"
                              >
                                <TrashIcon className="w-6" />
                              </button>
                            </td>
                          </>
                        ) : (
                          ""
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* from sohor  */}
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <h1>From Shohor</h1>
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Trip Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Departure time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Bus No.
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
                  </tr>
                </thead>
                <tbody>
                  {fromshohor.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            <span className=" capitalize"> {item.trip}</span>
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.time}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <p className="text-gray-600 whitespace-no-wrap">
                              {item.bus}
                            </p>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* special trip  */}
          <div className="mt-10">
            <h1 className="text-xl font-bold">Special Trip</h1>
          </div>
          {/* special campus  */}
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <h1>From Campus</h1>
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
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
                  </tr>
                </thead>
                <tbody>
                  {sfromcampus.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            <span className=" capitalize"> {item.day}</span>
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            <span className=" capitalize"> {item.trip}</span>
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.time}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <p className="text-gray-600 whitespace-no-wrap">
                              {item.bus}
                            </p>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* special shohor  */}
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <h1>From Shohor</h1>
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
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
                  </tr>
                </thead>
                <tbody>
                  {sfromshohor.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            <span className=" capitalize"> {item.day}</span>
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            <span className=" capitalize"> {item.trip}</span>
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.time}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <p className="text-gray-600 whitespace-no-wrap">
                              {item.bus}
                            </p>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
