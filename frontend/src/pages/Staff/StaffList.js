import axios from "axios";
import React, { useEffect, useState } from "react";
import { STAFF_API } from "../../utils/api";
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

function StaffList() {
    const [ready, setReady] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [onCreateOrEdit, setOnCreateOrEdit] = useState(true); // true - create, false - edit
    const [yesNoModalShow, setYesNoModalShow] = useState(false);
    const [yesNoModalForward, setYesNoModalForward] = useState(null);
    const [isCardView, setIsCardView] = useState(true);

    const [staffList, setStaffList] = useState([]);
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [ic, setIc] = useState("");
    const [gender, setGender] = useState("male");
    const [age, setAge] = useState(0);
    const [qualification, setQualification] = useState("bachelor degree"); //Master degree, Bachelor Degree
    const [position, setPosition] = useState("class staff"); //Head of Department, Counseling Staff, Coordinator
    const [contactNo, setContactNo] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const columns = [
        { field: "no.", text: "No." },
        { field: "name", text: "Name" },
        { field: "ic", text: "IC" },
        { field: "gender", text: "Gender" },
        { field: "age", text: "Age" },
        { field: "qualification", text: "Qualification" },
        { field: "position", text: "Position" },
        { field: "contactNo", text: "Contact No." },
        { field: "address", text: "Address" },
        { field: "email", text: "Email" },
        { field: "createdDate", text: "Staff Created Date" },
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
    const qualificationSelection = [
        {
            text: "Bachelor Degree",
            value: "bachelor degree",
        },
        {
            text: "Master Degree",
            value: "master degree",
        },
        {
            text: "Skills Certificate",
            value: "skills certificate",
        },
        {
            text: "Vocational and Technical Certificate",
            value: "vocational and technical certificate",
        },
        {
            text: "Diploma ",
            value: "diploma",
        },
    ];
    const positionSelection = [
        {
            text: "Class Staff",
            value: "class staff",
        },
        {
            text: "Counseling Staff",
            value: "counseling staff",
        },
        {
            text: "Head of Department",
            value: "head of department",
        },
        {
            text: "Coordinator",
            value: "coordinator",
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
            name: "IC",
            type: "text",
            required: true,
            value: ic,
            onChange: (e) => {
                setIc(e.target.value);
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
            name: "Qualification",
            type: "select",
            required: true,
            value: qualification,
            options: qualificationSelection,
            onChange: (e) => {
                let value = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                );
                setQualification(value[0]);
            },
        },
        {
            size: "6",
            name: "Position",
            type: "select",
            required: true,
            value: position,
            options: positionSelection,
            onChange: (e) => {
                let value = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                );
                setPosition(value[0]);
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
            size: "12",
            name: "Address",
            type: "textarea",
            required: true,
            value: address,
            onChange: (e) => {
                setAddress(e.target.value);
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
    ];

    useEffect(() => {
        getStaffList();
    }, []);

    async function getStaffList() {
        const res = await axios.get(STAFF_API);
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

        setStaffList(data);
        setReady(true);
    }

    async function submitCreate() {
        const data = {
            name: name,
            ic: ic,
            gender: gender,
            age: age,
            qualification: qualification,
            position: position,
            contactNo: contactNo,
            address: address,
            email: email,
        };

        try {
            const res = await axios.post(STAFF_API, data);

            if (res.status === HTTP_STATUS.CREATED) {
                setModalOpen(false);
                setReady(false);

                getStaffList();
                reset();
                toast.success("Created new staff successfully!");
            }
        } catch (e) {
            toast.error("Error in creating staff. Please try again.");
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

        if ("ic" in data) {
            setIc(data.ic);
        }

        if ("gender" in data) {
            setGender(data.gender);
        }

        if ("age" in data) {
            setAge(data.age);
        }

        if ("qualification" in data) {
            setQualification(data.qualification);
        }

        if ("position" in data) {
            setPosition(data.position);
        }

        if ("contactNo" in data) {
            setContactNo(data.contactNo);
        }

        if ("address" in data) {
            setAddress(data.address);
        }

        if ("email" in data) {
            setEmail(data.email);
        }
    }

    async function submitUpdate() {
        const data = {
            id: id,
            name: name,
            ic: ic,
            gender: gender,
            age: age,
            qualification: qualification,
            position: position,
            contactNo: contactNo,
            address: address,
            email: email,
        };

        try {
            const res = await axios.put(STAFF_API, data);

            if (res.status === HTTP_STATUS.OK) {
                setModalOpen(false);
                setReady(false);

                getStaffList();
                reset();
                toast.success("Updated staff successfully!");
            }
        } catch (e) {
            toast.error("Error in updating staff. Please try again.");
            toastValidationError(e.response.data);
        }
    }

    function onDelete(id) {
        setYesNoModalShow(true);
        setYesNoModalForward({
            show: true,
            text: "Are you sure you want to delete this staff?",
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
            const res = await axios.delete(STAFF_API + "/" + id);

            if (res.status === HTTP_STATUS.OK) {
                setReady(false);
                getStaffList();

                toast.success("Deleted staff successfully!");
            }
        } catch (e) {
            toast.error("Error in deleting staff.");
        }
    }

    async function onSearch() {
        setReady(false);

        if (search !== "") {
            try {
                const res = await axios.get(STAFF_API + "/search/" + search);
                const data = res.data;

                if (res.status === HTTP_STATUS.OK) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].createdDate = displayDateTimeFormat(data[i].createdDate);

                        data[i].lastModifiedDate = displayDateTimeFormat(
                            data[i].lastModifiedDate
                        );

                        data[i].action = (
                            <div className="flex items-center">
                                <Button
                                    size="sm"
                                    className="mr-3 h-10 rounded-full text-lg text-gray-200 bg-blue-500 border-blue-500"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onEdit(data[i]);
                                    }}
                                >
                                    <FiEdit size={16} />
                                </Button>
                                <Button
                                    color="error"
                                    size="sm"
                                    className="h-10 rounded-full text-xl text-gray-200"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDelete(data[i].id);
                                    }}
                                >
                                    <MdDelete size={16} />
                                </Button>
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

                    setStaffList(data);
                    setReady(true);
                }
            } catch (e) {
                toast.error("Error in searching staffs. Please try again");
            }
        } else {
            getStaffList();
        }
    }

    function reset() {
        setName("");
        setIc("");
        setGender("female");
        setAge(0);
        setQualification("doctoral degree");
        setPosition("class staff")
        setContactNo("");
        setAddress("");
        setEmail("");
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
                    <div className="font-semibold text-2xl">All Staffs</div>
                </div>

                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center">
                        <form onSubmit={() => onSearch()}>
                            <input
                                type="text"
                                placeholder="Search staff..."
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
                                getStaffList();
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
                            Create Staff
                        </Button>
                    </div>
                </div>

                <div className="mt-10 px-5 min-w-min">
                    <MyTable cardView={isCardView} columns={columns} data={staffList} recordType="staff" />
                </div>

                <MyForm
                    gridCols={"12"}
                    modalOpen={modalOpen}
                    formFields={formFields}
                    onClose={() => {
                        reset();
                        setModalOpen(false);
                    }}
                    title={onCreateOrEdit ? "Create Staff" : "Edit Staff"}
                    action={onCreateOrEdit ? () => submitCreate() : () => submitUpdate()}
                />

                <YesNoModal show={yesNoModalShow} forward={yesNoModalForward} />
            </div>
        );
    } else {
        return <LoadingPage />;
    }
}

export default StaffList;