package com.cbse.project.controller;

import com.cbse.project.model.StudentFee;
import com.cbse.project.service.StudentFeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudentFee(@PathVariable(value = "id") Integer id) {
        try {
            studentFeeService.deleteStudentFee(id);
            return new ResponseEntity<>("Student Fee with id: " + id + " has been deleted", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

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

    @GetMapping("/history/{studentId}")
    public ResponseEntity<?> getStudent(@PathVariable(value = "studentId") Integer studentId) {
        try {
            List<StudentFee> studentFeeHistory = studentFeeService.getFeeHistory(studentId);
            return new ResponseEntity<>(studentFeeHistory, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/statement/{startDate}/{endDate}")
    public ResponseEntity<?> getStatementList(@PathVariable(value = "startDate") String startDate, @PathVariable(value = "endDate") String endDate) {
        try {
            DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDateTime startDateConverted = LocalDate.parse(startDate, dateFormat).atStartOfDay();
            LocalDateTime endDateConverted = LocalDate.parse(endDate, dateFormat).atStartOfDay();

            List<StudentFee> studentFeeList = studentFeeService.getStatementList(startDateConverted, endDateConverted);
            return new ResponseEntity<>(studentFeeList, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            System.out.println("Error");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

}
