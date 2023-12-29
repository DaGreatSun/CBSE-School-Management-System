package com.cbse.project.controller;

import com.cbse.project.model.Staff;
import com.cbse.project.service.StaffService;
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
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    StaffService staffService;

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaffs() {
        try {
            List<Staff> allStaffs = staffService.viewAllStaffs();
            return new ResponseEntity<>(allStaffs, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<Staff>> searchStaffs(@PathVariable(name = "keyword") String keyword) {
        try {
            List<Staff> staffs = new ArrayList<>();

            if (keyword != null && !keyword.isEmpty()) {
                staffs = staffService.filterStaffs(keyword);
            } else {
                staffs = staffService.viewAllStaffs();
            }

            return new ResponseEntity<>(staffs, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStaff(@PathVariable(value = "id") Integer techerId) {
        try {
            Staff staff = staffService.getStaff(techerId);
            return new ResponseEntity<>(staff, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createStaff(@RequestBody @Valid Staff staff) {
        try {
            Staff createdStaff = staffService.createStaff(staff);
            return new ResponseEntity<>(createdStaff, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateStaff(@RequestBody @Valid Staff staff) {
        try {
            Staff updatedStaff = staffService.updateStaff(staff);
            return new ResponseEntity<>(updatedStaff, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable(value = "id") Integer staffId) {
        try {
            staffService.deleteStaff(staffId);
            return new ResponseEntity<>("Staff with id: " + staffId + " has been deleted", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }
}