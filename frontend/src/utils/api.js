const URL = "http://localhost:8081"; // *development

const API_ENDPOINT = URL + "/api";

const STUDENT_API = API_ENDPOINT + "/student";
const STUDENT_FEES_API = API_ENDPOINT + "/student-fee";

const CLASS_API = API_ENDPOINT + "/class";

const TEACHER_API = API_ENDPOINT + "/teacher";
const TEACHER_ATTENDANCE_API = API_ENDPOINT + "/teacher-attendance";
const TEACHER_SALARY_API = API_ENDPOINT + "/teacher-salary";

export {
  STUDENT_API,
  TEACHER_API,
  STUDENT_FEES_API,
  CLASS_API,
  TEACHER_ATTENDANCE_API,
  TEACHER_SALARY_API,
};
