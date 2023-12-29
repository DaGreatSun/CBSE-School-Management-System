package com.cbse.project.repository;

import com.cbse.project.model.StaffAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface StaffAttendanceRepository extends JpaRepository<StaffAttendance, Integer> {

    List<StaffAttendance> findByDate(Date date);

    @Query("SELECT s FROM StaffAttendance s WHERE " +
            "(s.staff.name LIKE CONCAT('%', :keyword, '%')" +
            "OR s.staff.gender LIKE CONCAT('%', :keyword, '%')" +
            "OR s.staff.qualification LIKE CONCAT('%', :keyword, '%')" +
            "OR s.staff.position LIKE CONCAT('%', :keyword, '%')" +
            "OR s.staff.contactNo LIKE CONCAT('%', :keyword, '%')" +
            "OR s.staff.address LIKE CONCAT('%', :keyword, '%')" +
            "OR s.staff.email LIKE CONCAT('%', :keyword, '%'))" +
            "AND s.date = :date "
    )
    List<StaffAttendance> filterByKeywordAndDate(String keyword, Date date);

    StaffAttendance findByStaffIdAndDate(Integer staffId, Date date);

}
