import axios from "axios";
import React, { useEffect, useState } from "react";
import { STUDENT_FEES_API, CLASS_API } from "../../utils/api";
import { IoSearch } from "react-icons/io5";
import {
  MdDelete,
  MdModeEdit,
  MdOutlineKeyboardBackspace,
  MdPersonAddAlt1,
  MdTableChart,
} from "react-icons/md";
import { Button, Card } from "react-daisyui";
import MyTable from "../../component/MyTable";
import LoadingPage from "../../component/LoadingPage";
import SimpleForm from "../../component/SimpleForm";
import toast from "react-hot-toast";
import { toastValidationError } from "../../utils/errorHandling";
import YesNoModal from "../../component/YesNoModal";
import HTTP_STATUS from "../../constant/httpStatus";
import { FaMoneyCheckDollar, FaRotate } from "react-icons/fa6";
import { displayDateTimeFormat } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import MyForm from "../../component/MyForm";
import moment from "moment";

function ListStudentFees() {
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [yesNoModalShow, setYesNoModalShow] = useState(false);
  const [yesNoModalForward, setYesNoModalForward] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [fee, setFee] = useState(0);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState({});
  const [classSearch, setClassSearch] = useState(null);
  const [classes, setClasses] = useState([]);
  const [studentFees, setStudentFees] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const monthOptions = [
    { text: "January", value: "January" },
    { text: "February", value: "February" },
    { text: "March", value: "March" },
    { text: "April", value: "April" },
    { text: "May", value: "May" },
    { text: "June", value: "June" },
    { text: "July", value: "July" },
    { text: "August", value: "August" },
    { text: "September", value: "September" },
    { text: "October", value: "October" },
    { text: "November", value: "November" },
    { text: "December", value: "December" },
  ];
  const columns = [
    { field: "no.", text: "No." },
    { field: "name", text: "Student Name" },
    { field: "action", text: "Action" },
  ];
  const columns2 = [
    { field: "no.", text: "No." },
    { field: "paidDate", text: "Previous Payment Date" },
    { field: "action", text: "Action" },
  ];

  const yearOptions = [
    { text: "", value: "" },
    { text: 2023, value: 2023 },
    { text: 2024, value: 2024 },
    { text: 2025, value: 2025 },
    { text: 2026, value: 2026 },
    { text: 2027, value: 2027 },
  ];
  const form = [
    {
      size: 6,
      name: "Name",
      type: "text",
      required: true,
      disabled: true,
      value: name,
      onChange: (e) => {
        setName(e.target.value);
      },
    },
    {
      size: 6,
      name: "Class Fee",
      type: "number",
      required: true,
      disabled: true,
      value: fee,
      onChange: (e) => setFee(e.target.value),
    },
    {
      size: 6,
      name: "Payment Month",
      type: "select",
      required: true,
      value: month,
      options: monthOptions,
      onChange: (e) => {
        setMonth(e.target.value);
      },
    },
    {
      size: 6,
      name: "Payment Year",
      type: "select",
      required: true,
      value: year,
      options: yearOptions,
      onChange: (e) => {
        setYear(e.target.value);
      },
    },
  ];

  useEffect(() => {
    getClassOptions();
  }, []);

  async function getStudentFees(classId) {
    if (classId !== "") {
      try {
        const res = await axios.get(CLASS_API + "/" + classId);
        let classData = res.data;
        setData(classData);
        var data_ = res.data.studentList;

        if (res.status === HTTP_STATUS.OK) {
          for (let i = 0; i < data_.length; i++) {
            data_[i].date = displayDateTimeFormat(data_[i].date);

            data_[i].action = (
              <div className="flex items-center">
                <Button
                  size="sm"
                  className="mr-3 h-10 rounded-full text-lg text-gray-200 bg-emerald-500 border-emerald-500"
                  onClick={(e) => {
                    e.preventDefault();
                    doPayment(data_[i], classData);
                  }}
                >
                  <FaMoneyCheckDollar size={16} />
                </Button>
              </div>
            );
          }
          setStudentFees(data_);
        }
      } catch (e) {
        console.error("Error fetching class data:", e);
        toast.error("Error in searching students. Please try again");
      }
    } else {
      toast("Please select a class to proceed!");
    }
  }

  async function getFeeHistory(studentId) {
    if (studentId !== "") {
      try {
        const res = await axios.get(STUDENT_FEES_API + "/history/" + studentId);
        let historyData = res.data;

        if (res.status === HTTP_STATUS.OK) {
          for (let i = 0; i < historyData.length; i++) {
            historyData[i].date = displayDateTimeFormat(historyData[i].date);

            historyData[i].action = (
              <div className="flex items-center">
                <Button
                  size="sm"
                  className="mr-3 h-10 rounded-full text-lg text-gray-200 bg-emerald-500 border-emerald-500"
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(historyData[i].id);
                  }}
                >
                  <MdDelete size={16} />
                </Button>
              </div>
            );
          }
        }
      } catch (e) {
        console.error("Error fetching class data:", e);
        toast.error("Error in searching students. Please try again");
      }
    } else {
      toast("Please select a class to proceed!");
    }
  }

  function onDelete(id) {
    setYesNoModalShow(true);
    setYesNoModalForward({
      show: true,
      text: "Are you sure you want to delete this history?",
      cb: (ret) => {
        if (ret === true) {
          toDelete(id);
        }
        setYesNoModalShow(false);
      },
    });
  }

  async function toDelete(id) {
    try {
      const res = await axios.delete(STUDENT_FEES_API + "/" + id);

      if (res.status === HTTP_STATUS.OK) {
        setReady(false);
        getStudentFees(classSearch);

        toast.success("Deleted Student Fee Record successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error in Deleting Student Fee Record.");
    }
  }

  async function getClassOptions() {
    const res = await axios.get(CLASS_API);
    const data_ = res.data;
    let options = [{ text: "Select a Class to Proceed...", value: "" }];
    for (let i = 0; i < data_.length; i++) {
      options.push({ text: data_[i].name, value: data_[i].id });
    }
    setClasses(options);
    setReady(true);
  }

  async function submitCreate() {
    const data = {
      fee: fee,
      paidMonth: month,
      paidYear: year,
    };

    if (!month || month === "") {
      toast.error("Input month of payment before submitting");
      return;
    }

    try {
      const res = await axios.post(
        STUDENT_FEES_API + "/" + classSearch + "/" + id,
        data
      );

      if (res.status === HTTP_STATUS.CREATED) {
        setModalOpen(false);
        reset();
        getStudentFees(classSearch);
        setMonth(getCurrentMonth());
        toast.success("Payment has been made successfully!");
      }
    } catch (e) {
      toast.error("Error in making payment. Please try again.");
      toastValidationError(e.response.data);
    }
  }

  function getCurrentMonth() {
    return monthOptions[new Date().getMonth()].value;
  }

  function doPayment(data_, classData) {
    setModalOpen(true);
    setId(data_.id);
    getFeeHistory(data_.id);
    var date = new Date();
    setYear(date.getFullYear());
    setMonth(getCurrentMonth());

    if ("fee" in classData) {
      setFee(classData.fee);
    }
    if ("name" in data_) {
      setName(data_.name);
    }
  }

  async function onSearch() {
    // setReady(false);
    // if (search !== "") {
    //   try {
    //     const res = await axios.get(STUDENT_API + "/search/" + search);
    //     const data = res.data;
    //     if (res.status === HTTP_STATUS.OK) {
    //       for (let i = 0; i < data.length; i++) {
    //         data[i].createdDate = displayDateTimeFormat(data[i].createdDate);
    //         data[i].lastModifiedDate = displayDateTimeFormat(
    //           data[i].lastModifiedDate
    //         );
    //         data[i].action = (
    //           <div className="flex items-center">
    //             <Button
    //               size="sm"
    //               className="mr-3 h-10 rounded-full text-lg text-gray-200 bg-blue-500 border-blue-500"
    //               onClick={(e) => {
    //                 e.preventDefault();
    //                 onEdit(data[i]);
    //               }}
    //             >
    //               <FiEdit size={16} />
    //             </Button>
    //             <Button
    //               color="error"
    //               size="sm"
    //               className="h-10 rounded-full text-xl text-gray-200"
    //               onClick={(e) => {
    //                 e.preventDefault();
    //                 onDelete(data[i].id);
    //               }}
    //             >
    //               <MdDelete size={16} />
    //             </Button>
    //           </div>
    //         );
    //
    //       }
    //       setStudentList(data);
    //       setReady(true);
    //     }
    //   } catch (e) {
    //     toast.error("Error in searching students. Please try again");
    //   }
    // } else {
    //   getStudentList();
    // }
  }

  function reset() {
    setName("");
    setMonth(getCurrentMonth());
    setFee(0);
  }

  function renderNotice() {
    if (classSearch && classSearch !== null && classSearch !== "") {
      return (
        <div className="card w-96 bg-base-100 shadow-xl items-center text-center">
          <div className="card-title p-10">
            There are no students in this class.
          </div>
        </div>
      );
    } else {
      return (
        <div className="card w-96 bg-base-100 shadow-xl items-center text-center">
          <div className="card-title p-10">
            Please Select a Class to Proceed...
          </div>
        </div>
      );
    }
  }

  if (ready) {
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
          <div className="font-semibold text-2xl">Payments</div>
        </div>

        <div className="flex items-center justify-between mb-5 ml-2 ">
          <div className="w-full grid grid-cols-2 gap-2">
            <SimpleForm
              size={1}
              type={"select"}
              className="opacity-80"
              placeholder={"Select a Class to Proceed"}
              value={classSearch}
              options={classes}
              onChange={(e) => {
                setClassSearch(e.target.value);
                getStudentFees(e.target.value);
              }}
            />
            <SimpleForm
              type="text"
              placeholder="Search student..."
              className="opacity-80"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <IoSearch
              size={40}
              title="Search"
              className="text-white rounded-full p-2 hover:bg-gray-300 cursor-pointer"
              onClick={() => onSearch()}
            />
          </div>
        </div>
        <div className="flex justify-center">
          {studentFees.length === 0 ? (
            <>{renderNotice()}</>
          ) : (
            <>
              <div className="mt-10 px-5 w-full">
                <MyTable columns={columns} data={studentFees} />
              </div>
            </>
          )}
        </div>
        <MyForm
          gridCols={"12"}
          modalOpen={modalOpen}
          formFields={form}
          onClose={() => {
            reset();
            setModalOpen(false);
          }}
          title={"Make Payment"}
          action={submitCreate}
        />

        <YesNoModal show={yesNoModalShow} forward={yesNoModalForward} />
      </div>
    );
  } else {
    return <LoadingPage />;
  }
}

export default ListStudentFees;
