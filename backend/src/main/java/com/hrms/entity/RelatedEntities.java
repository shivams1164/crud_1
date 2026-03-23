package com.hrms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// Personal Details
@Entity
@Table(name = "personal_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalDetails extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private String dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String maritalStatus;
    private String nationality;
    private String aadharNumber;
    private String panNumber;
    private String passportNumber;
}

// Address
@Entity
@Table(name = "addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class Address extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;

    @Column(nullable = false)
    private Boolean isPrimary = false;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
}

// Education
@Entity
@Table(name = "education")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class Education extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String degree;
    private String fieldOfStudy;
    private String school;
    private String startDate;
    private String endDate;
    private String description;
    private String certificateUrl;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
}

// Employment
@Entity
@Table(name = "employment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class Employment extends BaseEntity {
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

// Family Member
@Entity
@Table(name = "family_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class FamilyMember extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String relationship;
    private String dateOfBirth;
    private String mobileNumber;
    private String dependentStatus;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
}

// Bank Details
@Entity
@Table(name = "bank_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class BankDetails extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private String accountHolderName;
    private String accountNumber;
    private String ifscCode;
    private String bankName;
    private String branchName;
    private String accountType;
}

// PF Details
@Entity
@Table(name = "pf_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class PFDetails extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private String uan;
    private String pfNumber;
    private String pfJoiningDate;
    private Double employeeContribution;
    private Double employerContribution;
}

// Document
@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class Document extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String fileName;
    private String fileUrl;
    private String expiryDate;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
}

// Asset
@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class Asset extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String serialNumber;
    private String allocationDate;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
}
