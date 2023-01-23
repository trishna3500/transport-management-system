import { useNavigate } from "react-router-dom";
import Schedule from "../../components/Table";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DatabaseContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeContainer() {
  let { alldata } = useData();
  let { currentUser } = useAuth();
  let navigate = useNavigate();

  let fromcampus = alldata.filter(function checkAdult(type) {
    return type.type === "fromcampus" && type.day === "Sunday to Thursday";
  });

  let fromshohor = alldata.filter(function checkAdult(type) {
    return type.type === "fromshohor" && type.day === "Sunday to Thursday";
  });

  let sfromcampus = alldata.filter(function checkAdult(type) {
    return type.type === "fromcampus" && type.day !== "Sunday to Thursday";
  });

  let sfromshohor = alldata.filter(function checkAdult(type) {
    return type.type === "fromshohor" && type.day !== "Sunday to Thursday";
  });

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
            </div>
          </div>
          {/* from campus  */}
          <Schedule data={fromcampus} special={false} title="From Campus" />
          {/* from sohor  */}
          <Schedule data={fromshohor} special={false} title="From Shohor" />

          {/* special trip  */}
          <div className="mt-10">
            <h1 className="text-xl font-bold">Special Trip</h1>
          </div>
          {/* special campus  */}
          <Schedule data={sfromcampus} special={true} title="From Campus" />
          {/* special shohor  */}
          <Schedule data={sfromshohor} special={true} title="From Shohor" />
        </div>
      </div>
    </>
  );
}
