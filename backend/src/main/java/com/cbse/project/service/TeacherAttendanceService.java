package com.cbse.project.service;

import com.cbse.project.model.Student;
import com.cbse.project.model.TeacherAttendance;

import java.sql.Date;
import java.util.List;


public interface TeacherAttendanceService {
    TeacherAttendance getTeacherAttendance(Integer classId, String date);

    TeacherAttendance addTeacherAttendance(Integer teacherId, Integer classId, String date);

    void removeTeacherAttendance(Integer teacherId, Integer classId, String date);
}
