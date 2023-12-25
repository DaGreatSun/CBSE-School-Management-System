package com.cbse.project.service;

import com.cbse.project.model.TeacherSalary;
import com.cbse.project.model.TeacherSalaryDTO;
import com.cbse.project.model.Teacher;
import com.cbse.project.repository.TeacherSalaryRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.cbse.project.repository.TeacherRepository;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


@Service
public class TeacherSalaryServiceImpl implements TeacherSalaryService {

    @Autowired
    TeacherSalaryRepository teacherSalaryRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @Value("${stripe.apiKey}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Override
    public TeacherSalary updateTeacherSalary(TeacherSalary salary) {
        Optional<TeacherSalary> existingSalaryOpt = teacherSalaryRepository.findById(salary.getId());
        System.out.println(salary.getId());

        if (existingSalaryOpt.isPresent()) {
            TeacherSalary existingSalary = existingSalaryOpt.get();

            existingSalary.setBasicPay(salary.getBasicPay());
            existingSalary.setBonuses(salary.getBonuses());
            existingSalary.setDeductions(salary.getDeductions());

            BigDecimal netPay = salary.getBasicPay().add(salary.getBonuses()).subtract(salary.getDeductions());
            existingSalary.setNetPay(netPay);

            return teacherSalaryRepository.save(existingSalary);
        } else {
            throw new IllegalArgumentException("Teacher Salary not found with id: " + salary.getId());
        }
    }

    @Override
    public TeacherSalary getTeacherSalary(Integer teacherId) {
        return teacherSalaryRepository.findById(teacherId)
                .orElseThrow(() -> new EntityNotFoundException("Teacher Salary not found for id: " + teacherId));
    }

    @Override
    public List<TeacherSalaryDTO> getAllTeacherSalaries() {
        return teacherSalaryRepository.findAllTeacherSalaries();
    }
    
    @Override
    public List<TeacherSalaryDTO> findByTeacherName(String name) {
        return teacherSalaryRepository.findByTeacherName(name);
    }

    @Override
    public PaymentIntent createPaymentIntent(Integer salaryId, Long amount) {
        TeacherSalary salary = getTeacherSalary(salaryId);
        Teacher teacher = salary.getTeacher();
        amount = amount*100;

        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency("myr")
                    .build();
    
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            paymentIntent.getMetadata().put("teacherId", teacher.getId().toString());
            paymentIntent.getMetadata().put("salaryId", salary.getId().toString());
    
            return paymentIntent;
        } catch (StripeException e) {
            System.err.println("Stripe API error: " + e.getMessage());
            throw new RuntimeException("Failed to create payment intent", e);
        }
    }
    
}
