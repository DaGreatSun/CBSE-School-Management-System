package com.cbse.project.controller;

import com.cbse.project.model.Class;
import com.cbse.project.model.Student;
import com.cbse.project.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ClassController {

    @Autowired
    private ClassService classService;

    // Get all classes
    @GetMapping("/class")
    public ResponseEntity<List<Class>> getAllClasses() {
        List<Class> allClasses = classService.getAllClasses();
        return new ResponseEntity<>(allClasses, HttpStatus.OK);
    }

    // Get a single class by ID
    @GetMapping("/class/{id}")
    public ResponseEntity<Class> getClassById(@PathVariable Integer id) {
        Class myClass = classService.getClassById(id);
        return new ResponseEntity<>(myClass, HttpStatus.OK);
    }

    // Create a new class
    @PostMapping("/class")
    public ResponseEntity<Class> createClass(@RequestBody Class newClass) {
        Class createdClass = classService.createClass(newClass);
        return new ResponseEntity<>(createdClass, HttpStatus.CREATED);
    }

    // Update an existing class
    @PutMapping("/class/{id}")
    public ResponseEntity<Class> updateClass(@PathVariable Integer id, @RequestBody Class classDetails) {
        Class updatedClass = classService.updateClass(id, classDetails);
        return new ResponseEntity<>(updatedClass, HttpStatus.OK);
    }

    // Delete a class
    @DeleteMapping("/class/{id}")
    public ResponseEntity<?> deleteClass(@PathVariable Integer id) {
        classService.deleteClass(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Get students in a class
    @GetMapping("/class/{id}/students")
    public ResponseEntity<List<Student>> getStudentsInClass(@PathVariable Integer id) {
        List<Student> students = classService.getStudentsInClass(id);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Add student to a class
    @PostMapping("/class/{classId}/student")
    public ResponseEntity<Class> addStudentToClass(@PathVariable Integer classId, @RequestBody List<Integer> studentIds) {
        Class updatedClass = classService.addStudentsToClass(classId, studentIds);
        return new ResponseEntity<>(updatedClass, HttpStatus.OK);
    }

    // Remove a student from a class
    @DeleteMapping("/class/{classId}/student")
    public ResponseEntity<Class> removeStudentFromClass(@PathVariable Integer classId, @RequestBody List<Integer> studentIds) {
        Class updatedClass = classService.removeStudentsFromClass(classId, studentIds);
        return new ResponseEntity<>(updatedClass, HttpStatus.OK);
    }

}
