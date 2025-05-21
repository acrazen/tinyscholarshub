
// src/app/app-manager/finance/dashboard/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Bell, Briefcase, BarChartHorizontalBig, Users, ListChecks, Banknote } from "lucide-react";
import { useAppCustomization } from "@/context/app-customization-context";

export default function AppManagerFinanceDashboardPage() {
  const { currentUser } = useAppCustomization();

  if (currentUser?.role !== 'AppManager_Finance' && currentUser?.role !== 'AppManager_Sales' && currentUser?.role !== 'SuperAdmin' ) {
    // Allow SuperAdmin to view this page as well
    if (currentUser?.role !== 'SuperAdmin' || (currentUser?.role === 'SuperAdmin' && !window.location.pathname.startsWith('/app-manager'))) {
        return (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Briefcase className="h-12 w-12 text-destructive mb-4" />
            <h1 className="text-2xl font-semibold">Access Denied</h1>
            <p className="text-muted-foreground">You do not have permission to view this page.</p>
          </div>
        );
    }
  }
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">App Platform Finance</h1>
        </div>
        <p className="text-muted-foreground mt-2 md:mt-0 max-w-2xl">
            Manage client school subscriptions, track platform revenue, and oversee billing operations.
        </p>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Client (School) Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View active school subscriptions, manage billing cycles, and upcoming renewals.
            </p>
            <Button className="w-full" disabled>
              Manage Subscriptions (Conceptual)
            </Button>
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground">Requires integration with a subscription management system.</p>
          </CardFooter>
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BarChartHorizontalBig className="mr-2 h-5 w-5 text-primary" />
              Platform Revenue Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate financial reports: MRR, Churn Rate, LTV, and payment trends across all clients.
            </p>
             <Button className="w-full" variant="outline" disabled>
                View Financial Reports (Conceptual)
            </Button>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">Requires backend data aggregation and reporting tools.</p>
          </CardFooter>
        </Card>
         <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Banknote className="mr-2 h-5 w-5 text-primary" />
              Invoicing & Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate invoices for schools, track payment statuses, and manage payment gateway integrations.
            </p>
             <Button className="w-full" variant="secondary" disabled>
                Manage Invoices (Conceptual)
            </Button>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">Connects to payment processing and accounting systems.</p>
          </CardFooter>
        </Card>
        <Card className="shadow-lg rounded-xl opacity-70">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <ListChecks className="mr-2 h-5 w-5 text-muted-foreground" />
              Subscription Plan Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Define and manage different subscription tiers, features, and pricing models offered to schools.
            </p>
             <Button className="w-full" disabled>
                Configure Plans (Conceptual)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    