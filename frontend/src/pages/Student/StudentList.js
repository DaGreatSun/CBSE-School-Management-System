import axios from "axios";
import React, { useEffect, useState } from "react";
import { STUDENT_API } from "../../utils/api";
import { IoSearch } from "react-icons/io5";
import { MdPersonAddAlt1 } from "react-icons/md";
import { Button } from "react-daisyui";
import MyTable from "../../component/MyTable";
import LoadingPage from "../../component/LoadingPage";

function StudentList() {
  const [ready, setReady] = useState(false);
  const [studentList, setStudentList] = useState([]);

  const columns = [
    { field: "no.", text: "No." },
    { field: "name", text: "Name" },
    { field: "age", text: "Age" },
    { field: "contactNo", text: "Contact No." },
    { field: "email", text: "Email" },
    { field: "gender", text: "Gender" },
    { field: "parentName", text: "Parent Name" },
  ];

  useEffect(() => {
    getStudentList();
  }, []);

  async function getStudentList() {
    const res = await axios.get(STUDENT_API);
    const data = res.data;

    setStudentList(data);
    setReady(true);
  }

  if (ready) {
    return (
      <div className="w-full h-full p-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search student..."
              className="py-2 px-5 rounded-lg opacity-80 w-[500px] mr-3"
            />

            <IoSearch
              size={40}
              className="text-white rounded-full p-2 hover:bg-gray-300 cursor-pointer"
            />
          </div>

          <div>
            <Button
              className="capitalize h-10  text-base"
              size="sm"
              color="primary"
            >
              <MdPersonAddAlt1 size={20} className="mr-1" />
              Create Student
            </Button>
          </div>
        </div>

        <div>
          <MyTable columns={columns} data={studentList} />
        </div>
      </div>
    );
  } else {
    return <LoadingPage />;
  }
}

export default StudentList;
