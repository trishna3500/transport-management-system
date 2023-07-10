import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DatabaseContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar2() {
  let { alldata } = useData();
  let { currentUser } = useAuth();
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
                onClick={() =>
                  navigate(currentUser ? "/view-requisition" : "/requisition")
                }
              >
                {currentUser ? "  View Bus Requisition" : "Bus Requisition"}
              </button>
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
