package com.cbse.project.service;

import com.cbse.project.model.Student;

import java.util.List;
import java.util.Map;

public interface StudentService {

    List<Student> viewAllStudent();
    Student getStudent(Integer studentId);
    Student createStudent(Student student);
    Student updateStudent(Student student);
    void deleteStudent(Integer studentId);
}
