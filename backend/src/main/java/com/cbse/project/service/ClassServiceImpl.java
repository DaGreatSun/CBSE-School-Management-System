package com.cbse.project.service;

import com.cbse.project.model.Class;
import com.cbse.project.model.Student;
import com.cbse.project.repository.ClassRepository;
import com.cbse.project.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClassServiceImpl implements ClassService {

    @Autowired
    ClassRepository classRepository;
    @Autowired
    StudentRepository studentRepository;

    @Override
    public List<Class> viewAllClasses() throws Exception {
        List<Class> classList = classRepository.findAll();

        if (classList.isEmpty()) {
            throw new Exception("No class has been found. Try again later");
        }

        return classList;
    }

    @Override
    public List<Class> getAllClasses() {
        return classRepository.findAll();
    }

    @Override
    public Class getClassById(Integer id) {
        return classRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Class not found"));
    }

    @Override
    public Class createClass(Class newClass) {
        return classRepository.save(newClass);
    }

    @Override
    public Class updateClass(Integer id, Class classDetails) {
        Class existingClass = getClassById(id);
        
        if (classDetails.getName() != null) {
            existingClass.setName(classDetails.getName());
        }
        
        if (classDetails.getCode() != null) {
            existingClass.setCode(classDetails.getCode());
        }
        
        if (classDetails.getFee() != null) {
            existingClass.setFee(classDetails.getFee());
        }
        
        if (classDetails.getTeacherId() != null) {
            existingClass.setTeacherId(classDetails.getTeacherId());
        }
        
        return classRepository.save(existingClass);
    }

    @Override
    public void deleteClass(Integer id) {
        classRepository.deleteById(id);
    }

    @Override
    public List<Student> getStudentsInClass(Integer classId) {
        Class myClass = getClassById(classId);
        return new ArrayList<>(myClass.getStudentList());
    }

    @Override
    public Class addStudentsToClass(Integer classId, List<Integer> studentIds) {
        Class myClass = getClassById(classId);
    
        for (Integer studentId : studentIds) {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new EntityNotFoundException("Student not found"));
    
            // Check if the student is not already in the class
            if (!myClass.getStudentList().contains(student)) {
                myClass.getStudentList().add(student);
                student.setClassId(myClass.getId());
                studentRepository.save(student);
            }
        }
    
        return classRepository.save(myClass);
    }

    @Override
    public Class removeStudentsFromClass(Integer classId, List<Integer> studentIds) {
        Class myClass = getClassById(classId);
    
        for (Integer studentId : studentIds) {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new EntityNotFoundException("Student not found"));
    
            if (myClass.getStudentList().contains(student)) {
                myClass.getStudentList().remove(student);
            }
        }
    
        return classRepository.save(myClass);
    }

}
