import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsPersonFillLock } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { FaFileSignature } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export const items = [
  {
    name: "Class",
    icon: <PiStudentFill size={60} className="m-auto" />,
    path: "/attendance/class",
  },
  {
    name: "Teacher",
    icon: <FaChalkboardTeacher size={60} className="m-auto" />,
    path: "",
  },
];
