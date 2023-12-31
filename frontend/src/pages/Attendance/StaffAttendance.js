import axios from "axios";
import React, { useEffect, useState } from "react";
import { STAFF_ATTENDANCE_API } from "../../utils/api";
import SimpleForm from "../../component/SimpleForm";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { FaMagnifyingGlass, FaRotate } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button, Card, Loading, Table } from "react-daisyui";
import toast from "react-hot-toast";

// Image Imports
import MyTable from "../../component/MyTable";
import HTTP_STATUS from "../../constant/httpStatus";
import YesNoModal from "../../component/YesNoModal";
import { displayDateTimeFormat } from "../../utils/util";

function StaffAttendance() {
  /***************************************************************************************/
  //States
  /***************************************************************************************/
  const [yesNoModalShow, setYesNoModalShow] = useState(false);
  const [yesNoModalForward, setYesNoModalForward] = useState(null);
  const [ready, setReady] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState(todaysDate());

  const [staffAttendanceList, setStaffAttendanceList] = useState([]);
  const [pending, setPending] = useState(false);

  /***************************************************************************************/
  //Var
  /***************************************************************************************/
  const navigate = useNavigate();
  const columns = [
    { field: "no.", text: "No." },
    { field: "name", text: "Name" },
    { field: "contactNo", text: "Contact No." },
    { field: "email", text: "Email" },
    { field: "dateTime", text: "Attendance Time" },
    { field: "presentStatus", text: "Present" },
    { field: "action", text: "Action" },
  ];

  /***************************************************************************************/
  //Callbacks
  /***************************************************************************************/
  function todaysDate() {
    var date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function onChangeForm(e) {
    if (e.target.id === "keyword") setKeyword(e.target.value);
    if (e.target.id === "date") {
      var inputDate = e.target.value;

      // format yyyy-MM-dd
      if (inputDate > todaysDate()) {
        toast.error("Please Select a valid Date");
      } else {
        setDate(e.target.value);
      }
    }
  }

  async function getAttendance() {
    const res = await axios.get(
      `${STAFF_ATTENDANCE_API}/search/${date}${
        keyword && keyword !== "" ? `/${keyword}` : ""
      }`
    );
    const data = res.data;

    for (let i = 0; i < data.length; i++) {
      data[i].name = <div className="font-bold">{data[i].staff.name}</div>;

      data[i].contactNo = data[i].staff.contactNo;

      data[i].email = data[i].staff.email;

      data[i].dateTime = data[i].createdDate
        ? displayDateTimeFormat(data[i].createdDate)
        : "-";

      data[i].presentStatus = data[i].present ? (
        <div className="font-semibold flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <div>Present</div>
        </div>
      ) : (
        <div className="font-semibold flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div>Absent</div>
        </div>
      );

      data[i].action = data[i].present ? (
        <Button
          title="Mark as absent"
          size="xs"
          color="success"
          className="text-white cursor-pointer p-2 duration-200 h-9  rounded-full"
          onClick={(e) => {
            e.preventDefault();
            deleteStaffAttendance(data[i].staff.id);
          }}
        >
          <GiCheckMark size={18} />
        </Button>
      ) : (
        <Button
          title="Mark as present"
          size="xs"
          className="text-green-400 bg-white cursor-pointer p-2 duration-200 h-9  rounded-full"
          onClick={(e) => {
            e.preventDefault();
            addStaffAttendance(data[i].staff.id);
          }}
        >
          <GiCheckMark size={18} />
        </Button>
      );
    }
    setStaffAttendanceList(data);

    setReady(true);
  }

  function renderAttendanceForm() {
    if (date > todaysDate())
      return (
        <div className="flex flex-col items-center justify-center my-auto">
          <span className="text-2xl font-semibold">
            Select a Valid Date to continue...
          </span>
        </div>
      );

    return (
      <div className="grid grid-cols-1 gap-5">
        <div className="col-span-1">{renderStaffAttendance()}</div>
      </div>
    );
  }

  // YAN SHIUH HERE
  function renderStaffAttendance() {
    return (
      <Card className="bg-gray-200 mb-5">
        <Card.Title className="flex justify-center text-2xl py-2 border-b-2 border-gray-300">
          Staff
        </Card.Title>
        <Card.Body className="p-4">
          {staffAttendanceList.length > 0 ? (
            <MyTable columns={columns} data={staffAttendanceList} />
          ) : (
            <div className="font-semibold mx-auto">No staff found</div>
          )}
        </Card.Body>
      </Card>
    );
  }

  function addStaffAttendance(staffId) {
    setYesNoModalShow(true);
    setYesNoModalForward({
      show: true,
      text: `Are you sure to mark this staff as present on ${date}?`,
      cb: (ret) => {
        if (ret === true) {
          toCreate(staffId);
        }
        setYesNoModalShow(false);
      },
    });
  }

  async function toCreate(staffId) {
    if (pending) return;
    try {
      setPending(true);
      const res = await axios.post(
        STAFF_ATTENDANCE_API + "/add/" + staffId + "/" + date
      );
      setPending(false);

      if (res.status === HTTP_STATUS.OK) {
        setReady(false);
        getAttendance();
        toast.success("Update staff attendance successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error in updating staff attendance. Please try again.");
    }
  }

  function deleteStaffAttendance(staffId) {
    setYesNoModalShow(true);
    setYesNoModalForward({
      show: true,
      text: `Are you sure to mark this staff as absent on ${date}?`,
      cb: (ret) => {
        if (ret === true) {
          toDelete(staffId);
        }
        setYesNoModalShow(false);
      },
    });
  }

  async function toDelete(staffId) {
    if (pending) return;
    try {
      setPending(true);
      const res = await axios.delete(
        STAFF_ATTENDANCE_API + "/" + staffId + "/" + date
      );
      setPending(false);

      if (res.status === HTTP_STATUS.OK) {
        setReady(false);
        getAttendance();

        toast.success("Update staff attendance successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error in deleting staff attendance");
    }
  }

  useEffect(() => {
    getAttendance();
  }, []);

  /***************************************************************************************/
  //Page
  /***************************************************************************************/
  return (
    <div className="w-full h-full p-10 py-7">
      <div className="mb-5 flex items-center">
        <MdOutlineKeyboardBackspace
          size={27}
          className="mr-4 mt-1 hover:scale-105 duration-200 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="font-semibold text-2xl">Staff Attendance</div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <form className="w-full grid grid-cols-2 gap-2 mr-1 opacity-80">
          <SimpleForm
            id={"keyword"}
            placeholder="Filter"
            size={1}
            type="text"
            value={keyword}
            onChange={onChangeForm}
          />
          <SimpleForm
            id={"date"}
            min={"1-1-2023"}
            max={"24-1-2023"}
            size={1}
            type="date"
            value={date}
            onChange={onChangeForm}
          />
        </form>

        <FaMagnifyingGlass
          size={40}
          title="Reset"
          className="text-white rounded-full p-2 hover:bg-gray-300 cursor-pointer"
          onClick={() => {
            setReady(false);
            getAttendance();
          }}
        />
        <FaRotate
          size={40}
          title="Reset"
          className="text-white rounded-full p-2 hover:bg-gray-300 cursor-pointer"
          onClick={() => {
            setReady(false);
            getAttendance();
          }}
        />
      </div>

      {ready ? (
        renderAttendanceForm()
      ) : (
        <div className="flex flex-col items-center justify-center my-auto mt-40">
          <Loading variant="spinner" className="mb-5 w-20 h-20" />
          <span className="text-2xl font-semibold">Loading contents...</span>
        </div>
      )}

      <YesNoModal show={yesNoModalShow} forward={yesNoModalForward} />
    </div>
  );
}

export default StaffAttendance;
