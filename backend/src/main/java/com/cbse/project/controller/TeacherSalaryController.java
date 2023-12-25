package com.cbse.project.controller;

import com.cbse.project.model.TeacherSalary;
import com.cbse.project.model.TeacherSalaryDTO;
import com.cbse.project.model.Teacher;
import com.cbse.project.service.TeacherSalaryService;
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
@RequestMapping("/api/teacher-salary")
public class TeacherSalaryController {

    @Autowired
    private TeacherSalaryService teacherSalaryService;

    @GetMapping
    public ResponseEntity<List<TeacherSalaryDTO>> getAllTeacherSalaries() {
        try {
            List<TeacherSalaryDTO> allSalariesDTO = teacherSalaryService.getAllTeacherSalaries();
            return new ResponseEntity<>(allSalariesDTO, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherSalary> getTeacherSalary(@PathVariable Integer id) {
        try {
            TeacherSalary salary = teacherSalaryService.getTeacherSalary(id);
            return new ResponseEntity<>(salary, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PutMapping
    public ResponseEntity<TeacherSalary> updateTeacherSalary(@RequestBody @Valid TeacherSalary salary) {
        try {
            TeacherSalary updatedSalary = teacherSalaryService.updateTeacherSalary(salary);
            return new ResponseEntity<>(updatedSalary, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<TeacherSalaryDTO>> findSalariesByTeacherName(@PathVariable String name) {
        try {
            List<TeacherSalaryDTO> allSalariesDTO = teacherSalaryService.findByTeacherName(name);
            return new ResponseEntity<>(allSalariesDTO, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    @PostMapping("/pay/{salaryId}/{amount}")
    public ResponseEntity<?> createPaymentIntent(@PathVariable Integer salaryId, @PathVariable Long amount) {
        try {
            PaymentIntent paymentIntent = teacherSalaryService.createPaymentIntent(salaryId, amount);
            TeacherSalary salary = teacherSalaryService.getTeacherSalary(salaryId);
            Teacher teacher = salary.getTeacher();

            Map<String, Object> response = new HashMap<>();
            response.put("client_secret", paymentIntent.getClientSecret());
            response.put("teacher", teacher);
            response.put("salary", salary);

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            System.err.println("Stripe API error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment failed", e);
        }
    }

}
