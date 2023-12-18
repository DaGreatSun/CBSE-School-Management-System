package com.cbse.project.controller;

import com.cbse.project.model.Teacher;
import com.cbse.project.service.TeacherService;
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
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    TeacherService teacherService;

    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        try {
            List<Teacher> allTeachers = teacherService.viewAllTeachers();
            return new ResponseEntity<>(allTeachers, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<Teacher>> searchTeachers(@PathVariable(name = "keyword") String keyword) {
        try {
            List<Teacher> teachers = new ArrayList<>();

            if (keyword != null && !keyword.isEmpty()) {
                teachers = teacherService.filterTeachers(keyword);
            } else {
                teachers = teacherService.viewAllTeachers();
            }

            return new ResponseEntity<>(teachers, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTeacher(@PathVariable(value = "id") Integer techerId) {
        try {
            Teacher teacher = teacherService.getTeacher(techerId);
            return new ResponseEntity<>(teacher, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createTeacher(@RequestBody @Valid Teacher teacher) {
        try {
            Teacher createdTeacher = teacherService.createTeacher(teacher);
            return new ResponseEntity<>(createdTeacher, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateTeacher(@RequestBody @Valid Teacher teacher) {
        try {
            Teacher updatedTeacher = teacherService.updateTeacher(teacher);
            return new ResponseEntity<>(updatedTeacher, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable(value = "id") Integer teacherId) {
        try {
            teacherService.deleteTeacher(teacherId);
            return new ResponseEntity<>("Teacher with id: " + teacherId + " has been deleted", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }
}
