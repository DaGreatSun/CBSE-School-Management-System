import { PiStudentFill } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";

export const items = [
  {
    name: "Class",
    icon: <PiStudentFill size={60} className="m-auto" />,
    path: "/attendance/class",
  },
  {
    name: "Staff",
    icon: <GrUserWorker size={60} className="m-auto" />,
    path: "/attendance/staff",
  },
];
