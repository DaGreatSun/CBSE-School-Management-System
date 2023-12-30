package com.cbse.project.service;

import com.cbse.project.model.Student;
import com.cbse.project.model.StudentFee;

import java.util.Date;
import java.util.List;


public interface StudentFeeService {

//    List<Student> viewAllClasses();

    List<StudentFee> viewAllStudentFee();

    StudentFee createFee(StudentFee studentFee, Integer classId, Integer studentId);

//    List<Student> filterStudents(String keyword);
//    Student getStudent(Integer studentId);
//    Student updateStudent(Student student);
//    void deleteStudent(Integer studentId);
}
