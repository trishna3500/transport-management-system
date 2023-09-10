import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useUser from "../../hooks/useUser";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Dashboard", href: "#", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [userHasRequisition, setUserHasRequisition] = useState([]);
  // console.log(userHasRequisition);
  const userRequisitions = userHasRequisition.length;
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [role, setUserRole] = useState();

  const [isUser, userData, userRole] = useUser(user?.email);
  // console.log(isUser, userData, userRole?.role);
  const [unverifiedUser, setUnverifiedUsers] = useState([]);
  const [unverifiedRequisitions, setUnverifiedRequisitions] = useState([]);
  const [busSchedule, setBusSchedule] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/user-requisition/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserHasRequisition(data?.data));

    fetch("http://localhost:5000/api/v1/all-bus")
      .then((res) => res.json())
      .then((data) => {
        setBusSchedule(data);
      });

    fetch(`http://localhost:5000/api/v1/users/verify/unverified-user`)
      .then((res) => res.json())
      .then((data) => {
        setUnverifiedUsers(data.data);
      });

    fetch(`http://localhost:5000/api/v1/unverified-requisitions`)
      .then((res) => res.json())
      .then((data) => {
        setUnverifiedRequisitions(data.data);
      });

    fetch(`http://localhost:5000/api/v1/users/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.data[0]?.role === "employee") {
          setUserRole("employee");
        } else if (data.data[0]?.role === "student") {
          setUserRole("student");
        } else if (data.data[0]?.role === "teacher") {
          setUserRole("teacher");
        } else if (data.data[0]?.role === "admin") {
          setUserRole("admin");
        }
        console.log(userRole);
      });
  }, [user?.email]);

  return (
    <Disclosure
      as="nav"
      className="backdrop-blur-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link to="/">
                        <div className="flex gap-3">
                          <img
                            className="block h-8 w-auto "
                            src="https://i.ibb.co/RcxvNwJ/bus.png"
                            alt="Your Company"
                          />
                          <button className="text-white font-semibold text-xl">
                            HSTU TMS
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                {isAdmin && (
                  <div className="flex gap-7 mt-3">
                    <Link to="/add-schedule">
                      <button className="text-white">Add Schedule</button>
                    </Link>
                    <Link to="/teacher-signup">
                      <button className="text-white">Add Teacher</button>
                    </Link>
                    <Link to="/employee-signup">
                      <button className="text-white">Add Employee</button>
                    </Link>
                    <Link to="/all-users">
                      <button className="text-white">
                        All Users
                        <div className="badge badge-error">
                          {unverifiedUser.length} unverified
                        </div>
                      </button>
                    </Link>
                  </div>
                )}
                {isAdmin && (
                  <button
                    className="text-white mr-4 ml-4"
                    onClick={() =>
                      navigate(user ? "/view-requisition" : "/requisition")
                    }
                  >
                    Bus Requisitions
                    <div className="badge badge-error">
                      {unverifiedRequisitions.length} unverified
                    </div>
                  </button>
                )}

                {user?.email && !isAdmin && (
                  <Link to="/requisition">
                    <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                      Make Requisition
                    </button>
                  </Link>
                )}

                <button
                  class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white"
                  onClick={() => navigate("/dashboard")}
                >
                  <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span class="relative">Driver Info</span>
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user?.email && !isAdmin && (
                  <div
                    className=" tooltip tooltip-bottom"
                    data-tip={
                      userHasRequisition.length > 0
                        ? `you have ${userRequisitions} requisition approved for reason: ${userHasRequisition[0]?.reason}`
                        : `0 requisitions approved `
                    }
                  >
                    <button className="btn bg-neutral-focus text-white border-none ">
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                      <div className="badge badge-error ml-[-12px]">
                        {userRequisitions}
                      </div>
                    </button>
                  </div>
                )}

                <Menu as="div" className="relative ml-3">
                  <div className="flex">
                    {user?.email ? (
                      <>
                        {" "}
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>

                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/en/0/0c/HSTU_Logo.png"
                            alt=""
                          />
                        </Menu.Button>
                      </>
                    ) : (
                      <div className="flex gap-4">
                        <Link to="/signup">
                          <button className="bg-green-400 px-4 py-1 rounded-md hover:rounded-3xl hover:bg-green-500">
                            <h1 className="font-semibold text-lg">New Here?</h1>
                          </button>
                        </Link>
                        <Link to="/signin">
                          <button className="mt-[5px]">
                            <h1 className="font-semibold text-lg text-white underline">
                              Sign in
                            </h1>
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user?.email && (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {user?.email}
                            </a>
                          )}
                        </Menu.Item>
                      )}
                      {!user?.email && (
                        <div>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/signin"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm "
                                )}
                              >
                                Sign in
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/signup"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign up
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      )}

                      {user?.email && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={classNames(
                                active ? "bg-gray-100 w-full text-left" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
