const URL = "http://localhost:8081"; // *development

const API_ENDPOINT = URL + "/api";

const STUDENT_API = API_ENDPOINT + "/student";
const STUDENT_FEES_API = API_ENDPOINT + "/student-fee";

const CLASS_API = API_ENDPOINT + "/class";

const TEACHER_API = API_ENDPOINT + "/teacher";
const TEACHER_ATTENDANCE_API = API_ENDPOINT + "/teacher-attendance";
const STUDENT_ATTENDANCE_API = API_ENDPOINT + "/student-attendance";
const STAFF_ATTENDANCE_API = API_ENDPOINT + "/staff-attendance";

const TEACHER_SALARY_API = API_ENDPOINT + "/teacher-salary";
const STAFF_SALARY_API = API_ENDPOINT + "/staff-salary";

const STAFF_API = API_ENDPOINT + "/staff";

export {
  STUDENT_API,
  TEACHER_API,
  STUDENT_FEES_API,
  CLASS_API,
  TEACHER_ATTENDANCE_API,
  STUDENT_ATTENDANCE_API,
  STAFF_ATTENDANCE_API,
  TEACHER_SALARY_API,
  STAFF_API,
  STAFF_SALARY_API
};
