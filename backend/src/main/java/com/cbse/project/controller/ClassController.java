package com.cbse.project.controller;

import com.cbse.project.model.Class;
import com.cbse.project.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ClassController {

    @Autowired
    ClassService classService;

    @GetMapping("/class/all")
    public ResponseEntity<List<Class>> getAllClasses() throws Exception {
        List<Class> allClasses = classService.viewAllClasses();

        return new ResponseEntity<>(allClasses, HttpStatus.OK);
    }
}
