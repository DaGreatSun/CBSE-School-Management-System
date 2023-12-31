package com.cbse.project.controller;

import com.cbse.project.model.StaffSalary;
import com.cbse.project.model.StaffSalaryDTO;
import com.cbse.project.model.Staff;
import com.cbse.project.service.StaffSalaryService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/api/staff-salary")
public class StaffSalaryController {

    @Autowired
    private StaffSalaryService staffSalaryService;

    @GetMapping
    public ResponseEntity<List<StaffSalaryDTO>> getAllStaffSalaries() {
        try {
            List<StaffSalaryDTO> allSalariesDTO = staffSalaryService.getAllStaffSalaries();
            return new ResponseEntity<>(allSalariesDTO, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<StaffSalary> getStaffSalary(@PathVariable Integer id) {
        try {
            StaffSalary salary = staffSalaryService.getStaffSalary(id);
            return new ResponseEntity<>(salary, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PutMapping
    public ResponseEntity<StaffSalary> updateStaffSalary(@RequestBody @Valid StaffSalary salary) {
        try {
            StaffSalary updatedSalary = staffSalaryService.updateStaffSalary(salary);
            return new ResponseEntity<>(updatedSalary, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<StaffSalaryDTO>> findSalariesByStaffName(@PathVariable String name) {
        try {
            List<StaffSalaryDTO> allSalariesDTO = staffSalaryService.findByStaffName(name);
            return new ResponseEntity<>(allSalariesDTO, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PostMapping("/pay/{salaryId}/{amount}")
    public ResponseEntity<?> createPaymentIntent(@PathVariable Integer salaryId, @PathVariable Long amount) {
        try {
            PaymentIntent paymentIntent = staffSalaryService.createPaymentIntent(salaryId, amount);
            StaffSalary salary = staffSalaryService.getStaffSalary(salaryId);
            Staff staff = salary.getStaff();

            Map<String, Object> response = new HashMap<>();
            response.put("client_secret", paymentIntent.getClientSecret());
            response.put("staff", staff);
            response.put("salary", salary);

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            System.err.println("Stripe API error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment failed", e);
        }
    }

}
