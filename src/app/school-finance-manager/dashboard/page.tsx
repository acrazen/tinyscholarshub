
// src/app/school-finance-manager/dashboard/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Bell, Users, Settings, Briefcase, CreditCard } from "lucide-react";
import { useAppCustomization } from "@/context/app-customization-context";

export default function SchoolFinanceManagerDashboardPage() {
  const { currentUser, moduleSettings } = useAppCustomization();

  if (currentUser?.role !== 'SchoolFinanceManager') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Briefcase className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">School Finance Dashboard</h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Manage student fees, track payments, send reminders, and configure payment settings for your school.
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
            <Settings className="mr-2 h-4 w-4" /> School Finance Settings (Conceptual)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Student Fee Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Set up fee structures, view student balances, and record payments.
            </p>
            <Button className="w-full" disabled>Manage Student Fees (Conceptual)</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Bell className="mr-2 h-5 w-5 text-primary" />
              Payment Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Send automated or manual payment reminders to parents for due fees.
            </p>
            <Button className="w-full" variant="secondary" disabled>Send Reminders (Conceptual)</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Financial Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate reports on fee collections, outstanding payments, and financial summaries.
            </p>
            <Button className="w-full" variant="outline" disabled>View Reports (Conceptual)</Button>
          </CardContent>
        </Card>

        {moduleSettings.paymentGateway && (
          <Card className="shadow-lg rounded-xl md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <CreditCard className="mr-2 h-5 w-5 text-primary" />
                Online Payment Gateway
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configure and manage your school's integrated payment gateway for online fee collection. (Conceptual)
              </p>
              <Button className="w-full" disabled>Configure Gateway (Conceptual)</Button>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">This module is currently: ENABLED (Simulated)</p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
