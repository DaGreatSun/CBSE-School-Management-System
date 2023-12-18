package com.cbse.project.repository;

import com.cbse.project.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Integer> {

    Teacher findByName(String name);

    @Query("SELECT s FROM Teacher s WHERE " +
            "s.name LIKE CONCAT('%', :keyword, '%')" +
            "OR s.gender LIKE CONCAT('%', :keyword, '%')" +
            "OR s.qualification LIKE CONCAT('%', :keyword, '%')" +
            "OR s.position LIKE CONCAT('%', :keyword, '%')" +
            "OR s.contactNo LIKE CONCAT('%', :keyword, '%')" +
            "OR s.address LIKE CONCAT('%', :keyword, '%')" +
            "OR s.email LIKE CONCAT('%', :keyword, '%')")
    List<Teacher> filterTeachers(String keyword);
}