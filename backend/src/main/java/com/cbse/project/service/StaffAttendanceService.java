package com.cbse.project.service;

import com.cbse.project.model.StaffAttendance;

import java.util.List;


public interface StaffAttendanceService {
    List<StaffAttendance> getStaffAttendance(String keyword, String date);

    StaffAttendance addStaffAttendance(Integer staffId, String date);

    void removeStaffAttendance(Integer staffId, String date);
}
