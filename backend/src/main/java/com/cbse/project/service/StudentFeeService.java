package com.cbse.project.service;

import com.cbse.project.model.StudentFee;

import java.util.List;


public interface StudentFeeService {

//    List<Student> viewAllClasses();

    List<StudentFee> viewAllStudentFee();

    List<StudentFee> getFeeHistory(Integer studentId);

    void deleteStudentFee(Integer id);

    StudentFee createFee(StudentFee studentFee, Integer classId, Integer studentId);

//    List<Student> filterStudents(String keyword);
//    Student getStudent(Integer studentId);
//    Student updateStudent(Student student);
//    void deleteStudent(Integer studentId);
}
