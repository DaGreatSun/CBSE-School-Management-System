package com.cbse.project.service;

import com.cbse.project.model.TeacherSalary;
import com.cbse.project.model.TeacherSalaryDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import java.util.List;

public interface TeacherSalaryService {

    TeacherSalary updateTeacherSalary(TeacherSalary salary);
    TeacherSalary getTeacherSalary(Integer teacherId);
    List<TeacherSalaryDTO> getAllTeacherSalaries();
    List<TeacherSalaryDTO> findByTeacherName(String name);
    PaymentIntent createPaymentIntent(Integer salaryId, Long amount) throws StripeException;
}
