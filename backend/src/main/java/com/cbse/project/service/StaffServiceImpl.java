package com.cbse.project.service;

import com.cbse.project.model.Staff;
import com.cbse.project.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    StaffRepository staffRepository;

    @Override
    public List<Staff> viewAllStaffs() {
        return staffRepository.findAll();
    }

    @Override
    public List<Staff> filterStaffs(String keyword) {
        return staffRepository.filterStaffs(keyword);
    }

    @Override
    public Staff getStaff(Integer staffId) {
        Optional<Staff> staff = staffRepository.findById(staffId);

        if (staff.isPresent()) {
            return staff.get();
        } else {
            throw new IllegalArgumentException("Staff not found with id: " + staffId);
        }
    }

    @Override
    public Staff createStaff(Staff staff) {
        try {
            // Perform additional business logic/validation here
            return staffRepository.save(staff);
        } catch (DataIntegrityViolationException e) {
            // Handle specific exceptions (e.g., unique constraint violation)
            throw new IllegalArgumentException("Staff with the same name already exists");
        } catch (Exception e) {
            // Handle other exceptions
            throw new RuntimeException("An error occurred while creating the staff", e);
        }
    }

    @Override
    public Staff updateStaff(Staff staff) {
        Optional<Staff> findStaff = staffRepository.findById(staff.getId());

        if (findStaff.isPresent()) {
            Staff existingStaff = findStaff.get();

            existingStaff.setName(staff.getName());
            existingStaff.setIc(staff.getIc());
            existingStaff.setGender(staff.getGender());
            existingStaff.setAge(staff.getAge());
            existingStaff.setQualification(staff.getQualification());
            existingStaff.setPosition(staff.getPosition());
            existingStaff.setContactNo(staff.getContactNo());
            existingStaff.setAddress(staff.getAddress());
            existingStaff.setEmail(staff.getEmail());

            return staffRepository.save(existingStaff);
        } else {
            throw new IllegalArgumentException("Staff not found with id: " + staff.getId());
        }
    }

    @Override
    public void deleteStaff(Integer staffId) {
        Optional<Staff> findStaff = staffRepository.findById(staffId);

        if (findStaff.isPresent()) {
            staffRepository.deleteById(staffId);
        } else {
            throw new IllegalArgumentException("Teache not found with id: " + staffId);
        }
    }

}