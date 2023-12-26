import React from "react";
import { Table } from "react-daisyui";
import image_boy from "../images/boy.jpeg";
import image_girl from "../images/girl.jpeg";
import image_teacherMale from "../images/teacher_male.jpg";
import image_teacherFemale from "../images/teacher_female.jpg";

function MyTable(props) {
  const getImagePath = (item) => {
    let imagePath = "";
    if (props.recordType === "student") {
      imagePath = item.gender === "male" ? image_boy : image_girl;
    } else if (props.recordType === "teacher") {
      imagePath =
        item.gender === "male" ? image_teacherMale : image_teacherFemale;
    }
    return imagePath;
  };

  if (props.cardView) {
    return (
      <div className="grid grid-cols-5 gap-11 lg:grid-cols-5 3xl:grid-cols-6 relative">
        {props.data.map((item, idx) => (
          <div className="bg-white bg-opacity-90 text-center w-[100%] px-10 h-[100%] py-6 flex flex-col justify-center relative rounded-xl group">
            <img
              src={getImagePath(item)}
              alt="Profile"
              className="w-[105px] h-24 mx-auto bg-red-300 rounded-full"
            />
            <div className="font-semibold mt-5">{item.name}</div>
            <div className="mt-1 text-sm">{item.contactNo}</div>
            <div className="mt-1 text-sm">{item.email}</div>

            <div className="absolute top-0 left-0 bg-gray-100 w-full h-full group-hover:flex items-center justify-center rounded-xl bg-opacity-90 hidden cursor-pointer">
              {item.cardViewAction}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="bg-gray-200 px-5 py-2 rounded-lg bg-opacity-70 font-semibold">
        <Table className="table-sm">
          <Table.Head className="font-bold text-base">
            {props.columns.map((col, idx) => {
              if (col.text === "No.") {
                return <span></span>;
              } else {
                return <span key={idx}>{col.text}</span>;
              }
            })}
          </Table.Head>

          <Table.Body>
            {props.data.map((rowData, idx) => (
              <Table.Row key={idx}>
                {props.columns.map((col, i) => {
                  if (col.text === "No.") {
                    return <span>{idx + 1}</span>;
                  } else {
                    return <span key={i}>{rowData[col.field]}</span>;
                  }
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default MyTable;
