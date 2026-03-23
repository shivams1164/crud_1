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

  useEffect(() => {
    fetchEmployeeDetails();
  }, [employeeId]);

  const fetchEmployeeDetails = async () => {
    setIsLoading(true);
    try {
      const [employeeRes, personalRes, addressesRes, educationRes, employmentRes, familyRes, bankRes, pfRes, documentsRes, assetsRes] =
        await Promise.allSettled([
          employeeApi.getById(employeeId),
          employeeApi.getPersonalDetails(employeeId),
          employeeApi.getAddresses(employeeId),
          employeeApi.getEducation(employeeId),
          employeeApi.getEmployment(employeeId),
          employeeApi.getFamily(employeeId),
          employeeApi.getBankDetails(employeeId),
          employeeApi.getPFDetails(employeeId),
          employeeApi.getDocuments(employeeId),
          employeeApi.getAssets(employeeId),
        ]);

      if (employeeRes.status !== "fulfilled") {
        setEmployee(null);
        return;
      }

      const baseEmployee = employeeRes.value.data?.data;
      if (!baseEmployee) {
        setEmployee(null);
        return;
      }

      const nextEmployee: Employee = {
        ...baseEmployee,
        personalDetails: personalRes.status === "fulfilled" ? personalRes.value.data?.data : baseEmployee.personalDetails,
        addresses:
          addressesRes.status === "fulfilled"
            ? addressesRes.value.data?.data || []
            : baseEmployee.addresses || [],
        education:
          educationRes.status === "fulfilled"
            ? educationRes.value.data?.data || []
            : baseEmployee.education || [],
        employment:
          employmentRes.status === "fulfilled"
            ? employmentRes.value.data?.data || []
            : baseEmployee.employment || [],
        family:
          familyRes.status === "fulfilled"
            ? familyRes.value.data?.data || []
            : baseEmployee.family || [],
        bankDetails: bankRes.status === "fulfilled" ? bankRes.value.data?.data : baseEmployee.bankDetails,
        pfDetails: pfRes.status === "fulfilled" ? pfRes.value.data?.data : baseEmployee.pfDetails,
        documents:
          documentsRes.status === "fulfilled"
            ? documentsRes.value.data?.data || []
            : baseEmployee.documents || [],
        assets:
          assetsRes.status === "fulfilled"
            ? assetsRes.value.data?.data || []
            : baseEmployee.assets || [],
      };

      setEmployee(nextEmployee);
    } catch (error) {
      console.error("Failed to fetch employee:", error);
      setEmployee(null);
    } finally {
      setIsLoading(false);
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
