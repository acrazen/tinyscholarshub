// src/app/(admin)/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, UserPlus, School, Settings, Users } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Manage school settings, users, and student profiles.
          </p>
        </div>
         <Button variant="outline" className="mt-4 md:mt-0">
            <Settings className="mr-2 h-4 w-4" /> Site Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <UserPlus className="mr-2 h-5 w-5 text-primary" />
              Manage Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add new students, view and edit existing profiles.
            </p>
            <Link href="/admin/manage-students" passHref>
              <Button className="w-full">Go to Student Management</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
               <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              Manage Teachers (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add and manage teacher accounts and class assignments.
            </p>
            <Button className="w-full" disabled>Manage Teachers</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <School className="mr-2 h-5 w-5 text-muted-foreground" />
              School Settings (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Configure school information, academic years, and more.
            </p>
            <Button className="w-full" disabled>Configure Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
