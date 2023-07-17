import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useData } from "../../context/DatabaseContext";
import { useContext } from "react";
import useAdmin from "../../hooks/useAdmin";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar2() {
  let { alldata } = useData();

  const { user, logout } = useContext(AuthContext);
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
              <button
                className={classNames(
                  user ? " bg-lime-300 " : " bg-yellow-300",
                  "text-black rounded-md px-4 py-2"
                )}
                onClick={() => navigate(user ? "/add-schedule" : "/signin")}
              >
                {user ? "Add Schedule" : "Login"}
              </button>

              {isAdmin && (
                <button
                  className={classNames(
                    user ? " bg-red-600 " : " bg-yellow-300",
                    "text-black rounded-md px-4 py-2"
                  )}
                  onClick={() =>
                    navigate(user ? "/view-requisition" : "/requisition")
                  }
                >
                  View Bus Requisition
                </button>
              )}

              {user?.email && (
                <Link to="/requisition">
                  <button className="bg-sky-400 px-8 py-2">
                    Make Requisition
                  </button>
                </Link>
              )}

              <button
                className={classNames(
                  "text-black bg-lime-700 rounded-md px-4 py-2"
                )}
                onClick={() => navigate("/driver")}
              >
                Driver Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
