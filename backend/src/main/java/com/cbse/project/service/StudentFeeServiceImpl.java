package com.cbse.project.service;

import com.cbse.project.model.Class;
import com.cbse.project.model.Student;
import com.cbse.project.model.StudentFee;
import com.cbse.project.repository.ClassRepository;
import com.cbse.project.repository.StudentRepository;
import com.cbse.project.repository.StudentFeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
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

    @Override
    public List<StudentFee> getStatementList(LocalDateTime startDate, LocalDateTime endDate) {
        List<StudentFee> studentFees;
        System.out.println(startDate);
        System.out.println(endDate);
        studentFees = studentFeeRepository.findByCreatedDateGreaterThanEqualAndCreatedDateLessThanEqual(startDate, endDate);
        System.out.println(studentFees);
        return studentFees;
    }

    //    @Override
//    public List<Student> filterStudents(String keyword) {
//        return studentRepository.filterStudents(keyword);
//    }
//
    @Override
    public List<StudentFee> getFeeHistory(Integer studentId) {
        List<StudentFee> feeHistory = studentFeeRepository.findByStud_Id(studentId);
        feeHistory.sort(Comparator.comparing(StudentFee::getCreatedDate).reversed());
        return feeHistory;
    }

    @Override
    public void deleteStudentFee(Integer id) {
        Optional<StudentFee> findStudentFee = studentFeeRepository.findById(id);

        if (findStudentFee.isPresent()) {
            studentFeeRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Student Fee not found with id: " + id);
        }
    }


}
