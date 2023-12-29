package com.cbse.project.controller;

import com.cbse.project.model.TeacherAttendance;
import com.cbse.project.service.TeacherAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/teacher-attendance")
public class TeacherAttendanceController {

    @Autowired
    TeacherAttendanceService teacherAttendanceService;

    @GetMapping("/{classId}/{date}")
    public ResponseEntity<?> getTeacherAttendance(
            @PathVariable(value = "classId") Integer classId,
            @PathVariable(value = "date") String date) {
        try {
            TeacherAttendance teacherAttendance = teacherAttendanceService.getTeacherAttendance(classId, date);
            return new ResponseEntity<>(teacherAttendance, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PostMapping("add/{teacherId}/{classId}/{date}")
    public ResponseEntity<?> addTeacherAttendance(
            @PathVariable(value = "teacherId") Integer teacherId,
            @PathVariable(value = "classId") Integer classId,
            @PathVariable(value = "date") String date) {
        try {
            TeacherAttendance teacherAttendance = teacherAttendanceService.addTeacherAttendance(teacherId, classId, date);
            return new ResponseEntity<>(teacherAttendance, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PostMapping("remove/{teacherId}/{classId}/{date}")
    public ResponseEntity<?> removeTeacherAttendance(
            @PathVariable(value = "teacherId") Integer teacherId,
            @PathVariable(value = "classId") Integer classId,
            @PathVariable(value = "date") String date) {
        try {
            teacherAttendanceService.removeTeacherAttendance(teacherId, classId, date);
            return new ResponseEntity<>("Teacher's Attendance for class " + classId + " haas been removed", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }
}