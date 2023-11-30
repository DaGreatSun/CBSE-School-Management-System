package com.cbse.project.controller;

import com.cbse.project.model.Student;
import com.cbse.project.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping("/student/all")
    public ResponseEntity<List<Student>> getAllStudents() throws Exception {
        List<Student> allStudents = studentService.viewAllStudent();

        return new ResponseEntity<>(allStudents, HttpStatus.OK);
    }
}
