package com.cbse.project.controller;

import com.cbse.project.model.Student;
import com.cbse.project.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        try {
            List<Student> allStudents = studentService.viewAllStudent();
            return new ResponseEntity<>(allStudents, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<Student>> searchStudents(@PathVariable(name = "keyword") String keyword) {
        try {
            List<Student> students = new ArrayList<>();

            if (keyword != null && !keyword.isEmpty()) {
                students = studentService.filterStudents(keyword);
            } else {
                students = studentService.viewAllStudent();
            }

            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudent(@PathVariable(value = "id") Integer studentId) {
        try {
            Student student = studentService.getStudent(studentId);
            return new ResponseEntity<>(student, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody @Valid Student student) {
        System.out.println("stu" + student);
        try {
            Student createdStudent = studentService.createStudent(student);
            return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateStudent(@RequestBody @Valid Student student) {
        try {
            Student updatedStudent = studentService.updateStudent(student);
            return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable(value = "id") Integer studentId) {
        try {
            studentService.deleteStudent(studentId);
            return new ResponseEntity<>("Student with id: " + studentId + " has been deleted", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }
}
