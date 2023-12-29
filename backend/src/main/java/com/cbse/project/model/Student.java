package com.cbse.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Student's name cannot be null or blank")
    private String name;

    @NotNull
    @NotBlank(message = "Gender cannot be null or blank")
    private String gender;

    @NotNull
    private Integer age;

    @NotNull
    @NotBlank(message = "Parent's name cannot be null or blank")
    private String parentName;

    @NotNull
    @NotBlank(message = "Contact number cannot be null or blank")
    private String contactNo;

    @NotNull
    @NotBlank(message = "Address cannot be null or blank")
    private String address;

    @Email
    @NotNull
    @NotBlank(message = "Email address cannot be null or blank")
    private String email;

    @NotNull
    private Integer classId;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;
}
