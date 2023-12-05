import { TiHome } from "react-icons/ti";
import { PiStudentFill } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { RiMoneyDollarCircleFill, RiLogoutBoxRLine } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsPersonFillLock } from "react-icons/bs";

const style = "mr-3";

export const routes = [
  {
    collapse: false,
    name: "Dashboard",
    path: "/",
    icon: <TiHome size={25} className={style} />,
  },
  {
    collapse: true,
    name: "Student Section",
    icon: <PiStudentFill size={25} className={style} />,
    paths: [
      {
        name: "Student List",
        path: "/student-list",
        icon: <IoIosPeople size={25} className={style} />,
      },
      {
        name: "Student Fees",
        path: "/student-fee",
        icon: <RiMoneyDollarCircleFill size={25} className={style} />,
      },
      {
        name: "Student Attendance",
        path: "/student-attendance",
        icon: <FaFileSignature size={25} className={style} />,
      },
    ],
  },
  {
    collapse: true,
    name: "Teacher Section",
    icon: <FaChalkboardTeacher size={25} className={style} />,
    paths: [
      {
        name: "Teacher List",
        path: "/teacher_list",
        icon: <IoIosPeople size={25} className={style} />,
      },
      {
        name: "Teacher Salary",
        path: "/teacher_salary",
        icon: <RiMoneyDollarCircleFill size={25} className={style} />,
      },
      {
        name: "Teacher Attendance",
        path: "/teacher_attendance",
        icon: <FaFileSignature size={25} className={style} />,
      },
    ],
  },
  {
    collapse: true,
    name: "Non-Teaching Staff Section",
    icon: <BsPersonFillLock size={25} className={style} />,
    paths: [
      {
        name: "Staff List",
        path: "/staff_list",
        icon: <IoIosPeople size={25} className={style} />,
      },
      {
        name: "Salary",
        path: "/non-teaching_staff_salary",
        icon: <RiMoneyDollarCircleFill size={25} className={style} />,
      },
      {
        name: "Attendance",
        path: "/non-teaching_staff_attendance",
        icon: <FaFileSignature size={25} className={style} />,
      },
    ],
  },
  {
    collapse: false,
    name: "Log Out",
    path: "/login",
    icon: <RiLogoutBoxRLine size={25} className={style} />,
  },
];
