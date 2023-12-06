import React from "react";
import { Link } from "react-router-dom";
import { items } from "../constant/dashboardConstant";

function Dashboard() {
  return (
    <div className="flex items-center h-full">
      <div className="w-[65%] h-fit m-auto grid grid-cols-3 gap-10 pb-12">
        {items.map((item, idx) => (
          <Link to={item.path} key={idx}>
            <div className="bg-white w-full h-full p-5 text-center rounded-lg shadow-xl flex flex-col hover:scale-105 hover:text-blue-800 duration-200 ease-in cursor-pointer text-gray-800 opacity-90 hover:opacity-100">
              <div className="h-28 flex items-center">{item.icon}</div>
              <div className="font-semibold text-xl">{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
