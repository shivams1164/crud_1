package com.hrms.repository;

import com.hrms.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByEmployeeId(String employeeId);
    List<Employee> findByDepartment(String department);
    List<Employee> findByStatus(String status);
}

@Repository
public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {
    Optional<PersonalDetails> findByEmployee(Employee employee);
}

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByEmployee(Employee employee);
}

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findByEmployee(Employee employee);
}

@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Long> {
    List<Employment> findByEmployee(Employee employee);
}

@Repository
public interface FamilyMemberRepository extends JpaRepository<FamilyMember, Long> {
    List<FamilyMember> findByEmployee(Employee employee);
}

@Repository
public interface BankDetailsRepository extends JpaRepository<BankDetails, Long> {
    Optional<BankDetails> findByEmployee(Employee employee);
}

@Repository
public interface PFDetailsRepository extends JpaRepository<PFDetails, Long> {
    Optional<PFDetails> findByEmployee(Employee employee);
}

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByEmployee(Employee employee);
}

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByEmployee(Employee employee);
}
