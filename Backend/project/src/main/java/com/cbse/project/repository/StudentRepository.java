package com.cbse.project.repository;

import com.cbse.project.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

    public Student findByName(String name);

    public Student findByParentName(String parentName);

    public List<Student> findByGender(String gender);
}
