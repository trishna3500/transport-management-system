import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import useAdmin from "../../hooks/useAdmin";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar2() {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  let navigate = useNavigate();
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between mb-20">
            <h2 className="text-4xl font-semibold leading-tight text-center">
              Transport Management System
            </h2>
            <div className="flex justify-end space-x-5">
              {isAdmin && (
                <Link to="/add-schedule">
                  <button
                    className={classNames(
                      user ? " bg-lime-300 " : " bg-yellow-300",
                      "text-black rounded-md px-4 py-2"
                    )}
                    // onClick={() => navigate(user ? "/add-schedule" : "/signin")}
                  >
                    Add Schedule
                  </button>
                </Link>
              )}

              {isAdmin && (
                <button
                  className=""
                  onClick={() =>
                    navigate(user ? "/view-requisition" : "/requisition")
                  }
                >
                  View Bus Requisition
                </button>
              )}

              {user?.email && !isAdmin && (
                <Link to="/requisition">
                  <button className="bg-sky-400 px-8 py-2">
                    Make Requisition
                  </button>
                </Link>
              )}

              <button
                class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white"
                onClick={() => navigate("/driver")}
              >
                <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                <span class="relative">Driver Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
