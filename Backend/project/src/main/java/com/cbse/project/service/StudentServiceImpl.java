package com.cbse.project.service;

import com.cbse.project.model.Student;
import com.cbse.project.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;


    @Override
    public List<Student> viewAllStudent() throws Exception {
        List<Student> studentList = studentRepository.findAll();

        if (studentList.isEmpty()) {
            throw new Exception("No student has been found. Try again later.");
        }

        return studentList;
    }
}
