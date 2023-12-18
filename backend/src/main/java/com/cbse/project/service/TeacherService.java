package com.cbse.project.service;

import com.cbse.project.model.Teacher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface TeacherService {

    List<Teacher> viewAllTeachers();
    List<Teacher> filterTeachers(String keyword);
    Teacher getTeacher(Integer teacherId);
    Teacher createTeacher(Teacher teacher);
    Teacher updateTeacher(Teacher teacher);
    void deleteTeacher(Integer teacherId);
}