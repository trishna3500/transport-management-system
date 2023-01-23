import { onValue, ref, remove, set, update } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import "../firebase";
import { rtDb } from "../firebase";

const DataContext = React.createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  let [alldata, setAllData] = useState([]);
  let [req, setReq] = useState([]);

  useEffect(() => {
    const dataref = ref(rtDb, "BusSchedule/");
    onValue(dataref, (snapshot) => {
      let array = [];
      snapshot.forEach((schedule) => {
        array.push(schedule.val());
      });
      setAllData(array);
    });

    const dataref1 = ref(rtDb, "Requisition/");
    onValue(dataref1, (snapshot) => {
      let array = [];
      snapshot.forEach((application) => {
        array.push(application.val());
      });
      setReq(array);
    });

  }, [onValue]);

  function postSchedule(trip, time, bus, day, type) {
    let key = v4();
    let data = {
      id: key,
      trip: trip,
      time: time,
      bus: bus,
      day: day,
      type: type,
    };
    set(ref(rtDb, "BusSchedule/" + key), data);
  }

  function editSchedule(id, updates) {
    update(ref(rtDb, "BusSchedule/" + id), updates);
  }

  function deleteSchedule(id) {
    remove(ref(rtDb, "BusSchedule/" + id));
  }

  function postRequisition(sid, name, dept, faculty, ls, date, reason) {
    let key = v4();
    let data = {
      id: key,
      sid: sid,
      name: name,
      dept: dept,
      faculty: faculty,
      ls: ls,
      date: date,
      reason: reason,
      status:"false"
    };
    set(ref(rtDb, "Requisition/" + key), data);
  }

  function editRequisition(id, updates) {
    update(ref(rtDb, "Requisition/" + id), updates);
  }

  function deleteRequisition(id) {
    remove(ref(rtDb, "Requisition/" + id));
  }

  const value = {
    postSchedule,
    alldata,
    editSchedule,
    deleteSchedule,
    postRequisition,
    req,
    editRequisition,
    deleteRequisition
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
