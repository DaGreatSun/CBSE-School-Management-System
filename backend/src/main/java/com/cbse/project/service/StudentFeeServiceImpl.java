package com.cbse.project.service;

import com.cbse.project.model.Class;
import com.cbse.project.model.Student;
import com.cbse.project.model.StudentFee;
import com.cbse.project.repository.ClassRepository;
import com.cbse.project.repository.StudentRepository;
import com.cbse.project.repository.StudentFeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudentFeeServiceImpl implements StudentFeeService {
    @Autowired
    ClassRepository classRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    StudentFeeRepository studentFeeRepository;

    @Override
    public List<StudentFee> viewAllStudentFee() {
        return studentFeeRepository.findAll();
    }

    @Override
    public StudentFee createFee(StudentFee studentFee, Integer classId, Integer studentId) {

        try {
            // Perform additional business logic/validation here
            Optional<Class> classEntity = classRepository.findById(classId);
            classEntity.ifPresent(studentFee::setMyClass);
            Optional<Student> studentEntity = studentRepository.findById(studentId);
            studentEntity.ifPresent(studentFee::setStud);

            System.out.println(studentFee.toString());
            return studentFeeRepository.save(studentFee);
        } catch (DataIntegrityViolationException e) {
            // Handle specific exceptions (e.g., unique constraint violation)
            throw new IllegalArgumentException("Payment with the same date by this student already exists");
        } catch (Exception e) {
            // Handle other exceptions
            throw new RuntimeException("An error occurred while making payment", e);
        }
    }

//    @Override
//    public List<Student> filterStudents(String keyword) {
//        return studentRepository.filterStudents(keyword);
//    }
//
//    @Override
//    public Student getStudent(Integer studentId) {
//        Optional<Student> student = studentRepository.findById(studentId);
//
//        if (student.isPresent()) {
//            return student.get();
//        } else {
//            throw new IllegalArgumentException("Student not found with id: " + studentId);
//        }
//    }
//
//    @Override
//    public Student updateStudent(Student student) {
//        Optional<Student> findStudent = studentRepository.findById(student.getId());
//
//        if (findStudent.isPresent()) {
//            Student existingStudent = findStudent.get();
//
//            existingStudent.setName(student.getName());
//            existingStudent.setAge(student.getAge());
//            existingStudent.setAddress(student.getAddress());
//            existingStudent.setEmail(student.getEmail());
//            existingStudent.setGender(student.getGender());
//            existingStudent.setContactNo(student.getContactNo());
//            existingStudent.setParentName(student.getParentName());
//            existingStudent.setMyClass(student.getMyClass());
//
//            return studentRepository.save(existingStudent);
//        } else {
//            throw new IllegalArgumentException("Student not found with id: " + student.getId());
//        }
//    }
//
//    @Override
//    public void deleteStudent(Integer studentId) {
//        Optional<Student> findStudent = studentRepository.findById(studentId);
//
//        if (findStudent.isPresent()) {
//            studentRepository.deleteById(studentId);
//        } else {
//            throw new IllegalArgumentException("Student not found with id: " + studentId);
//        }
//    }
}
