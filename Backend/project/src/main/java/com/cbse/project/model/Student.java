package com.cbse.project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    @NotBlank(message = "Student's name cannot be null or blank")
    private String name;

    @NotNull
    @NotBlank(message = "Gender cannot be null or blank")
    private String gender;

    @NotNull
    @NotBlank(message = "Age cannot be null or blank")
    private Integer age;

    @NotNull
    @NotBlank(message = "Parent's name cannot be null or blank")
    private String parentName;

    @NotNull
    @NotBlank(message = "Contact number cannot be null or blank")
    private String contactNo;

    @NotNull
    @NotBlank(message = "Address name cannot be null or blank")
    private String address;

    private String email;

    @ManyToOne
    private Class myClass;
}
