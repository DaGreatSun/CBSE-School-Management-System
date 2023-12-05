import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NavigationBar from "./component/NavigationBar";
import StudentList from "./pages/Student/StudentList";

function App() {
  return (
    <div className="w-full bg-bg-school h-screen bg-no-repeat bg-center bg-cover">
      <div className="bg-gray-400 w-full h-full bg-opacity-60 overflow-y-scroll">
        <Router>
          <NavigationBar />
          <div className="h-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentList />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
