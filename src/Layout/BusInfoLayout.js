import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar/Navbar2";
import Navbar from "../components/Navbar/Navbar";

const BusInfoLayout = () => {
  const [busNumber, setBusNumber] = useState();
  const [busInfo, setBusInfo] = useState([]);
  const busDetails = busInfo[0];
  console.log(busDetails);
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/bus-info/${busNumber}`)
      .then((res) => res.json())
      .then((data) => setBusInfo(data.data));
  }, [busNumber]);

  return (
    <div className="bg-stone-100 h-screen">
      <Navbar></Navbar>
      <h1 className="text-3xl text-center font-bold mt-10">
        Driver and Bus Info
      </h1>
      <div>
        {" "}
        <table className=" w-10/12 mx-auto mt-[40px] bg-slate-200 rounded-md px-5 py-2 text-black border border-collapse">
          <thead className=" bg-slate-400">
            <tr>
              <th className=" border border-white">Driver Name</th>
              <th className=" border border-white">Mobile Number</th>
              <th className=" border border-white">Bus Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" border border-white">Rejaul Haque</td>
              <td className=" border border-white">01735562782</td>
              <td className=" border border-white">
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="cursor-pointer underline-offset-1 text-lg "
                    onClick={() => setBusNumber(1)}
                  >
                    1
                  </button>
                  ,{" "}
                  <button
                    className="cursor-pointer underline-offset-1 text-lg "
                    onClick={() => setBusNumber(7)}
                  >
                    7
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className=" border border-white">Rashidul Islam</td>
              <td className=" border border-white">01719749687</td>
              <div className="flex items-center justify-center gap-3">
                <button
                  className="cursor-pointer underline-offset-1 text-lg "
                  onClick={() => setBusNumber(2)}
                >
                  2
                </button>
                ,{" "}
                <button
                  className="cursor-pointer underline-offset-1 text-lg "
                  onClick={() => setBusNumber(8)}
                >
                  8
                </button>
              </div>
            </tr>
            <tr>
              <td className=" border border-white">Nur Islam</td>
              <td className=" border border-white">01796055061</td>
              <div className="flex items-center justify-center gap-3">
                <button
                  className="cursor-pointer underline-offset-1 text-lg "
                  onClick={() => setBusNumber(3)}
                >
                  3
                </button>
                ,{" "}
                <button
                  className="cursor-pointer underline-offset-1 text-lg"
                  onClick={() => setBusNumber(9)}
                >
                  9
                </button>
              </div>
            </tr>
            <tr>
              <td className=" border border-white">Alom Mia</td>
              <td className=" border border-white">01797230909</td>
              <div className="flex items-center justify-center gap-3">
                <button
                  className="cursor-pointer underline-offset-1 text-lg "
                  onClick={() => setBusNumber(4)}
                >
                  4
                </button>
                ,{" "}
                <button
                  className="cursor-pointer underline-offset-1 text-lg"
                  onClick={() => setBusNumber(10)}
                >
                  10
                </button>
              </div>
            </tr>
            <tr>
              <td className=" border border-white">Robiul Islam</td>
              <td className=" border border-white">01732766754</td>
              <div className="flex items-center justify-center gap-3">
                <button
                  className="cursor-pointer underline-offset-1 text-lg "
                  onClick={() => setBusNumber(5)}
                >
                  5
                </button>
                ,{" "}
                <button
                  className="cursor-pointer underline-offset-1 text-lg"
                  onClick={() => setBusNumber(11)}
                >
                  11
                </button>
              </div>
            </tr>
            <tr>
              <td className=" border border-white">Md Azizul Hoq</td>
              <td className=" border border-white">01719204164</td>
              <div className="flex items-center justify-center gap-3">
                <button
                  className="cursor-pointer underline-offset-1 text-lg "
                  onClick={() => setBusNumber(6)}
                >
                  6
                </button>
                ,{" "}
                <button
                  className="cursor-pointer underline-offset-1 text-lg"
                  onClick={() => setBusNumber(12)}
                >
                  12
                </button>
              </div>
            </tr>
          </tbody>
        </table>
        {busDetails && (
          <div className=" flex justify-center items-center mt-10 ">
            <div>
              <h1 className="text-center text-3xl font-bold">Bus Details</h1>
              <img src={busDetails?.image} alt="" className="h-60 w-96" />
              <h1 className="text-lg font-medium">
                Bus Number: {busDetails?.bNumber}
              </h1>
              <h1 className="text-lg font-medium">
                Capacity: {busDetails?.capacity}
              </h1>
              <h1 className="text-lg font-medium">
                Driver's Name: {busDetails?.DriverName}{" "}
              </h1>
              <h1 className="text-lg font-medium">
                Mobile Number: {busDetails?.MobileNumber}{" "}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusInfoLayout;
