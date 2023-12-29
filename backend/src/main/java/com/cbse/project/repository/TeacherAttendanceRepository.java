package com.cbse.project.repository;

import com.cbse.project.model.Class;
import com.cbse.project.model.TeacherAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface TeacherAttendanceRepository extends JpaRepository<TeacherAttendance, Integer> {

    TeacherAttendance findByDate(Date date);

    @Query("SELECT s FROM TeacherAttendance s WHERE " +
            "s.myClass.id = :myClassId " +
            "AND s.date = :date "
    )
    List<TeacherAttendance> findByClassAndDate(Integer myClassId, Date date);

    TeacherAttendance findByTeacherIdAndMyClassIdAndDate(Integer teacherId, Integer myClassId, Date date);
}
