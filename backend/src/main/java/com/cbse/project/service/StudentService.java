package com.cbse.project.service;

import com.cbse.project.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface StudentService {

    List<Student> viewAllStudent();
    List<Student> filterStudents(String keyword);
    Student getStudent(Integer studentId);
    Student createStudent(Student student);
    Student updateStudent(Student student);
    void deleteStudent(Integer studentId);
}
