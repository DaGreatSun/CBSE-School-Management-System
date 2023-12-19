import React, { useEffect, useState } from "react";
import axios from "axios";
import { CLASS_API, STUDENT_API } from "../../utils/api";
import { MdModeEdit, MdDelete, MdOutlineKeyboardBackspace } from "react-icons/md";
import { Button } from "react-daisyui";
import LoadingPage from "../../component/LoadingPage";
import MyForm from "../../component/MyForm";
import YesNoModal from "../../component/YesNoModal";
import HTTP_STATUS from "../../constant/httpStatus";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ClassList() {
    const [ready, setReady] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [onCreateOrEdit, setOnCreateOrEdit] = useState(true);
    const [yesNoModalShow, setYesNoModalShow] = useState(false);
    const [yesNoModalForward, setYesNoModalForward] = useState(null);
    const [classList, setClassList] = useState([]);
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [fee, setFee] = useState(0);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [studentManagementModalOpen, setStudentManagementModalOpen] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [studentSearchId, setStudentSearchId] = useState("");
    const [enrollLoading, setEnrollLoading] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        getClassList();
    }, []);

    const getClassList = async () => {
        try {
            const response = await axios.get(CLASS_API);
            const data = response.data.map((cls, index) => {
                return {
                    ...cls,
                    no: index + 1,
                    studentCount: cls.studentList.length,
                    action: (
                        <div className="flex items-center">
                            <Button onClick={() => onEdit(cls)} color="info" size="xs" className="mr-2">
                                <MdModeEdit size={20} />
                            </Button>
                            <Button onClick={() => onDelete(cls.id)} color="error" size="xs">
                                <MdDelete size={20} />
                            </Button>
                        </div>
                    ),
                };
            });
            setClassList(data);
            setReady(true);
        } catch (error) {
            console.error("Error fetching classes:", error);
            toast.error("Failed to fetch class data.");
            setReady(true);
        }
    };

    const onEdit = (classData) => {
        setId(classData.id);
        setName(classData.name);
        setCode(classData.code); 
        setFee(classData.fee); 
        setSelectedStudents(classData.studentList || []); // Handle the case where studentList might be undefined
        setOnCreateOrEdit(false);
        setModalOpen(true);
    };

    const onDelete = (classId) => {
        setYesNoModalForward({
            show: true,
            text: "Are you sure you want to delete this class?",
            cb: async (confirm) => {
                if (confirm) {
                    try {
                        const res = await axios.delete(`${CLASS_API}/${classId}`);
                        if (res.status === HTTP_STATUS.NO_CONTENT) {
                            toast.success("Class deleted successfully!");
                            getClassList();
                        }
                    } catch (error) {
                        toast.error("Error deleting class.");
                    }
                }
                setYesNoModalShow(false);
            },
        });
        setYesNoModalShow(true);
    };

    const openStudentManagement = (classId) => {
        setSelectedClassId(classId);
        setStudentManagementModalOpen(true);
    };
    const openCreateClassForm = () => {
        setId(null); // Ensure id is null for creation
        setName(""); // Reset any existing values
        setCode(""); // Reset any existing values
        setFee(0); // Reset any existing values
        setOnCreateOrEdit(true);
        setModalOpen(true);
    };

    const StudentManagementModal = ({ show, onClose, classId }) => {
        const [students, setStudents] = useState([]);
        const [searchedStudents, setSearchedStudents] = useState([]);
        const [enrolledStudents, setEnrolledStudents] = useState([]);
        const [enrollLoading, setEnrollLoading] = useState(false);
        const [studentSearchKeyword, setStudentSearchKeyword] = useState("");
        const [selectedStudentIds, setSelectedStudentIds] = useState([]);

        useEffect(() => {
            if (show) {
                fetchAllStudents();
                fetchEnrolledStudents(classId);
                setSearchedStudents([]); // Reset searched students
                setSelectedStudentIds([]); // Reset selected students
            }
        }, [show, classId]);

        const clearSearchedStudents = () => {
            setSearchedStudents([]);
        };

        const fetchAllStudents = async () => {
            try {
                const response = await axios.get(`${STUDENT_API}`);
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching all students:", error);
                toast.error("Failed to fetch all students.");
            }
        };

        const fetchEnrolledStudents = async (classId) => {
            try {
                const response = await axios.get(`${CLASS_API}/${classId}/students`);
                setEnrolledStudents(response.data);
            } catch (error) {
                console.error("Error fetching enrolled students:", error);
                toast.error("Failed to fetch enrolled students.");
            }
        };

        const onSearchStudent = async () => {
            if (!studentSearchKeyword) return;
            try {
                const response = await axios.get(`${STUDENT_API}/search/${studentSearchKeyword}`);
                setSearchedStudents(response.data);
            } catch (error) {
                setSearchedStudents([]); // Clear searched students on error
                toast.error("No students found.");
            }
        };

        const toggleStudentSelection = (studentId) => {
            if (selectedStudentIds.includes(studentId)) {
                setSelectedStudentIds(selectedStudentIds.filter(id => id !== studentId));
            } else {
                setSelectedStudentIds([...selectedStudentIds, studentId]);
            }
        };

        const enrollSelectedStudents = async () => {
            setEnrollLoading(true);
            try {
                // Create an array of integers from selectedStudentIds
                const studentIds = selectedStudentIds.map(id => parseInt(id));
        
                // Send the array of studentIds in the request body
                await axios.post(`${CLASS_API}/${classId}/student`, studentIds);
        
                toast.success("Students enrolled successfully!");
                fetchEnrolledStudents(classId); // Refresh the enrolled student list
                setSelectedStudentIds([]); // Clear selected students
            } catch (error) {
                toast.error("Failed to enroll students.");
            } finally {
                setEnrollLoading(false);
            }
        };

        const unenrollStudent = async (studentId) => {
            const studentIdList = [studentId]; // Create an array with a single studentId
            try {
                // Send the array of studentIds in the request body
                await axios.delete(`${CLASS_API}/${classId}/student`, { data: studentIdList });
        
                toast.success("Student unenrolled successfully!");
                fetchEnrolledStudents(classId); // Refresh the enrolled student list
            } catch (error) {
                toast.error("Failed to unenroll student.");
            }
        };

        return (
            <div className={show ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Students in Class</h3>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Search by Keyword"
                            className="input input-bordered w-full"
                            value={studentSearchKeyword}
                            onChange={(e) => setStudentSearchKeyword(e.target.value)}
                        />
                        <Button onClick={onSearchStudent}>Search</Button>
                        <Button onClick={clearSearchedStudents}>Clear Search</Button>
                    </div>
                    <h4 className="font-bold text-md">Searched Students:</h4>
                    <div className="space-y-2">
                        {searchedStudents.map(student => (
                            <label key={student.id} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    value={student.id}
                                    checked={selectedStudentIds.includes(student.id)}
                                    onChange={() => toggleStudentSelection(student.id)}
                                    className="checkbox checkbox-primary"
                                />
                                <span className="text-sm">{student.name}</span>
                            </label>
                        ))}
                    </div>
                    <div className="mb-4">
                        <div className="space-y-2">
                            <span className="text-sm font-bold">Select students:</span>
                            {students
                                .filter(student => !enrolledStudents.some(enrolled => enrolled.id === student.id)) // Exclude enrolled students
                                .map(student => (
                                    <label key={student.id} className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            value={student.id}
                                            checked={selectedStudentIds.includes(student.id)}
                                            onChange={() => toggleStudentSelection(student.id)}
                                            className="checkbox checkbox-primary"
                                        />
                                        <span className="text-sm">{student.name}</span>
                                    </label>
                                ))
                            }
                        </div>
                        <Button
                            size="xs"
                            color="success"
                            disabled={enrollLoading || selectedStudentIds.length === 0}
                            style={{ marginTop: "5px" }}
                            onClick={enrollSelectedStudents}
                        >
                            Enroll
                        </Button>
                    </div>


                    <h4 className="font-bold text-md">Enrolled Students:</h4>
                    <ul className="space-y-2">
                        {enrolledStudents.map(student => (
                            <li key={student.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{student.name} - {student.gender}, Age: {student.age}</span>
                                    <span className="px-2 rounded-full text-white bg-green-500 text-sm font-sm">Enrolled</span>
                                </div>
                                <Button
                                    size="xs"
                                    color="danger" // Use the color you prefer for the "Unenroll" button
                                    onClick={() => unenrollStudent(student.id)}
                                >
                                    Unenroll
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <div className="modal-action">
                        <Button onClick={onClose} color="primary">Close</Button>
                    </div>
                </div>
            </div>
        );
    };


    const submitCreate = async () => {
        const newClass = { name, code, fee };
        try {
            const res = await axios.post(CLASS_API, newClass);
            if (res.status === HTTP_STATUS.CREATED) {
                toast.success("Class created successfully!");
                getClassList();
                setModalOpen(false);
            }
        } catch (error) {
            toast.error("Error creating class.");
        }
    };
    const submitUpdate = async () => {
        const updatedClass = { id, name, code, fee };
        try {
            const res = await axios.put(`${CLASS_API}/${id}`, updatedClass);
            if (res.status === HTTP_STATUS.OK) {
                toast.success("Class updated successfully!");
                getClassList();
                setModalOpen(false);
            }
        } catch (error) {
            toast.error("Error updating class.");
        }
    };
    const resetForm = () => {
        setName("");
        setCode("");
        setFee(0);
        setSelectedStudents([]);
    };
    const tableStyle = {
        color: 'black',
        fontWeight: 'bold',
    };

    if (ready) {
        return (
            <div className="w-full h-full p-10 py-7">
                <div className="mb-5 flex items-center justify-between">
                    <MdOutlineKeyboardBackspace
                        size={27}
                        className="cursor-pointer hover:scale-105"
                        onClick={() => navigate("/")}
                    />
                    <h2 className="font-semibold text-2xl">Class Managment</h2>
                    <Button onClick={openCreateClassForm} color="primary">
                        + Create Class
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th style={tableStyle}>No.</th>
                                <th style={tableStyle}>Name</th>
                                <th style={tableStyle}>Code</th>
                                <th style={tableStyle}>Fee</th>
                                <th style={tableStyle}>Number of Students</th>
                                <th style={tableStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody style={tableStyle}>
                            {classList.map((classData, index) => (
                                <tr key={classData.id}>
                                    <td>{index + 1}</td>
                                    <td>{classData.name}</td>
                                    <td>{classData.code}</td>
                                    <td>{classData.fee}</td>
                                    <td>{classData.studentCount}</td>
                                    <td>
                                        <div className="flex items-center justify-start space-x-2">
                                            <Button onClick={() => onEdit(classData)} color="info" size="xs">
                                                <MdModeEdit size={20} />
                                            </Button>
                                            <Button onClick={() => onDelete(classData.id)} color="error" size="xs">
                                                <MdDelete size={20} />
                                            </Button>
                                            <Button onClick={() => openStudentManagement(classData.id)} size="xs">
                                                Manage Students
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <MyForm
                    gridCols={"12"}
                    modalOpen={modalOpen}
                    formFields={[
                        { size: "12", name: "Name", type: "text", required: true, value: name, onChange: (e) => setName(e.target.value) },
                        { size: "12", name: "Code", type: "text", required: true, value: code, onChange: (e) => setCode(e.target.value) },
                        { size: "12", name: "Fee", type: "number", required: true, value: fee, onChange: (e) => setFee(e.target.value) },
                        // ... other fields as necessary ...
                    ]}
                    onClose={() => {
                        resetForm();
                        setModalOpen(false);
                    }}
                    title={onCreateOrEdit ? "Create Class" : "Edit Class"}
                    action={onCreateOrEdit ? submitCreate : submitUpdate}
                />

                <YesNoModal show={yesNoModalShow} forward={yesNoModalForward} />
                <StudentManagementModal
                    show={studentManagementModalOpen}
                    onClose={() => setStudentManagementModalOpen(false)}
                    classId={selectedClassId}
                />
            </div>
        );
    } else {
        return <LoadingPage />;
    }
}

export default ClassList;
