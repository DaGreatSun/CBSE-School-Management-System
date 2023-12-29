package com.cbse.project.controller;

import com.cbse.project.model.StudentAttendance;
import com.cbse.project.service.StudentAttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/student-attendance")
public class StudentAttendanceController {

    @Autowired
    StudentAttendanceService studentAttendanceService;

    @GetMapping("/{classId}/{date}")
    public ResponseEntity<List<StudentAttendance>> getStudentAttendanceByClassIdAndDate(
            @PathVariable(name = "classId") Integer classId,
            @PathVariable(name = "date") String date
    ) throws ParseException {
        try {
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date convertDate = dateFormat.parse(date);
            List<StudentAttendance> attendanceList = studentAttendanceService.getAttendanceByClassIdAndDate(classId, convertDate);

            return new ResponseEntity<>(attendanceList, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PostMapping("/{classId}/{date}")
    public ResponseEntity<StudentAttendance> addAttendance(
            @PathVariable(name = "classId") Integer classId,
            @PathVariable(name = "date") String date,
            @RequestBody @Valid StudentAttendance sa
    ) {
        try {
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date convertDate = dateFormat.parse(date);
            sa.setDate(convertDate);

            StudentAttendance createdSA = studentAttendanceService.createAttendance(classId, sa);

            return new ResponseEntity<>(createdSA, HttpStatus.OK);
        } catch (IllegalArgumentException | ParseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @DeleteMapping("/{classId}/{date}/{studentId}")
    public ResponseEntity<?> deleteAttendance(
            @PathVariable(name = "classId") Integer classId,
            @PathVariable(name = "date") String date,
            @PathVariable(name = "studentId") Integer studentId
    ) {
        try {
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date convertDate = dateFormat.parse(date);

            studentAttendanceService.deleteAttendance(classId, convertDate, studentId);

            return new ResponseEntity<>(
                    "Student Attendance with class id(" + classId + "), date(" + date + ") and student id(" + studentId + ") has been deleted",
                    HttpStatus.OK
            );
        } catch (IllegalArgumentException | ParseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }
}
