package com.cbse.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class TeacherAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotBlank
    @NotNull
    @JsonIgnore
    @ManyToOne
    private Class myClass;

    @NotBlank
    @NotNull
    @JsonIgnore
    @ManyToOne
    private Teacher teacher;

    @NotNull
    @NotBlank(message = "Date cannot be null or blank")
    private Date date;

    @NotNull
    @NotBlank(message = "present")
    private boolean present;

}
