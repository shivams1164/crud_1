// Dashboard page
"use client";
import React from "react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, TrendingUp, AlertCircle, UserPlus } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "Total Employees", value: "254", icon: Users, color: "bg-blue-500" },
    { title: "Active Today", value: "198", icon: TrendingUp, color: "bg-green-500" },
    { title: "On Leave", value: "42", icon: AlertCircle, color: "bg-yellow-500" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome to HRMS</p>
          </div>
          <Link href="/employees/new">
            <Button className="gap-2">
              <UserPlus size={18} />
              Add Employee
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-4 rounded-lg text-white`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-medium text-gray-900">New Employee Added</p>
                  <p className="text-sm text-gray-500">John Doe joined Engineering</p>
                </div>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-medium text-gray-900">Document Updated</p>
                  <p className="text-sm text-gray-500">Jane Smith updated personal details</p>
                </div>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Employee On Leave</p>
                  <p className="text-sm text-gray-500">Mike Johnson is on leave until 25th</p>
                </div>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
