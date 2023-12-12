import React from "react";
import { Table } from "react-daisyui";

function MyTable(props) {
  return (
    <div className="bg-gray-200 px-5 py-2 rounded-lg bg-opacity-70 font-semibold">
      <Table>
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
            <Table.Row key={idx} className="text-base">
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

export default MyTable;
