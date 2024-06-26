import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CLASS_API,
  TEACHER_ATTENDANCE_API,
  STUDENT_ATTENDANCE_API,
} from "../../utils/api";
import SimpleForm from "../../component/SimpleForm";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { FaRotate } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button, Card, Loading, Table } from "react-daisyui";
import toast from "react-hot-toast";
import { todaysDate } from "../../utils/util";

// Image Imports
import image_teacherMale from "../../images/teacher_male.jpg";
import image_teacherFemale from "../../images/teacher_female.jpg";
import MyTable from "../../component/MyTable";
import HTTP_STATUS from "../../constant/httpStatus";
import YesNoModal from "../../component/YesNoModal";
import { displayDateTimeFormat } from "../../utils/util";

function ClassAttendance() {
  /***************************************************************************************/
  //States
  /***************************************************************************************/
  const [yesNoModalShow, setYesNoModalShow] = useState(false);
  const [yesNoModalForward, setYesNoModalForward] = useState(null);
  const [ready, setReady] = useState(false);
  const [classList, setClassList] = useState([]);
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState(todaysDate());
  const [pending, setPending] = useState(false);

  const [studentAttendanceList, setStudentAttendanceList] = useState([]);
  const [data, setData] = useState({});
  const [teacher, setTeacher] = useState({});

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
    const res = await axios.get(
      STUDENT_ATTENDANCE_API + "/" + classId + "/" + date
    );
    const data = res.data;

    for (let i = 0; i < data.length; i++) {
      data[i].name = <div className="font-bold">{data[i].student.name}</div>;

      data[i].contactNo = data[i].student.contactNo;

      data[i].email = data[i].student.email;

      data[i].dateTime =
        data[i].attendanceTime !== null
          ? displayDateTimeFormat(data[i].attendanceTime)
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
            deleteStudentAttendance(data[i].student);
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
            createStudentAttendance(data[i].student);
          }}
        >
          <GiCheckMark size={18} />
        </Button>
      );
    }
    setStudentAttendanceList(data);

    setReady(true);
  }

  async function getTeacherAttendance() {
    setTeacher({});
    if (!classId || classId === "" || !date || date > todaysDate()) return;

    var res = await axios.get(`${TEACHER_ATTENDANCE_API}/${classId}/${date}`);
    var data_ = res.data;

    if (data_) {
      setData(data_);
    }
    if (data_ && "teacher" in data_) {
      setTeacher(data_.teacher);
    }
  }

  async function addTeacherAttendance() {
    if (pending) return;
    try {
      setPending(true);
      const res = await axios.post(
        TEACHER_ATTENDANCE_API +
          "/add/" +
          teacher.id +
          "/" +
          classId +
          "/" +
          date
      );
      setPending(false);

      if (res.status === HTTP_STATUS.OK) {
        setReady(false);
        getAttendance();
        getTeacherAttendance();

        toast.success("Recorded teacher's attendance successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error in recording teacher attendance");
    }
  }

  async function removeTeacherAttendance() {
    if (pending) return;
    try {
      setPending(true);
      const res = await axios.post(
        TEACHER_ATTENDANCE_API +
          "/remove/" +
          teacher.id +
          "/" +
          classId +
          "/" +
          date
      );
      setPending(false);

      if (res.status === HTTP_STATUS.OK) {
        setReady(false);
        getAttendance();
        getTeacherAttendance();

        toast.success("Removed teacher's attendance successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error in removing teacher attendance");
    }
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
          {teacher && teacher.name ? (
            <div className="flex gap-4">
              <img
                src={getImagePath(teacher.gender)}
                alt="Profile"
                className={`h-56 bg-red-300 object-cover rounded-lg ${
                  "male" === "male" ? "object-right-top" : ""
                }`}
              />
              <div className="w-full relative">
                <div className="flex">
                  <Table size="xs">
                    {detailRow("Name", teacher.name)}
                    {detailRow("Contact No.", teacher.contactNo)}
                    {detailRow("Gender", teacher.gender)}
                    {detailRow("Position", teacher.position)}
                    {detailRow("Qualification", teacher.qualification)}
                    {detailRow(
                      "Present",
                      data.present ? (
                        <div className="flex items-center">
                          <div>Present</div>
                          <div className="w-3 h-3 bg-green-500 rounded-full ml-2"></div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div>Absent</div>
                          <div className="w-3 h-3 bg-red-500 rounded-full ml-2"></div>
                        </div>
                      )
                    )}
                  </Table>
                </div>
                {data.present ? (
                  <>
                    <Button
                      className="w-full absolute bottom-0 text-white font-bold text-md"
                      color="error"
                      onClick={() => {
                        removeTeacherAttendance();
                      }}
                    >
                      Remove Attendance
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full absolute bottom-0 text-white"
                    color="success"
                    onClick={() => {
                      addTeacherAttendance();
                    }}
                  >
                    Record Attendance
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              No Teacher Assigned to This Class
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }

  function detailRow(title, content) {
    return (
      <Table.Row>
        <span className="max-w-[100px]">{title}</span>
        <span>{content ?? "-"}</span>
      </Table.Row>
    );
  }

  // YAN SHIUH HERE
  function renderStudentAttendance() {
    return (
      <Card className="bg-gray-200 mb-5">
        <Card.Title className="flex justify-center text-2xl py-2 border-b-2 border-gray-300">
          Students
        </Card.Title>
        <Card.Body className="p-4">
          {studentAttendanceList.length > 0 ? (
            <MyTable columns={columns} data={studentAttendanceList} />
          ) : (
            <div className="font-semibold mx-auto">
              No student has been enrolled to this class.
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }

  function createStudentAttendance(student) {
    setYesNoModalShow(true);
    setYesNoModalForward({
      show: true,
      text: `Are you sure to mark this student as present on ${date}?`,
      cb: (ret) => {
        if (ret === true) {
          toCreate(student);
        }
        setYesNoModalShow(false);
      },
    });
  }

  async function toCreate(student) {
    console.log(pending);
    if (pending) return;
    const sa = {
      present: true,
      student: student,
      attendanceTime: new Date().getTime(),
    };

    try {
      setPending(true);
      const res = await axios.post(
        STUDENT_ATTENDANCE_API + "/" + classId + "/" + date,
        sa
      );
      setPending(false);

      if (res.status === HTTP_STATUS.OK) {
        setReady(false);
        getAttendance();
        toast.success("Update student attendance successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error in updating student info. Please try again.");
    }
  }

  function deleteStudentAttendance(student) {
    setYesNoModalShow(true);
    setYesNoModalForward({
      show: true,
      text: `Are you sure to mark this student as absent on ${date}?`,
      cb: (ret) => {
        if (ret === true) {
          toDelete(student);
        }
        setYesNoModalShow(false);
      },
    });
  }

  async function toDelete(student) {
    if (pending) return;
    try {
      setPending(true);
      const res = await axios.delete(
        STUDENT_ATTENDANCE_API + "/" + classId + "/" + date + "/" + student.id
      );
      setPending(false);

      if (res.status === HTTP_STATUS.OK) {
        setReady(false);
        getAttendance();

        toast.success("Update student attendance successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error in deleting student attendance");
    }
  }

  useEffect(() => {
    getClassList();
    todaysDate();
  }, []);

  useEffect(() => {
    if (classId !== "") {
      setReady(false);
      getAttendance();
      getTeacherAttendance();
    }
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
        <div className="flex flex-col items-center justify-center my-auto mt-40">
          <Loading variant="spinner" className="mb-5 w-20 h-20" />
          <span className="text-2xl font-semibold">Loading contents...</span>
        </div>
      )}

      <YesNoModal show={yesNoModalShow} forward={yesNoModalForward} />
    </div>
  );
}

export default ClassAttendance;
