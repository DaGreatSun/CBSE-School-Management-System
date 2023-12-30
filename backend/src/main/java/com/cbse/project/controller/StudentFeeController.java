package com.cbse.project.controller;

import com.cbse.project.model.StudentFee;
import com.cbse.project.service.StudentFeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/student-fee")
public class StudentFeeController {

    @Autowired
    StudentFeeService studentFeeService;


    @GetMapping
    public ResponseEntity<List<StudentFee>> getAllStudentFee() {
        try {
            List<StudentFee> allStudents = studentFeeService.viewAllStudentFee();
            return new ResponseEntity<>(allStudents, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PostMapping("/{classId}/{studId}")
    public ResponseEntity<?> createStudentFee(@RequestBody @Valid StudentFee studentFee,
                                              @PathVariable(name = "classId") Integer classId,
                                              @PathVariable(name = "studId") Integer studId) {
        System.out.println("student fee data, " + studentFee);
        try {

            StudentFee paidStudentFee = studentFeeService.createFee(studentFee, classId, studId);
            return new ResponseEntity<>(paidStudentFee, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);

        }

    }

//    @PutMapping
//    public ResponseEntity<?> updateStudent(@RequestBody @Valid Student student) {
//        try {
//            Student updatedStudent = studentService.updateStudent(student);
//            return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
//        } catch (IllegalArgumentException e) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
//        } catch (Exception e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
//        }
//    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteStudent(@PathVariable(value = "id") Integer studentId) {
//        try {
//            studentService.deleteStudent(studentId);
//            return new ResponseEntity<>("Student with id: " + studentId + " has been deleted", HttpStatus.OK);
//        } catch (IllegalArgumentException e) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
//        } catch (Exception e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
//        }
//    }
    //    @GetMapping("/search/{keyword}")
//    public ResponseEntity<List<Student>> searchStudents(@PathVariable(name = "keyword") String keyword) {
//        try {
//            List<Student> students = new ArrayList<>();
//
//            if (keyword != null && !keyword.isEmpty()) {
//                students = studentService.filterStudents(keyword);
//            } else {
//                students = studentService.viewAllStudent();
//            }
//
//            return new ResponseEntity<>(students, HttpStatus.OK);
//        } catch (Exception e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
//        }
//    }

    @GetMapping("/history/{id}")
    public ResponseEntity<?> getStudent(@PathVariable(value = "id") Integer studentId) {
        try {
            List<StudentFee> feeHistory = new ArrayList<>();

            StudentFee studentFee = studentService.getStudent(studentId);
            return new ResponseEntity<>(student, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

}
