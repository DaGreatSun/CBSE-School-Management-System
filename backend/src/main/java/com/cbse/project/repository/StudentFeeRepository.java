package com.cbse.project.repository;

import com.cbse.project.model.StudentFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentFeeRepository extends JpaRepository<StudentFee, Integer> {

    List<StudentFee> findByStud_Id(Integer studId);

//    StudentFee findByStudentId(String name);
//
//    @Query("SELECT s FROM StudentId WHERE " +
//            "s.name LIKE CONCAT('%', :keyword, '%')" +
//            "OR s.paidDate LIKE CONCAT('%', :keyword, '%')" +
//            "OR s.class LIKE CONCAT('%', :keyword, '%')"
//    )
//    List<StudentFee> filterClassFee(String keyword);
}
