import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsPersonFillLock } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { FaFileSignature } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export const items = [
  {
    name: "Student",
    icon: <PiStudentFill size={60} className="m-auto" />,
    path: "/students",
  },
  {
    name: "Teacher",
    icon: <FaChalkboardTeacher size={60} className="m-auto" />,
    path: "/teachers",
  },
  {
    name: "Admin",
    icon: <BsPersonFillLock size={55} className="m-auto" />,
    path: "/admin",
  },
  {
    name: "Class",
    icon: <SiGoogleclassroom size={60} className="m-auto" />,
    path: "/classes",
  },
  {
    name: "Attendance",
    icon: <FaFileSignature size={50} className="m-auto" />,
    path: "/attendance",
  },
  {
    name: "Salary",
    icon: <RiMoneyDollarCircleFill size={60} className="m-auto" />,
    path: "",
  },
];
