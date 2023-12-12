package com.cbse.project.repository;

import com.cbse.project.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

    Student findByName(String name);

    @Query("SELECT s FROM Student s WHERE " +
            "s.name LIKE CONCAT('%', :keyword, '%')" +
            "OR s.gender LIKE CONCAT('%', :keyword, '%')" +
            "OR s.parentName LIKE CONCAT('%', :keyword, '%')" +
            "OR s.contactNo LIKE CONCAT('%', :keyword, '%')" +
            "OR s.parentName LIKE CONCAT('%', :keyword, '%')" +
            "OR s.address LIKE CONCAT('%', :keyword, '%')" +
            "OR s.email LIKE CONCAT('%', :keyword, '%')"
    )
    List<Student> filterStudents(String keyword);
}
