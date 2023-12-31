package com.cbse.project.repository;

import com.cbse.project.model.StaffSalary;
import com.cbse.project.model.StaffSalaryDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffSalaryRepository extends JpaRepository<StaffSalary, Integer> {

    @Query("SELECT new com.cbse.project.model.StaffSalaryDTO(ts.id, ts.staff.name, ts.basicPay, ts.bonuses, ts.deductions, ts.netPay, ts.createdDate, ts.lastModifiedDate) FROM StaffSalary ts WHERE ts.staff.name LIKE CONCAT('%', :name, '%')")
    List<StaffSalaryDTO> findByStaffName(@Param("name") String name);

    @Query("SELECT new com.cbse.project.model.StaffSalaryDTO(ts.id, t.name, ts.basicPay, ts.bonuses, ts.deductions, ts.netPay, ts.createdDate, ts.lastModifiedDate) FROM StaffSalary ts JOIN ts.staff t")
    List<StaffSalaryDTO> findAllStaffSalaries();

    Optional<StaffSalary> findByStaffId(Integer staffId);

    void deleteByStaffId(Integer staffId);
}
