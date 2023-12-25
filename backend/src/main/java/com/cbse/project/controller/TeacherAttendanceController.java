package com.cbse.project.controller;

import com.cbse.project.model.Student;
import com.cbse.project.model.TeacherAttendance;
import com.cbse.project.service.StudentService;
import com.cbse.project.service.TeacherAttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/teacher-attendance")
public class TeacherAttendanceController {

    @Autowired
    TeacherAttendanceService teacherAttendanceService;

    @GetMapping
    public ResponseEntity<List<TeacherAttendance>> getAllStudents() {
        try {
            List<TeacherAttendance> teacherAttendance = new ArrayList<>();
            return new ResponseEntity<>(teacherAttendance, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }
}