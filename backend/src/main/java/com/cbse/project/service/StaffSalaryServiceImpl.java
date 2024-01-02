package com.cbse.project.service;

import com.cbse.project.model.StaffSalary;
import com.cbse.project.model.StaffSalaryDTO;
import com.cbse.project.model.Staff;
import com.cbse.project.repository.StaffSalaryRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.cbse.project.repository.StaffRepository;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


@Service
public class StaffSalaryServiceImpl implements StaffSalaryService {

    @Autowired
    StaffSalaryRepository staffSalaryRepository;

    @Autowired
    StaffRepository staffRepository;

    @Value("${stripe.apiKey}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Override
    public StaffSalary updateStaffSalary(StaffSalary salary) {
        Optional<StaffSalary> existingSalaryOpt = staffSalaryRepository.findById(salary.getId());
        System.out.println(salary.getId());

        if (existingSalaryOpt.isPresent()) {
            StaffSalary existingSalary = existingSalaryOpt.get();

            existingSalary.setBasicPay(salary.getBasicPay());
            existingSalary.setBonuses(salary.getBonuses());
            existingSalary.setDeductions(salary.getDeductions());

            BigDecimal netPay = salary.getBasicPay().add(salary.getBonuses()).subtract(salary.getDeductions());
            existingSalary.setNetPay(netPay);

            return staffSalaryRepository.save(existingSalary);
        } else {
            throw new IllegalArgumentException("Staff Salary not found with id: " + salary.getId());
        }
    }

    @Override
    public StaffSalary getStaffSalary(Integer staffId) {
        return staffSalaryRepository.findById(staffId)
                .orElseThrow(() -> new EntityNotFoundException("Staff Salary not found for id: " + staffId));
    }

    @Override
    public List<StaffSalaryDTO> getAllStaffSalaries() {
        return staffSalaryRepository.findAllStaffSalaries();
    }
    
    @Override
    public List<StaffSalaryDTO> findByStaffName(String name) {
        return staffSalaryRepository.findByStaffName(name);
    }

    @Override
    public PaymentIntent createPaymentIntent(Integer salaryId, Long amount) {
        StaffSalary salary = getStaffSalary(salaryId);
        Staff staff = salary.getStaff();
        amount = amount*100;

        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency("myr")
                    .build();
    
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            paymentIntent.getMetadata().put("staffId", staff.getId().toString());
            paymentIntent.getMetadata().put("salaryId", salary.getId().toString());
    
            return paymentIntent;
        } catch (StripeException e) {
            System.err.println("Stripe API error: " + e.getMessage());
            throw new RuntimeException("Failed to create payment intent", e);
        }
    }
    
}
