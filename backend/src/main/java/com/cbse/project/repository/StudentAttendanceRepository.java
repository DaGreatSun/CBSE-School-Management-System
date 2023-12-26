package com.cbse.project.repository;

import com.cbse.project.model.StudentAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, Integer> {

    List<StudentAttendance> findByClassEntityIdAndDate(Integer classId, Date date);

    StudentAttendance findByClassEntityIdAndDateAndStudentId(Integer classId, Date date, Integer studentId);
}
