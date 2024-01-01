package com.cbse.project.repository;

import com.cbse.project.model.StudentFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface StudentFeeRepository extends JpaRepository<StudentFee, Integer> {

    List<StudentFee> findByStud_Id(Integer studId);

    List<StudentFee> findByCreatedDateGreaterThanEqualAndCreatedDateLessThanEqual(LocalDateTime startDate, LocalDateTime endDate);

//    StudentFee findByStudentId(String name);
//
//    @Query("SELECT s FROM StudentId WHERE " +
//            "s.name LIKE CONCAT('%', :keyword, '%')" +
//            "OR s.paidDate LIKE CONCAT('%', :keyword, '%')" +
//            "OR s.class LIKE CONCAT('%', :keyword, '%')"
//    )
//    List<StudentFee> filterClassFee(String keyword);
}
