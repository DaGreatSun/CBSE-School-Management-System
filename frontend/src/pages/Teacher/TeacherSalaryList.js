import axios from "axios";
import React, { useEffect, useState } from "react";
import { TEACHER_SALARY_API } from "../../utils/api";
import { IoSearch } from "react-icons/io5";
import {
    MdModeEdit,
    MdOutlineKeyboardBackspace,
    MdPersonAddAlt1,
    MdTableChart,
    MdPayment,
} from "react-icons/md";
import { Button } from "react-daisyui";
import MyTable from "../../component/MyTable";
import LoadingPage from "../../component/LoadingPage";
import MyForm from "../../component/MyForm";
import toast from "react-hot-toast";
import { toastValidationError } from "../../utils/errorHandling";
import YesNoModal from "../../component/YesNoModal";
import HTTP_STATUS from "../../constant/httpStatus";
import { FaRotate } from "react-icons/fa6";
import { displayDateTimeFormat } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import StripePaymentForm from "../../component/StripePaymentForm";

function TeacherSalaryList() {
    const [ready, setReady] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [onCreateOrEdit, setOnCreateOrEdit] = useState(true); // true - create, false - edit
    const [yesNoModalShow, setYesNoModalShow] = useState(false);
    const [yesNoModalForward, setYesNoModalForward] = useState(null);

    const [teacherSalaryList, setTeacherSalaryList] = useState([]);
    const [id, setId] = useState(0);
    const [basicPay, setBasicPay] = useState(0);
    const [bonuses, setBonuses] = useState(0);
    const [deductions, setDeductions] = useState(0);
    const [netPay, setNetPay] = useState(0);
    const [search, setSearch] = useState("");
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedSalaryId, setSelectedSalaryId] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(0);

    const navigate = useNavigate();

    const columns = [
        { field: "no.", text: "No." },
        { field: "teacherName", text: "Name" },
        { field: "basicPay", text: "Basic Pay" },
        { field: "bonuses", text: "Bonuses" },
        { field: "deductions", text: "Deductions" },
        { field: "netPay", text: "Net Pay" },
        { field: "createdDate", text: "Salary Created Date" },
        { field: "lastModifiedDate", text: "Last Modified Date" },
        { field: "action", text: "Action" },
    ];

    const formFields = [
        {
            size: "6",
            name: "Basic Pay",
            type: "number",
            required: true,
            value: basicPay,
            onChange: (e) => {
                setBasicPay(e.target.value);
            },
        },
        {
            size: "6",
            name: "Bonuses",
            type: "number",
            required: true,
            value: bonuses,
            onChange: (e) => {
                setBonuses(e.target.value);
            },
        },
        {
            size: "6",
            name: "Deductions",
            type: "number",
            required: true,
            value: deductions,
            onChange: (e) => {
                setDeductions(e.target.value);
            },
        },
    ];

    useEffect(() => {
        getTeacherSalaryList();
    }, []);

    const openPaymentModal = (id, amount) => {
        setSelectedSalaryId(id);
        setSelectedAmount(amount);
        setPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setPaymentModalOpen(false);
        setSelectedSalaryId(null);
        setSelectedAmount(0);
    };

    async function getTeacherSalaryList() {
        try {
            const res = await axios.get(TEACHER_SALARY_API);
            console.log(res.data)
            const data = res.data.map(item => ({
                ...item,
                createdDate: displayDateTimeFormat(item.createdDate),
                lastModifiedDate: displayDateTimeFormat(item.lastModifiedDate),
                action: (
                    <div className={`flex items-center`}>
                        <div
                            title="Edit"
                            className={`text-blue-500 mr-1 cursor-pointer hover:bg-blue-200 rounded-full p-2 duration-200`}
                            onClick={(e) => {
                                e.preventDefault();
                                onEdit(item);
                            }}
                        >
                            <MdModeEdit size={20} />
                        </div>
                        <div
                            title="Pay"
                            className={`text-green-500 cursor-pointer hover:bg-green-200 rounded-full p-2 duration-200`}
                            onClick={() => openPaymentModal(item.id, item.netPay)}
                        >
                            <MdPayment size={20} />
                        </div>
                    </div>
                )
            }));
            setTeacherSalaryList(data);
            setReady(true);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }


    function onEdit(data) {
        setOnCreateOrEdit(false);
        setModalOpen(true);
        setId(data.id);
        setBasicPay(data.basicPay);
        setBonuses(data.bonuses);
        setDeductions(data.deductions);

        if ("basicPay" in data) {
            setBasicPay(data.basicPay);
        }

        if ("bonuses" in data) {
            setBonuses(data.bonuses);
        }

        if ("deductions" in data) {
            setDeductions(data.deductions);
        }
    }

    async function submitUpdate() {
        const data = {
            id: id,
            basicPay: basicPay,
            bonuses: bonuses,
            deductions: deductions,
        };

        try {
            const res = await axios.put(TEACHER_SALARY_API, data);

            if (res.status === HTTP_STATUS.OK) {
                setModalOpen(false);
                setReady(false);

                getTeacherSalaryList();
                reset();
                toast.success("Updated teacher salary successfully!");
            }
        } catch (e) {
            toast.error("Error in updating teacher salary. Please try again.");
            toastValidationError(e.response.data);
        }
    }

    async function onSearch() {
        setReady(false);

        if (search !== "") {
            try {
                const res = await axios.get(TEACHER_SALARY_API + "/search/" + search);

                if (res.status === HTTP_STATUS.OK) {
                    console.log("hihi")
                    console.log(res.data)
                    const data = res.data.map(item => ({
                        ...item,
                        createdDate: displayDateTimeFormat(item.createdDate),
                        lastModifiedDate: displayDateTimeFormat(item.lastModifiedDate),
                        action: (
                            <div className={`flex items-center`}>
                                <div
                                    title="Edit"
                                    className={`text-blue-500 mr-1 cursor-pointer hover:bg-blue-200 rounded-full p-2 duration-200`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onEdit(item);
                                    }}
                                >
                                    <MdModeEdit size={20} />
                                </div>
                                <div
                                    title="Pay"
                                    className={`text-green-500 cursor-pointer hover:bg-green-200 rounded-full p-2 duration-200`}
                                    onClick={() => openPaymentModal(item.id, item.netPay)}
                                >
                                    <MdPayment size={20} />
                                </div>
                            </div>
                        )
                    }));
                    setTeacherSalaryList(data);
                    setReady(true);
                }
            } catch (e) {
                toast.error("Error in searching teachers. Please try again");
            }
        } else {
            getTeacherSalaryList();
        }
    }

    function reset() {
        setBasicPay(0);
        setBonuses(0);
        setDeductions(0);
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
                    <div className="font-semibold text-2xl">All Teachers' Salary</div>
                </div>

                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center">
                        <form onSubmit={() => onSearch()}>
                            <input
                                type="text"
                                placeholder="Search teacher salary by teacher name..."
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
                                getTeacherSalaryList();
                            }}
                        />

                    </div>
                </div>

                <div className="mt-10 px-5 min-w-min">
                    <MyTable cardView={false} columns={columns} data={teacherSalaryList} recordType="teacherSalary" />
                </div>

                <MyForm
                    gridCols={"12"}
                    modalOpen={modalOpen}
                    formFields={formFields}
                    onClose={() => {
                        reset();
                        setModalOpen(false);
                    }}
                    title={"Edit Teacher Salary"}
                    action={() => submitUpdate()}
                />

                <YesNoModal show={yesNoModalShow} forward={yesNoModalForward} />

                {paymentModalOpen && (
                    <StripePaymentForm
                        isOpen={paymentModalOpen}
                        closeModal={closePaymentModal}
                        salaryId={selectedSalaryId}
                        amount={selectedAmount}
                    />
                )}

            </div>
        );
    } else {
        return <LoadingPage />;
    }
}

export default TeacherSalaryList;