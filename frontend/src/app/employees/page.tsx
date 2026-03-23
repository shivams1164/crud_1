// Employees list page
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { EmployeeTable } from "@/components/employee/EmployeeTable";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/FormElements";
import { Card } from "@/components/ui/Card";
import { employeeApi } from "@/lib/api";
import { UserPlus, Filter } from "lucide-react";
import type { Employee } from "@/types/employee";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const departments = ["Engineering", "HR", "Sales", "Marketing", "Finance", "Operations"];
  const statusOptions = ["ACTIVE", "INACTIVE", "ON_LEAVE", "TERMINATED"];

  // Mock data for demo (replace with API calls)
  const mockEmployees: Employee[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "9876543210",
      employeeId: "EMP001",
      designation: "Senior Engineer",
      department: "Engineering",
      dateOfJoining: "2022-01-15",
      status: "ACTIVE",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "9876543211",
      employeeId: "EMP002",
      designation: "HR Manager",
      department: "HR",
      dateOfJoining: "2021-06-10",
      status: "ACTIVE",
    },
    {
      id: "3",
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike@example.com",
      phone: "9876543212",
      employeeId: "EMP003",
      designation: "Sales Executive",
      department: "Sales",
      dateOfJoining: "2023-03-20",
      status: "ON_LEAVE",
    },
  ];

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, searchQuery, department, status]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await employeeApi.getAll(currentPage, 10, searchQuery);
      // setEmployees(response.data.data?.content || []);
      // setTotalPages(response.data.data?.totalPages || 1);

      // Mock data for now
      setEmployees(mockEmployees);
      setTotalPages(1);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleEdit = (employee: Employee) => {
    console.log("Edit employee:", employee);
    // TODO: Navigate to edit page or open modal
  };

  const handleDelete = (employee: Employee) => {
    if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      console.log("Delete employee:", employee);
      // TODO: Call delete API and refresh list
    }
  };

  return (
    <Layout onSearch={handleSearch}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600 mt-1">Manage all employees in the system</p>
          </div>
          <Link href="/employees/new">
            <Button className="gap-2">
              <UserPlus size={18} />
              Add Employee
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setCurrentPage(0);
              }}
              className="md:col-span-1"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Select>

            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(0);
              }}
              className="md:col-span-1"
            >
              <option value="">All Status</option>
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </Select>

            <Button
              variant="outline"
              className="md:col-span-2 gap-2"
              onClick={() => {
                setDepartment("");
                setStatus("");
                setSearchQuery("");
              }}
            >
              <Filter size={16} />
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Employee Table */}
        <EmployeeTable
          employees={employees}
          isLoading={isLoading}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
}
