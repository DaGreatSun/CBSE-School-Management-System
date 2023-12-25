package com.cbse.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class TeacherSalaryDTO {
    private Integer id;
    private String teacherName;
    private BigDecimal basicPay;
    private BigDecimal bonuses;
    private BigDecimal deductions;
    private BigDecimal netPay;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
