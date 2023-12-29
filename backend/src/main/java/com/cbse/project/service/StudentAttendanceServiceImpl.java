package com.cbse.project.service;

import com.cbse.project.model.Class;
import com.cbse.project.model.Student;
import com.cbse.project.model.StudentAttendance;
import com.cbse.project.repository.ClassRepository;
import com.cbse.project.repository.StudentAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class StudentAttendanceServiceImpl implements StudentAttendanceService {

    @Autowired
    ClassRepository classRepository;

    @Autowired
    StudentAttendanceRepository studentAttendanceRepository;

    @Override
    public List<StudentAttendance> getAttendanceByClassIdAndDate(Integer classId, Date date) {
        List<Student> studentList = classRepository.findById(classId).orElseThrow().getStudentList();
        List<StudentAttendance> studentAttendanceList = studentAttendanceRepository.findByClassEntityIdAndDate(classId, date);

        for (Student student : studentList) {
            boolean found = studentAttendanceList.stream().anyMatch(studentAttendance ->
                    Objects.equals(studentAttendance.getStudent().getId(), student.getId()));

            if (!found) {
                StudentAttendance sa = new StudentAttendance();

                sa.setDate(date);
                sa.setPresent(false);
                sa.setStudent(student);

                studentAttendanceList.add(sa);
            }
        }

        studentAttendanceList.sort(Comparator.comparing(studentAttendance -> studentAttendance.getStudent().getId()));

        return studentAttendanceList;
    }

    @Override
    public StudentAttendance createAttendance(Integer classId, StudentAttendance sa) {
        try {
            Optional<Class> classEntity = classRepository.findById(classId);
            classEntity.ifPresent(sa::setClassEntity);

            return studentAttendanceRepository.save(sa);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @Override
    public void deleteAttendance(Integer classId, Date date, Integer studentId) {
        StudentAttendance sa = studentAttendanceRepository.findByClassEntityIdAndDateAndStudentId(classId, date, studentId);

        if (sa.isPresent()) {
            studentAttendanceRepository.delete(sa);
        } else {
            throw new IllegalArgumentException("Student Attendance not found with class(" + sa.getClassEntity().getName() + "), date(" + date + ") and student id(" + studentId + ")");
        }
    }
}
