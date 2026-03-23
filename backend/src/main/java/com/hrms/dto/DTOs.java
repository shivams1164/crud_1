package com.hrms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// Employee DTOs
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String employeeId;
    private String designation;
    private String department;
    private String dateOfJoining;
    private String status;
    private String profilePhotoUrl;
    private PersonalDetailsDTO personalDetails;
    private List<AddressDTO> addresses;
    private List<EducationDTO> education;
    private List<EmploymentDTO> employment;
    private List<FamilyMemberDTO> family;
    private BankDetailsDTO bankDetails;
    private PFDetailsDTO pfDetails;
    private List<DocumentDTO> documents;
    private List<AssetDTO> assets;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateEmployeeDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String employeeId;
    private String designation;
    private String department;
    private String dateOfJoining;
    private String status;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalDetailsDTO {
    private Long id;
    private String dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String maritalStatus;
    private String nationality;
    private String aadharNumber;
    private String panNumber;
    private String passportNumber;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDTO {
    private Long id;
    private String type;
    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    private Boolean isPrimary;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationDTO {
    private Long id;
    private String degree;
    private String fieldOfStudy;
    private String school;
    private String startDate;
    private String endDate;
    private String description;
    private String certificateUrl;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmploymentDTO {
    private Long id;
    private String jobTitle;
    private String department;
    private String startDate;
    private String endDate;
    private Boolean isCurrentJob;
    private String reportingManager;
    private Double salary;
    private String employmentType;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FamilyMemberDTO {
    private Long id;
    private String name;
    private String relationship;
    private String dateOfBirth;
    private String mobileNumber;
    private String dependentStatus;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankDetailsDTO {
    private Long id;
    private String accountHolderName;
    private String accountNumber;
    private String ifscCode;
    private String bankName;
    private String branchName;
    private String accountType;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PFDetailsDTO {
    private Long id;
    private String uan;
    private String pfNumber;
    private String pfJoiningDate;
    private Double employeeContribution;
    private Double employerContribution;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentDTO {
    private Long id;
    private String type;
    private String fileName;
    private String fileUrl;
    private String expiryDate;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetDTO {
    private Long id;
    private String type;
    private String serialNumber;
    private String allocationDate;
    private String notes;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
}
