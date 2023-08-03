import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Dashboard", href: "#", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [userHasRequisition, setUserHasRequisition] = useState([]);
  console.log(userHasRequisition);
  const userRequisitions = userHasRequisition.length;
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/user-requisition/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserHasRequisition(data?.data));
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
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
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
