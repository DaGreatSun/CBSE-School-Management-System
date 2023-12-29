package com.cbse.project.service;

import com.cbse.project.model.*;
import com.cbse.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.*;

@Service
public class StaffAttendanceServiceImpl implements StaffAttendanceService {

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    StaffAttendanceRepository staffAttendanceRepository;

    @Override
    public List<StaffAttendance> getStaffAttendance(String keyword, String date) {
        try {
            System.out.println(date);
            Date date_ = stringToDate(date);
            List<Staff> staffList = staffRepository.filterStaffs(keyword);
            List<StaffAttendance> staffAttendances = keyword.equals("") ?
                    staffAttendanceRepository.findByDate(date_) :
                    staffAttendanceRepository.filterByKeywordAndDate(keyword, date_);
            System.out.println(staffAttendances);

            StaffAttendance teacherAttendance = new StaffAttendance();

            for (Staff staff : staffList) {
                boolean found = staffAttendances.stream().anyMatch(staffAttendance ->
                        Objects.equals(staffAttendance.getStaff().getId(), staff.getId()));

                if (!found) {
                    StaffAttendance staffAttendance = new StaffAttendance();

                    staffAttendance.setDate(date_);
                    staffAttendance.setPresent(false);
                    staffAttendance.setStaff(staff);

                    staffAttendances.add(staffAttendance);
                }
            }

            staffAttendances.sort(Comparator.comparing(staffAttendance -> staffAttendance.getStaff().getName()));

            return staffAttendances;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while getting teacher attendance", e);
        }
    }

    @Override
    public StaffAttendance addStaffAttendance(Integer staffId, String date) {
        try {
            StaffAttendance staffAttendance = new StaffAttendance();
            staffAttendance.setPresent(true);
            staffAttendance.setDate(stringToDate(date));

            Optional<Staff> staff = staffRepository.findById(staffId);
            staff.ifPresent(staffAttendance::setStaff);

            return staffAttendanceRepository.save(staffAttendance);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @Override
    public void removeStaffAttendance(Integer staffId, String date) {
        StaffAttendance staffAttendance = staffAttendanceRepository.findByStaffIdAndDate(staffId, stringToDate(date));

        if (staffAttendance.isPresent()) {
            staffAttendanceRepository.delete(staffAttendance);
        } else {
            throw new IllegalArgumentException("Staff Attendance not found with name(" + staffAttendance.getStaff().getName() + ") and date(" + date + ")");
        }
    }

    private Date stringToDate(String date) {
        List<Integer> dateArr = Arrays.stream(date.split("-")).map(Integer::parseInt).toList();
        return new Date(dateArr.get(0) - 1900 , dateArr.get(1) - 1, dateArr.get(2));
    }
}
