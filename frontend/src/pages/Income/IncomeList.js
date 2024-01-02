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
import IncomeStatement from "../../component/IncomeStatement";

function ListIncome() {
  const [ready, setReady] = useState(true);
  const [yesNoModalShow, setYesNoModalShow] = useState(false);
  const [yesNoModalForward, setYesNoModalForward] = useState(null);
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [statementData, setStatementData] = useState([]);
  const [search, setSearch] = useState("");
  const [nettIncome, setNettIncome] = useState(0);
  const navigate = useNavigate();
  const columns = [
    { field: "no.", text: "No." },
    { field: "createdDate", text: "Payment Date" },
    { field: "classCol", text: "Description" },
    { field: "incomeCol", text: "Amount" },
  ];
  useEffect(() => {
    getIncomeStatement();
  }, []);

  function getCurrentDate() {
    var date = new Date().toISOString().split("T")[0];
    return date;
  }

  function getDefaultEndDate() {
    //add one year to start date
    var date = new Date(startDate);
    var newDate = new Date(
      `${date.getFullYear() + 1}-${date.getMonth() + 1}-${date.getDate()}`
    )
      .toISOString()
      .split("T")[0];
    return newDate;
  }

  async function getIncomeStatement() {
    if (startDate && startDate !== "") {
      try {
        const res = await axios.get(
          `${STUDENT_FEES_API}/statement/${startDate}/${endDate}`
        );
        const statementData = res.data;
        var totalIncome = 0;
        if (res.status === HTTP_STATUS.OK) {
          for (let i = 0; i < statementData.length; i++) {
            statementData[i].createdDate = displayDateTimeFormat(
              statementData[i].createdDate
            );
            if (statementData[i].myClass && statementData[i].myClass.fee) {
              statementData[i].classCol = (
                <div>
                  <span style={{ fontWeight: "bold" }}>{"Class Name : "}</span>
                  <span>
                    {statementData[i].myClass.name
                      ? statementData[i].myClass.name
                      : "-"}
                  </span>
                  <br />
                  <span style={{ fontWeight: "bold" }}>{"Class Code : "}</span>
                  <span>
                    {statementData[i].myClass.code
                      ? statementData[i].myClass.code
                      : "-"}
                  </span>
                  <br />
                </div>
              );
            }

            if (statementData[i].myClass && statementData[i].myClass.fee) {
              totalIncome = totalIncome + statementData[i].myClass.fee;
              statementData[i].incomeCol =
                statementData[i].myClass.fee &&
                statementData[i].myClass.fee > 0 ? (
                  <div>
                    <span style={{ fontWeight: "bold", color: "#5cb85c" }}>
                      {statementData[i].myClass.fee}
                    </span>
                  </div>
                ) : (
                  <span style={{ fontWeight: "bold", color: "red" }}>-</span>
                );
            }
            setNettIncome(totalIncome);
          }
          setStatementData(statementData);
        }
        setReady(true);
      } catch (e) {
        console.error("Error fetching statement data:", e);
        toast.error("Error fetching statement data. Please try again");
      }
    } else {
      toast("Please select a starting date to proceed!");
    }
  }

  function showTotalIncome() {
    return (
      <div className="card w-96 bg-base-100 shadow-xl items-center text-center">
        <div className="card-title p-10">
          Total Income:
          <span style={{ fontWeight: "bold", color: "#5cb85c" }}>
            RM{nettIncome}
          </span>
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    getIncomeStatement();
  }, [startDate, endDate]);

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
              type={"date"}
              className="opacity-80"
              placeholder={"Start Date"}
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
            <SimpleForm
              size={1}
              type={"date"}
              className="opacity-80"
              placeholder={"End Date"}
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          {!startDate ? (
            <>
              <div className="card w-96 bg-base-100 shadow-xl items-center text-center">
                <div className="card-title p-10">
                  Please Input A Starting Date to Proceed...
                </div>
              </div>
            </>
          ) : (
            <div />
          )}
          {showTotalIncome()}
        </div>

        <div className="mt-10 px-5 w-full">
          <MyTable columns={columns} data={statementData} />
        </div>
        <YesNoModal show={yesNoModalShow} forward={yesNoModalForward} />
      </div>
    );
  } else {
    return <LoadingPage />;
  }
}

export default ListIncome;
