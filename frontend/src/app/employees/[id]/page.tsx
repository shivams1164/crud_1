// Employee profile detail page
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { EmployeeProfileHeader } from "@/components/employee/EmployeeProfileHeader";
import { OverviewTab } from "@/components/employee/OverviewTab";
import { PersonalDetailsTab } from "@/components/employee/PersonalDetailsTab";
import { AddressTab } from "@/components/employee/AddressTab";
import { EducationTab } from "@/components/employee/EducationTab";
import { EmploymentTab } from "@/components/employee/EmploymentTab";
import { FamilyTab, BankPFTab, DocumentsTab, AssetsTab } from "@/components/employee/OtherTabs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { employeeApi } from "@/lib/api";
import type { Employee } from "@/types/employee";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function EmployeeDetailPage() {
  const params = useParams();
  const employeeId = params.id as string;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock employee data
  const mockEmployee: Employee = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    employeeId: "EMP001",
    designation: "Senior Software Engineer",
    department: "Engineering",
    dateOfJoining: "2022-01-15",
    status: "ACTIVE",
    profilePhotoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    personalDetails: {
      id: "1",
      dateOfBirth: "1990-05-20",
      gender: "MALE",
      bloodGroup: "O+",
      maritalStatus: "MARRIED",
      nationality: "Indian",
      aadharNumber: "123456789012",
      panNumber: "ABCDE1234F",
    },
    addresses: [
      {
        id: "1",
        type: "PERMANENT",
        street: "123 Main St",
        city: "Bangalore",
        state: "KA",
        country: "India",
        zipCode: "560001",
        isPrimary: true,
      },
    ],
    education: [
      {
        id: "1",
        degree: "B.Tech",
        fieldOfStudy: "Computer Science",
        school: "IIT Bangalore",
        startDate: "2012-06-01",
        endDate: "2016-05-31",
        description: "First Class with Distinction",
      },
    ],
    employment: [
      {
        id: "1",
        jobTitle: "Senior Software Engineer",
        department: "Engineering",
        startDate: "2022-01-15",
        isCurrentJob: true,
        reportingManager: "Alice Johnson",
        salary: 1200000,
        employmentType: "FULL_TIME",
      },
    ],
    family: [
      {
        id: "1",
        name: "Sarah Doe",
        relationship: "SPOUSE",
        dateOfBirth: "1992-08-10",
        dependentStatus: "DEPENDENT",
      },
    ],
    bankDetails: {
      id: "1",
      accountHolderName: "John Doe",
      accountNumber: "9876543210123456",
      ifscCode: "ICIC0000001",
      bankName: "ICICI Bank",
      branchName: "Bangalore Main",
      accountType: "SAVINGS",
    },
    pfDetails: {
      id: "1",
      uan: "123456789012",
      pfNumber: "KA/12345/123456",
      pfJoiningDate: "2022-01-15",
      employeeContribution: 12000,
      employerContribution: 12000,
    },
    documents: [
      {
        id: "1",
        type: "AADHAAR",
        fileName: "Aadhaar.pdf",
        fileUrl: "#",
        uploadedAt: "2022-01-15",
      },
    ],
    assets: [
      {
        id: "1",
        type: "LAPTOP",
        serialNumber: "SN-12345",
        allocationDate: "2022-01-15",
        notes: "MacBook Pro 16 inch",
      },
    ],
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [employeeId]);

  const fetchEmployeeDetails = async () => {
    setIsLoading(false);
    try {
      // TODO: Replace with actual API call
      // const response = await employeeApi.getById(employeeId);
      // setEmployee(response.data.data);
      setEmployee(mockEmployee);
    } catch (error) {
      console.error("Failed to fetch employee:", error);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!employee) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Employee not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Back button */}
        <Link href="/employees">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft size={16} />
            Back to Employees
          </Button>
        </Link>

        {/* Profile Header */}
        <EmployeeProfileHeader
          employee={employee}
          onEdit={() => console.log("Edit employee")}
          onDelete={() => console.log("Delete employee")}
          onMessage={() => console.log("Send message")}
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="bank">Bank & PF</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="overview">
            <OverviewTab employee={employee} />
          </TabsContent>

          <TabsContent value="personal">
            <PersonalDetailsTab personalDetails={employee.personalDetails} />
          </TabsContent>

          <TabsContent value="address">
            <AddressTab addresses={employee.addresses} />
          </TabsContent>

          <TabsContent value="education">
            <EducationTab education={employee.education} />
          </TabsContent>

          <TabsContent value="employment">
            <EmploymentTab employment={employee.employment} />
          </TabsContent>

          <TabsContent value="family">
            <FamilyTab family={employee.family} />
          </TabsContent>

          <TabsContent value="bank">
            <BankPFTab bankDetails={employee.bankDetails} pfDetails={employee.pfDetails} />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab documents={employee.documents} />
          </TabsContent>

          <TabsContent value="assets">
            <AssetsTab assets={employee.assets} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
