package com.cbse.project.service;

import com.cbse.project.model.Teacher;
import com.cbse.project.model.TeacherSalary;
import com.cbse.project.repository.TeacherRepository;
import com.cbse.project.repository.TeacherSalaryRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    private TeacherSalaryRepository teacherSalaryRepository;

    @Override
    public List<Teacher> viewAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public List<Teacher> filterTeachers(String keyword) {
        return teacherRepository.filterTeachers(keyword);
    }

    @Override
    public Teacher getTeacher(Integer teacherId) {
        Optional<Teacher> teacher = teacherRepository.findById(teacherId);

        if (teacher.isPresent()) {
            return teacher.get();
        } else {
            throw new IllegalArgumentException("Teacher not found with id: " + teacherId);
        }
    }

    @Override
    public Teacher createTeacher(Teacher teacher) {
        try {
            Teacher savedTeacher = teacherRepository.save(teacher);

            TeacherSalary newTeacherSalary = new TeacherSalary();
            newTeacherSalary.setTeacher(savedTeacher);
            newTeacherSalary.setBasicPay(BigDecimal.ZERO);
            newTeacherSalary.setBonuses(BigDecimal.ZERO);
            newTeacherSalary.setDeductions(BigDecimal.ZERO);
            newTeacherSalary.setNetPay(BigDecimal.ZERO);

            teacherSalaryRepository.save(newTeacherSalary);

            return savedTeacher;
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Teacher with the same name already exists");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while creating the teacher", e);
        }
    }

    @Override
    public Teacher updateTeacher(Teacher teacher) {
        Optional<Teacher> findTeacher = teacherRepository.findById(teacher.getId());

        if (findTeacher.isPresent()) {
            Teacher existingTeacher = findTeacher.get();

            existingTeacher.setName(teacher.getName());
            existingTeacher.setIc(teacher.getIc());
            existingTeacher.setGender(teacher.getGender());
            existingTeacher.setAge(teacher.getAge());
            existingTeacher.setQualification(teacher.getQualification());
            existingTeacher.setPosition(teacher.getPosition());
            existingTeacher.setContactNo(teacher.getContactNo());
            existingTeacher.setAddress(teacher.getAddress());
            existingTeacher.setEmail(teacher.getEmail());

            return teacherRepository.save(existingTeacher);
        } else {
            throw new IllegalArgumentException("Teacher not found with id: " + teacher.getId());
        }
    }

    @Override
    public void deleteTeacher(Integer teacherId) {
        Optional<Teacher> findTeacher = teacherRepository.findById(teacherId);

        if (findTeacher.isPresent()) {
            Optional<TeacherSalary> teacherSalaryOpt = teacherSalaryRepository.findByTeacherId(teacherId);
            teacherSalaryOpt.ifPresent(teacherSalaryRepository::delete);
            teacherRepository.deleteById(teacherId);
        } else {
            throw new IllegalArgumentException("Teacher not found with id: " + teacherId);
        }
    }

}