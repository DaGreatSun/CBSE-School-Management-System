import React from "react";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsPersonFillLock } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { FaFileSignature } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Dashboard() {
  const items = [
    {
      name: "Student",
      icon: <PiStudentFill size={60} className="m-auto" />,
      path: "/students",
    },
    {
      name: "Teacher",
      icon: <FaChalkboardTeacher size={60} className="m-auto" />,
      path: "",
    },
    {
      name: "Admin",
      icon: <BsPersonFillLock size={55} className="m-auto" />,
      path: "",
    },
    {
      name: "Class",
      icon: <SiGoogleclassroom size={60} className="m-auto" />,
      path: "",
    },
    {
      name: "Attendance",
      icon: <FaFileSignature size={50} className="m-auto" />,
      path: "",
    },
    {
      name: "Salary",
      icon: <RiMoneyDollarCircleFill size={60} className="m-auto" />,
      path: "",
    },
  ];

  return (
    <div className="flex items-center h-full">
      <div className="w-[65%] h-fit m-auto grid grid-cols-3 gap-10 ">
        {items.map((item, idx) => (
          <Link to={item.path} key={idx}>
            <div className="bg-white w-full h-full p-5 text-center rounded-lg shadow-xl flex flex-col hover:scale-105 hover:text-blue-800 duration-200 ease-in cursor-pointer text-gray-800 opacity-90">
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
