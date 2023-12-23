import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ATTENDANCE_TEACHER,
  ATTENDANCE_STUDENT,
  CLASS_API,
} from "../../utils/api";
import SimpleForm from "../../component/SimpleForm";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import LoadingPage from "../../component/LoadingPage";
import { FaRotate } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button, Card, Loading } from "react-daisyui";
import toast from "react-hot-toast";

// Image Imports
import image_teacherMale from "../../images/teacher_male.jpg";
import image_teacherFemale from "../../images/teacher_female.jpg";

function StudentList() {
  /***************************************************************************************/
  //States
  /***************************************************************************************/
  const [ready, setReady] = useState(false);
  const [classList, setClassList] = useState([]);
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState(todaysDate());

  /***************************************************************************************/
  //Var
  /***************************************************************************************/
  const navigate = useNavigate();

  /***************************************************************************************/
  //Callbacks
  /***************************************************************************************/
  function todaysDate() {
    var date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  async function getClassList() {
    var res = await axios.get(CLASS_API);
    var data = res.data;
    var options = [{ text: "Select a Class", value: "" }];

    for (let i = 0; i < data.length; i++) {
      options.push({
        text: `${data[i].code ?? ""} - ${data[i].name ?? ""}`,
        value: data[i].id,
      });
    }

    setClassList(options);
    setReady(true);
  }

  function onChangeForm(e) {
    if (e.target.id === "classId") setClassId(e.target.value);
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
    console.log("Called");
  }

  function renderAttendanceForm() {
    if (classId === "" || date > todaysDate())
      return (
        <div className="flex flex-col items-center justify-center my-auto">
          <span className="text-2xl font-semibold">
            Select Class and Date to continue...
          </span>
        </div>
      );

    return (
      <div className="grid grid-cols-1 gap-5">
        <div className="col-span-1">{renderTeacherAttendance()}</div>
        <div className="col-span-1">{renderStudentAttendance()}</div>
      </div>
    );
  }

  const getImagePath = (gender) => {
    let imagePath = "";
    imagePath = gender === "male" ? image_teacherMale : image_teacherFemale;
    return imagePath;
  };

  function renderTeacherAttendance() {
    return (
      <Card className="bg-white bg-opacity-80">
        <Card.Title className="flex justify-center text-2xl py-2 border-b-2 border-gray-300">
          Teacher
        </Card.Title>
        <Card.Body className="p-4">
          <div className="flex gap-4">
            <img
              src={getImagePath("male")}
              alt="Profile"
              className={`h-52 bg-red-300 object-cover rounded-lg ${
                "male" === "male" ? "object-right-top" : ""
              }`}
            />
            <div className="w-full relative">
              <div className="flex">Teacher Details</div>
              <Button className="w-full absolute bottom-0" color="success">
                Present
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // YAN SHIUH HERE
  function renderStudentAttendance() {
    return (
      <Card className="bg-white bg-opacity-80">
        <Card.Title className="flex justify-center text-2xl py-2 border-b-2 border-gray-300">
          Students
        </Card.Title>
        <Card.Body className="p-4">
          Maybe just do a list here or something bah
        </Card.Body>
      </Card>
    );
  }

  useEffect(() => {
    getClassList();
    todaysDate();
  }, []);

  useEffect(() => {
    getAttendance();
  }, [classId, date]);

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
        <div className="font-semibold text-2xl">Class Attendance</div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <form
          className="w-full grid grid-cols-2 gap-2 mr-1 opacity-80"
          onSubmit={onChangeForm}
        >
          <SimpleForm
            id={"classId"}
            size={1}
            type="select"
            value={classId}
            options={classList}
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

        <FaRotate
          size={40}
          title="Reset"
          className="text-white rounded-full p-2 hover:bg-gray-300 cursor-pointer"
          onClick={() => {
            setReady(false);
            getClassList();
          }}
        />
      </div>

      {ready ? (
        renderAttendanceForm()
      ) : (
        <div className="flex flex-col items-center justify-center my-auto">
          <Loading variant="spinner" className="mb-5 w-20 h-20" />
          <span className="text-2xl font-semibold">Loading contents...</span>
        </div>
      )}
    </div>
  );
}

export default StudentList;
