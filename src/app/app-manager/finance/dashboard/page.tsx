
// src/app/app-manager/finance/dashboard/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Bell, Briefcase, BarChartHorizontalBig } from "lucide-react";
import { useAppCustomization } from "@/context/app-customization-context";

export default function AppManagerFinanceDashboardPage() {
  const { currentUser } = useAppCustomization();

  if (currentUser?.role !== 'AppManager_Finance') {
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
      <div className="flex items-center space-x-3">
        <DollarSign className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">App Finance Dashboard</h1>
      </div>
      <p className="text-muted-foreground">Manage client (school) subscriptions, track payments, and oversee platform revenue.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Client Subscriptions & Billing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View active school subscriptions, manage billing cycles, and track payment statuses from clients.
            </p>
            <Button className="w-full" disabled>
              Manage Subscriptions (Conceptual)
            </Button>
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground">Requires integration with a subscription management & payment system.</p>
          </CardFooter>
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BarChartHorizontalBig className="mr-2 h-5 w-5 text-primary" />
              Revenue Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate financial reports, track Monthly Recurring Revenue (MRR), and analyze payment trends.
            </p>
             <Button className="w-full" variant="outline" disabled>
                View Financial Reports (Conceptual)
            </Button>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">Requires backend data and reporting tools.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
