import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NavigationBar from "./component/NavigationBar";
import StudentList from "./pages/Student/StudentList";
import TeacherList from "./pages/Teacher/TeacherList";
import { Toaster } from "react-hot-toast";
import ClassList from "./pages/Class/ClassList";
import AttendanceDash from "./pages/Attendance/AttendanceDash";
import ClassAttendance from "./pages/Attendance/ClassAttendance";

function App() {
  return (
    <div className="w-full bg-bg-school h-screen bg-no-repeat bg-center bg-cover">
      <div className="bg-gray-400 w-full h-full bg-opacity-60 overflow-y-scroll">
        <Router>
          <NavigationBar />
          <div className="h-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<AttendanceDash />} />
              <Route path="/attendance/class" element={<ClassAttendance />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/teachers" element={<TeacherList />} />
              <Route path="/classes" element={<ClassList />} />
            </Routes>
          </div>
        </Router>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
