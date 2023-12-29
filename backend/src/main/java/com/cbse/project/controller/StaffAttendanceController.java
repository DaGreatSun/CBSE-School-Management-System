package com.cbse.project.controller;

import com.cbse.project.model.StaffAttendance;
import com.cbse.project.model.TeacherAttendance;
import com.cbse.project.service.StaffAttendanceService;
import com.cbse.project.service.TeacherAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/staff-attendance")
public class StaffAttendanceController {

    @Autowired
    StaffAttendanceService staffAttendanceService;

    @GetMapping("/search/{date}")
    public ResponseEntity<?> getStaffAttendance(
            @PathVariable(value = "date") String date) {
        try {
            List<StaffAttendance> staffAttendances = staffAttendanceService.getStaffAttendance("", date);
            return new ResponseEntity<>(staffAttendances, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @GetMapping("/search/{date}/{keyword}")
    public ResponseEntity<?> getStaffAttendance(
            @PathVariable(value = "date") String date,
            @PathVariable(value = "keyword") String keyword) {
        try {
            List<StaffAttendance> staffAttendances = staffAttendanceService.getStaffAttendance(keyword, date);
            return new ResponseEntity<>(staffAttendances, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PostMapping("/add/{staffId}/{date}")
    public ResponseEntity<?> addStaffAttendance(
            @PathVariable(value = "staffId") Integer staffId,
            @PathVariable(value = "date") String date) {
        try {
            StaffAttendance staffAttendance = staffAttendanceService.addStaffAttendance(staffId, date);
            return new ResponseEntity<>(staffAttendance, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @DeleteMapping("/{staffId}/{date}")
    public ResponseEntity<?> removeTeacherAttendance(
            @PathVariable(value = "staffId") Integer staffId,
            @PathVariable(value = "date") String date) {
        try {
            staffAttendanceService.removeStaffAttendance(staffId, date);
            return new ResponseEntity<>("Staff's Attendance for staff " + staffId + " haas been removed", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }
}