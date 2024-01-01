import axios from "axios";
import React, { useEffect, useState } from "react";
import { STUDENT_API } from "../../utils/api";
import { IoSearch } from "react-icons/io5";
import {
  MdModeEdit,
  MdOutlineKeyboardBackspace,
  MdPersonAddAlt1,
  MdTableChart,
} from "react-icons/md";
import { Button } from "react-daisyui";
import MyTable from "../../component/MyTable";
import LoadingPage from "../../component/LoadingPage";
import MyForm from "../../component/MyForm";
import toast from "react-hot-toast";
import { toastValidationError } from "../../utils/errorHandling";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import YesNoModal from "../../component/YesNoModal";
import HTTP_STATUS from "../../constant/httpStatus";
import { FaRotate } from "react-icons/fa6";
import { displayDateTimeFormat } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import { TbPhotoFilled } from "react-icons/tb";

function StudentList() {
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [onCreateOrEdit, setOnCreateOrEdit] = useState(true); // true - create, false - edit
  const [yesNoModalShow, setYesNoModalShow] = useState(false);
  const [yesNoModalForward, setYesNoModalForward] = useState(null);
  const [isCardView, setIsCardView] = useState(true);

  const [studentList, setStudentList] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [parentName, setParentName] = useState("");
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const columns = [
    { field: "no.", text: "No." },
    { field: "name", text: "Name" },
    { field: "age", text: "Age" },
    { field: "gender", text: "Gender" },
    { field: "contactNo", text: "Contact No." },
    { field: "email", text: "Email" },
    { field: "parentName", text: "Parent Name" },
    { field: "address", text: "Address" },
    { field: "createdDate", text: "Student Created Date" },
    { field: "lastModifiedDate", text: "Last Modified Date" },
    { field: "action", text: "Action" },
  ];

  const genderSelection = [
    {
      text: "Male",
      value: "male",
    },
    {
      text: "Female",
      value: "female",
    },
  ];
  const formFields = [
    {
      size: "6",
      name: "Name",
      type: "text",
      required: true,
      value: name,
      onChange: (e) => {
        setName(e.target.value);
      },
    },
    {
      size: "6",
      name: "Age",
      type: "number",
      required: true,
      value: age,
      onChange: (e) => {
        setAge(e.target.value);
      },
    },
    {
      size: "6",
      name: "Contact No.",
      type: "text",
      required: true,
      value: contactNo,
      onChange: (e) => {
        setContactNo(e.target.value);
      },
    },
    {
      size: "6",
      name: "Email",
      type: "text",
      required: true,
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
      },
    },
    {
      size: "6",
      name: "Gender",
      type: "select",
      required: true,
      value: gender,
      options: genderSelection,
      onChange: (e) => {
        let value = Array.from(
          e.target.selectedOptions,
          (option) => option.value
        );
        setGender(value[0]);
      },
    },
    {
      size: "6",
      name: "Parent Name",
      type: "text",
      required: true,
      value: parentName,
      onChange: (e) => {
        setParentName(e.target.value);
      },
    },
    {
      size: "12",
      name: "Address",
      type: "textarea",
      required: true,
      value: address,
      onChange: (e) => {
        setAddress(e.target.value);
      },
    },
  ];

  useEffect(() => {
    getStudentList();
  }, []);

  async function getStudentList() {
    const res = await axios.get(STUDENT_API);
    const data = res.data;

    for (let i = 0; i < data.length; i++) {
      data[i].createdDate = displayDateTimeFormat(data[i].createdDate);

      data[i].lastModifiedDate = displayDateTimeFormat(
        data[i].lastModifiedDate
      );

      data[i].action = (
        <div className={`flex items-center`}>
          <div
            title="Edit"
            className={`text-blue-500 mr-1 cursor-pointer hover:bg-blue-200 rounded-full p-2 duration-200`}
            onClick={(e) => {
              e.preventDefault();
              onEdit(data[i]);
            }}
          >
            <MdModeEdit size={20} />
          </div>

          <div
            title="Delete"
            className={`text-error cursor-pointer hover:bg-red-200 rounded-full p-2 duration-200`}
            onClick={(e) => {
              e.preventDefault();
              onDelete(data[i].id);
            }}
          >
            <MdDelete size={21} />
          </div>
        </div>
      );

      // can ignore
      data[i].cardViewAction = (
        <div className={`flex items-center w-[55%] justify-between`}>
          <div
            title="Edit"
            className={`text-blue-500 mr-1 cursor-pointer hover:bg-blue-200 rounded-full duration-200 bg-blue-100 p-3 hover:scale-105`}
            onClick={(e) => {
              e.preventDefault();
              onEdit(data[i]);
            }}
          >
            <MdModeEdit size={25} />
          </div>

          <div
            title="Delete"
            className={`text-error cursor-pointer hover:bg-red-200 rounded-full bg-red-100 p-3 hover:scale-105 duration-200"
            }`}
            onClick={(e) => {
              e.preventDefault();
              onDelete(data[i].id);
            }}
          >
            <MdDelete size={26} />
          </div>
        </div>
      );
    }

    setStudentList(data);
    setReady(true);
  }

  async function submitCreate() {
    const data = {
      name: name,
      age: age,
      contactNo: contactNo,
      email: email,
      gender: gender,
      parentName: parentName,
      address: address,
    };

    try {
      const res = await axios.post(STUDENT_API, data);

      if (res.status === HTTP_STATUS.CREATED) {
        setModalOpen(false);
        setReady(false);

        getStudentList();
        reset();
        toast.success("Created new student successfully!");
      }
    } catch (e) {
      toast.error("Error in creating student. Please try again.");
      toastValidationError(e.response.data);
    }
  }

  function onEdit(data) {
    setOnCreateOrEdit(false);
    setModalOpen(true);
    setId(data.id);

    if ("name" in data) {
      setName(data.name);
    }

    if ("age" in data) {
      setAge(data.age);
    }

    if ("gender" in data) {
      setGender(data.gender);
    }

    if ("contactNo" in data) {
      setContactNo(data.contactNo);
    }

    if ("email" in data) {
      setEmail(data.email);
    }

    if ("parentName" in data) {
      setParentName(data.parentName);
    }

    if ("address" in data) {
      setAddress(data.address);
    }
  }

  async function submitUpdate() {
    const data = {
      id: id,
      name: name,
      age: age,
      contactNo: contactNo,
      email: email,
      gender: gender,
      parentName: parentName,
      address: address,
    };

    try {
      const res = await axios.put(STUDENT_API, data);

      if (res.status === HTTP_STATUS.OK) {
        setModalOpen(false);
        setReady(false);

        getStudentList();
        reset();
        toast.success("Updated student successfully!");
      }
    } catch (e) {
      toast.error("Error in updating student info. Please try again.");
      toastValidationError(e.response.data);
    }
  }

  function onDelete(id) {
    setYesNoModalShow(true);
    setYesNoModalForward({
      show: true,
      text: "Are you sure you want to delete this student?",
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
      const res = await axios.delete(STUDENT_API + "/" + id);

      if (res.status === HTTP_STATUS.OK) {
        setReady(false);
        getStudentList();

        toast.success("Deleted student successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error in deleting student.");
    }
  }

  async function onSearch() {
    setReady(false);

    if (search !== "") {
      try {
        const res = await axios.get(STUDENT_API + "/search/" + search);
        const data = res.data;

        if (res.status === HTTP_STATUS.OK) {
          for (let i = 0; i < data.length; i++) {
            data[i].createdDate = displayDateTimeFormat(data[i].createdDate);

            data[i].lastModifiedDate = displayDateTimeFormat(
              data[i].lastModifiedDate
            );

            data[i].action = (
              <div className={`flex items-center`}>
                <div
                  title="Edit"
                  className={`text-blue-500 mr-1 cursor-pointer hover:bg-blue-200 rounded-full p-2 duration-200`}
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit(data[i]);
                  }}
                >
                  <MdModeEdit size={20} />
                </div>

                <div
                  title="Delete"
                  className={`text-error cursor-pointer hover:bg-red-200 rounded-full p-2 duration-200`}
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(data[i].id);
                  }}
                >
                  <MdDelete size={21} />
                </div>
              </div>
            );

            // can ignore
            data[i].cardViewAction = (
              <div className={`flex items-center w-[55%] justify-between`}>
                <div
                  title="Edit"
                  className={`text-blue-500 mr-1 cursor-pointer hover:bg-blue-200 rounded-full duration-200 bg-blue-100 p-3 hover:scale-105`}
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit(data[i]);
                  }}
                >
                  <MdModeEdit size={25} />
                </div>

                <div
                  title="Delete"
                  className={`text-error cursor-pointer hover:bg-red-200 rounded-full bg-red-100 p-3 hover:scale-105 duration-200"
            }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(data[i].id);
                  }}
                >
                  <MdDelete size={26} />
                </div>
              </div>
            );
          }

          setStudentList(data);
          setReady(true);
        }
      } catch (e) {
        toast.error("Error in searching students. Please try again");
      }
    } else {
      getStudentList();
    }
  }

  function reset() {
    setName("");
    setAge(0);
    setContactNo("");
    setEmail("");
    setGender("male");
    setParentName("");
    setAddress("");
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
          <div className="font-semibold text-2xl">All Students</div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <form onSubmit={() => onSearch()}>
              <input
                type="text"
                placeholder="Search student..."
                className="py-2 px-5 rounded-lg opacity-80 w-[500px] mr-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <IoSearch
              size={40}
              title="Search"
              className="text-white rounded-full p-2 hover:bg-gray-300 cursor-pointer"
              onClick={() => onSearch()}
            />

            <FaRotate
              size={35}
              title="Reset"
              className="text-white rounded-full p-2 hover:bg-gray-300 cursor-pointer"
              onClick={() => {
                setSearch("");
                setReady(false);
                getStudentList();
              }}
            />

            {/* Can ignore */}
            <label
              className="swap hover:bg-gray-300 p-2 rounded-full"
              title="Swap table view"
            >
              <input
                type="checkbox"
                value={isCardView}
                onChange={() => setIsCardView(!isCardView)}
              />

              <TbPhotoFilled
                size={25}
                className="swap-off text-white rounded-full cursor-pointer"
              />
              <MdTableChart
                size={25}
                className="swap-on text-white cursor-pointer"
              />
            </label>
          </div>

          <div>
            <Button
              className="capitalize h-10  text-base"
              size="sm"
              color="primary"
              onClick={() => {
                setModalOpen(true);
                setOnCreateOrEdit(true);
              }}
            >
              <MdPersonAddAlt1 size={20} className="mr-1" />
              Create Student
            </Button>
          </div>
        </div>

        <div className="mt-10 px-5">
          <MyTable
            cardView={isCardView}
            columns={columns}
            data={studentList}
            recordType="student"
          />
        </div>

        <MyForm
          gridCols={"12"}
          modalOpen={modalOpen}
          formFields={formFields}
          onClose={() => {
            reset();
            setModalOpen(false);
          }}
          title={onCreateOrEdit ? "Create Student" : "Edit Student"}
          action={onCreateOrEdit ? () => submitCreate() : () => submitUpdate()}
        />

        <YesNoModal show={yesNoModalShow} forward={yesNoModalForward} />
      </div>
    );
  } else {
    return <LoadingPage />;
  }
}

export default StudentList;
