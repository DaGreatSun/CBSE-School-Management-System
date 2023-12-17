package com.cbse.project.service;

import com.cbse.project.model.Teacher;
import com.cbse.project.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    TeacherRepository teacherRepository;

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
            // Perform additional business logic/validation here
            return teacherRepository.save(teacher);
        } catch (DataIntegrityViolationException e) {
            // Handle specific exceptions (e.g., unique constraint violation)
            throw new IllegalArgumentException("Teacher with the same name already exists");
        } catch (Exception e) {
            // Handle other exceptions
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
            teacherRepository.deleteById(teacherId);
        } else {
            throw new IllegalArgumentException("Teache not found with id: " + teacherId);
        }
    }

}