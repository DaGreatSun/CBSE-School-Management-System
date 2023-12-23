package com.cbse.project.service;

import com.cbse.project.model.Student;
import com.cbse.project.model.TeacherAttendance;
import com.cbse.project.repository.ClassRepository;
import com.cbse.project.repository.StudentRepository;
import com.cbse.project.repository.TeacherAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TeacherAttendanceServiceImpl implements TeacherAttendanceService {

    @Autowired
    ClassRepository classRepository;

    @Autowired
    TeacherAttendanceRepository teacherAttendanceRepository;

    @Override
    public List<TeacherAttendance> getTeacherAttendance(Integer myClass, Date date) {
        return null;
    }
}
