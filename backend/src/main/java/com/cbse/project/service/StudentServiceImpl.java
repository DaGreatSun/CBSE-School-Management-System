package com.cbse.project.service;

import com.cbse.project.model.Student;
import com.cbse.project.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;


    @Override
    public List<Student> viewAllStudent() {
        return studentRepository.findAll();
    }

    @Override
    public List<Student> filterStudents(String keyword) {
        return studentRepository.filterStudents(keyword);
    }

    @Override
    public Student getStudent(Integer studentId) {
        Optional<Student> student = studentRepository.findById(studentId);

        if (student.isPresent()) {
            return student.get();
        } else {
            throw new IllegalArgumentException("Student not found with id: " + studentId);
        }
    }

    @Override
    public Student createStudent(Student student) {
        try {
            // Perform additional business logic/validation here
            return studentRepository.save(student);
        } catch (DataIntegrityViolationException e) {
            // Handle specific exceptions (e.g., unique constraint violation)
            throw new IllegalArgumentException("Student with the same name already exists");
        } catch (Exception e) {
            // Handle other exceptions
            throw new RuntimeException("An error occurred while creating the student", e);
        }
    }

    @Override
    public Student updateStudent(Student student) {
        Optional<Student> findStudent = studentRepository.findById(student.getId());

        if (findStudent.isPresent()) {
            Student existingStudent = findStudent.get();

            existingStudent.setName(student.getName());
            existingStudent.setAge(student.getAge());
            existingStudent.setAddress(student.getAddress());
            existingStudent.setEmail(student.getEmail());
            existingStudent.setGender(student.getGender());
            existingStudent.setContactNo(student.getContactNo());
            existingStudent.setParentName(student.getParentName());
            existingStudent.setClassId(student.getClassId());

            return studentRepository.save(existingStudent);
        } else {
            throw new IllegalArgumentException("Student not found with id: " + student.getId());
        }
    }

    @Override
    public void deleteStudent(Integer studentId) {
        Optional<Student> findStudent = studentRepository.findById(studentId);

        if (findStudent.isPresent()) {
            studentRepository.deleteById(studentId);
        } else {
            throw new IllegalArgumentException("Student not found with id: " + studentId);
        }
    }
}
