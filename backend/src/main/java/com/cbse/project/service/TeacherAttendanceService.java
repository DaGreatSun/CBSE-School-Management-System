package com.cbse.project.service;

import com.cbse.project.model.Student;
import com.cbse.project.model.TeacherAttendance;

import java.sql.Date;
import java.util.List;


public interface TeacherAttendanceService {
    List<TeacherAttendance> getTeacherAttendance(Integer myClass, Date date);
}
