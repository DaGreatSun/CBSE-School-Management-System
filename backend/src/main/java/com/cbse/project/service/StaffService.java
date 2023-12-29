package com.cbse.project.service;

import com.cbse.project.model.Staff;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface StaffService {

    List<Staff> viewAllStaffs();
    List<Staff> filterStaffs(String keyword);
    Staff getStaff(Integer staffId);
    Staff createStaff(Staff staff);
    Staff updateStaff(Staff staff);
    void deleteStaff(Integer staffId);
}