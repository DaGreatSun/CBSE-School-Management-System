package com.cbse.project.service;

import com.cbse.project.model.StudentAttendance;

import java.util.Date;
import java.util.List;

public interface StudentAttendanceService {

    List<StudentAttendance> getAttendanceByClassIdAndDate(Integer classId, Date date);

    StudentAttendance createAttendance(Integer classId, StudentAttendance studentAttendance);

    void deleteAttendance(Integer classId, Date date, Integer studentId);
}
