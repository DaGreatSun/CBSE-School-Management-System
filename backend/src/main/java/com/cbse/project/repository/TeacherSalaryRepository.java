package com.cbse.project.repository;

import com.cbse.project.model.TeacherSalary;
import com.cbse.project.model.TeacherSalaryDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherSalaryRepository extends JpaRepository<TeacherSalary, Integer> {

    @Query("SELECT new com.cbse.project.model.TeacherSalaryDTO(ts.id, ts.teacher.name, ts.basicPay, ts.bonuses, ts.deductions, ts.netPay, ts.createdDate, ts.lastModifiedDate) FROM TeacherSalary ts WHERE ts.teacher.name LIKE CONCAT('%', :name, '%')")
    List<TeacherSalaryDTO> findByTeacherName(@Param("name") String name);

    @Query("SELECT new com.cbse.project.model.TeacherSalaryDTO(ts.id, t.name, ts.basicPay, ts.bonuses, ts.deductions, ts.netPay, ts.createdDate, ts.lastModifiedDate) FROM TeacherSalary ts JOIN ts.teacher t")
    List<TeacherSalaryDTO> findAllTeacherSalaries();

    Optional<TeacherSalary> findByTeacherId(Integer teacherId);

    void deleteByTeacherId(Integer teacherId);
}
