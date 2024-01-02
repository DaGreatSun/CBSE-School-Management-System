package com.cbse.project.service;

import com.cbse.project.model.StaffSalary;
import com.cbse.project.model.StaffSalaryDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import java.util.List;

public interface StaffSalaryService {

    StaffSalary updateStaffSalary(StaffSalary salary);
    StaffSalary getStaffSalary(Integer staffId);
    List<StaffSalaryDTO> getAllStaffSalaries();
    List<StaffSalaryDTO> findByStaffName(String name);
    PaymentIntent createPaymentIntent(Integer salaryId, Long amount) throws StripeException;
}
