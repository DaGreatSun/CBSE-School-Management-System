package com.cbse.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    @NotBlank(message = "Class name cannot be null or blank")
    private String name;

    @NotNull
    @NotBlank(message = "Class code cannot be null or blank")
    private String code;

    @NotNull(message = "Class code cannot be null or blank")
    private Integer fee;

    @ManyToMany
    @JoinTable(
        name = "class_student", 
        joinColumns = @JoinColumn(name = "class_id"), 
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> studentList = new ArrayList<>();
}
