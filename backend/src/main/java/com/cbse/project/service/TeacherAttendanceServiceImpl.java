package com.cbse.project.service;

import com.cbse.project.model.*;
import com.cbse.project.model.Class;
import com.cbse.project.repository.ClassRepository;
import com.cbse.project.repository.TeacherAttendanceRepository;
import com.cbse.project.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherAttendanceServiceImpl implements TeacherAttendanceService {

    @Autowired
    ClassRepository classRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    TeacherAttendanceRepository teacherAttendanceRepository;

    @Override
    public TeacherAttendance getTeacherAttendance(Integer classId, String date) {
        try {
            Date date_ = stringToDate(date);

            TeacherAttendance teacherAttendance = new TeacherAttendance();
            List<TeacherAttendance> teacherAttendances = teacherAttendanceRepository.findByClassAndDate(classId, date_);

            if (teacherAttendances.isEmpty()) {
                Optional<Class> classEntity = classRepository.findById(classId);
                if (classEntity.isPresent()) {
                    Integer teacherId = classEntity.get().getTeacherId();
                    Optional<Teacher> teacher = teacherRepository.findById(teacherId);
                    teacher.ifPresent(teacherAttendance::setTeacher);
                }

                teacherAttendance.setDate(date_);
                teacherAttendance.setPresent(false);

                return teacherAttendance;
            } else {
                return teacherAttendances.get(0);
            }
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while getting teacher attendance", e);
        }
    }

    @Override
    public TeacherAttendance addTeacherAttendance(Integer teacherId, Integer classId, String date) {
        try {
            TeacherAttendance teacherAttendance = new TeacherAttendance();
            teacherAttendance.setPresent(true);
            teacherAttendance.setDate(stringToDate(date));

            Optional<Class> classEntity = classRepository.findById(classId);
            classEntity.ifPresent(teacherAttendance::setMyClass);

            Optional<Teacher> teacher = teacherRepository.findById(teacherId);
            teacher.ifPresent(teacherAttendance::setTeacher);

            return teacherAttendanceRepository.save(teacherAttendance);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @Override
    public void removeTeacherAttendance(Integer teacherId, Integer classId, String date) {
        TeacherAttendance teacherAttendance = teacherAttendanceRepository.findByTeacherIdAndMyClassIdAndDate(teacherId, classId, stringToDate(date));

        if (teacherAttendance.isPresent()) {
            teacherAttendanceRepository.delete(teacherAttendance);
        } else {
            throw new IllegalArgumentException("Student Attendance not found with class(" + teacherAttendance.getMyClass().getName() + "), date(" + date + ") and teacher id(" + teacherId + ")");
        }
    }

    private Date stringToDate(String date) {
        List<Integer> dateArr = Arrays.stream(date.split("-")).map(Integer::parseInt).toList();
        return new Date(dateArr.get(0) - 1900 , dateArr.get(1) - 1, dateArr.get(2));
    }
}
