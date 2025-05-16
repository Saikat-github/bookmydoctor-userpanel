import React, { useState, useEffect, useContext } from "react";
import { useSocket } from "./useSocket";
import { Loader2 } from "lucide-react"


const formatDate = (date) => {
  if (!date) return "Invalid Date";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "Invalid Date";

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return parsedDate.toLocaleString(undefined, options);
};


const RealTimeStatus = ({ date, doctorId, avgTime }) => {
  const { data, status, loader } = useSocket(doctorId, date);



  return (
    <div className="flex flex-col items-center justify-center text-slate-700 rounded-2xl ">
      <div className="bg-white text-slate-700 rounded-2xl shadow-slate-500 shadow-xl p-6 w-full max-w-lg text-sm">
        <h1 className="text-xl font-semibold text-center mb-4">Live Status</h1>
        <div className="mb-2">
          <span className="font-semibold">Date - </span>
          <span className="">{formatDate(date)}</span>
        </div>

        {loader ? (
          <Loader2 className="w-6 animate-spin text-indigo-500" />
        ) : (
          <>
            <div className="flex items-center mb-2">
              <span className="font-semibold">Total Patients - </span>
              <span className="text-xl font-semibold">&nbsp;{data?.totalSerialNumber || 0}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-semibold">Current Checking - </span>
              <span className="text-xl font-semibold text-indigo-600">&nbsp;{data?.currSerialNumber || 0}</span>
            </div>
          </>
        )}

        <div className="flex items-center mb-2">
          <span className="font-semibold">Avg Checkup Time - </span>
          <span className="text-xl font-semibold text-indigo-600">&nbsp;{avgTime} mins</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeStatus;
