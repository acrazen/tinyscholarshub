
// src/app/app-manager/management/dashboard/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, PlusCircle, SlidersHorizontal, BarChart3, Briefcase } from "lucide-react";
import { useAppCustomization } from "@/context/app-customization-context";
import Link from "next/link";

export default function AppManagerManagementDashboardPage() {
  const { currentUser } = useAppCustomization();

  if (currentUser?.role !== 'AppManager_Management') {
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
        <SlidersHorizontal className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">App Management Dashboard</h1>
      </div>
      <p className="text-muted-foreground">Oversee tenant creation, module assignments, and global app configurations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Building className="mr-2 h-5 w-5 text-primary" />
              Tenant (School) Onboarding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create new school instances, configure their subdomains (conceptual), and assign initial admin users.
            </p>
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Register New School (Conceptual)
            </Button>
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground">Backend integration required for actual tenant creation.</p>
          </CardFooter>
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <SlidersHorizontal className="mr-2 h-5 w-5 text-primary" />
              Module & Feature Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Enable/disable core modules for specific tenants or globally.
            </p>
            <Link href="/superadmin/dashboard" passHref> {/* SuperAdmin dashboard has global module toggles */}
                 <Button variant="outline" className="w-full">
                    Go to Global Module Settings
                </Button>
            </Link>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">Per-tenant module management requires backend.</p>
          </CardFooter>
        </Card>

        <Card className="shadow-lg rounded-xl opacity-70">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BarChart3 className="mr-2 h-5 w-5 text-muted-foreground" />
              Platform Analytics (Conceptual)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View overall platform usage, active schools, user growth, and other key metrics.
            </p>
             <Button className="w-full" disabled>View Analytics</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
