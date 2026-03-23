package com.hrms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobTitle;
    private String department;
    private String startDate;
    private String endDate;

    @Column(nullable = false)
    private Boolean isCurrentJob = false;

    private String reportingManager;
    private Double salary;
    private String employmentType;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
}
