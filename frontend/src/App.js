import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NavigationBar from "./component/NavigationBar";
import StudentList from "./pages/Student/StudentList";
import TeacherList from "./pages/Teacher/TeacherList";
import StaffList from "./pages/Staff/StaffList";
import ListStudentFees from "./pages/Student/ListStudentFees";
import { Toaster } from "react-hot-toast";
import ClassList from "./pages/Class/ClassList";
import AttendanceDash from "./pages/Attendance/AttendanceDash";
import ClassAttendance from "./pages/Attendance/ClassAttendance";
import StaffAttendance from "./pages/Attendance/StaffAttendance";
import TeacherSalaryList from "./pages/Teacher/TeacherSalaryList";
import Income from "./pages/Income/IncomeList";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51OPTTmE67CGRL4YLqr0m7y0eJzhGUmHvDrVAi00sSnEl67OEvCfVdfNm5sOp7jgG4oboEgNczgXL692xyRWW2IIZ00v89MHQXv"
  );

  return (
    <div className="w-full bg-bg-school h-screen bg-no-repeat bg-center bg-cover">
      <div className="bg-gray-400 w-full h-full bg-opacity-60 overflow-y-scroll">
      <Elements stripe={stripePromise}>
        <Router>
          <NavigationBar />
          <div className="h-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Dashboard />} />

              <Route path="/attendance" element={<AttendanceDash />} />
              <Route path="/attendance/class" element={<ClassAttendance />} />
              <Route path="/attendance/staff" element={<StaffAttendance />} />

              <Route path="/students" element={<StudentList />} />
              <Route path="/student-fee" element={<ListStudentFees />} />

              <Route path="/teachers" element={<TeacherList />} />
              <Route path="/teacher_salary" element={<TeacherSalaryList />} />

              <Route path="/staff" element={<StaffList />} />

              <Route path="/classes" element={<ClassList />} />
              <Route path="/income" element={<Income />} />
            </Routes>
          </div>
        </Router>
        </Elements>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
