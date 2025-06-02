
// src/app/(admin)/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
    ShieldCheck, UserPlus, School, Settings, Users, 
    Contact, UserRoundPlus, Box, MessageCircle, Timer, CalendarDays, 
    UserCheck as UserCheckIcon, FileText as FileTextIcon, Award, FileUp
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">School Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Manage overall school operations, student and staff information, and communications.
          </p>
        </div>
         <Button variant="outline" className="mt-4 md:mt-0">
            <Settings className="mr-2 h-4 w-4" /> School Settings (Conceptual)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              Manage Staff (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add and manage teacher and other staff accounts.
            </p>
            <Button className="w-full" disabled>Manage Staff</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Contact className="mr-2 h-5 w-5 text-muted-foreground" />
              Lead Management (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track inquiries and manage prospective student leads.
            </p>
            <Button className="w-full" disabled>Manage Leads</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <UserRoundPlus className="mr-2 h-5 w-5 text-muted-foreground" />
              Admission (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Oversee the student admission and enrollment process.
            </p>
            <Button className="w-full" disabled>Manage Admissions</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Box className="mr-2 h-5 w-5 text-muted-foreground" />
              Inventory (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage school supplies, equipment, and assets.
            </p>
            <Button className="w-full" disabled>Manage Inventory</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <MessageCircle className="mr-2 h-5 w-5 text-muted-foreground" />
              Bulk Comms (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Send bulk SMS or emails to parents and staff.
            </p>
            <Button className="w-full" disabled>Send Communications</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Timer className="mr-2 h-5 w-5 text-muted-foreground" />
              Timesheets (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage employee timesheets and work hours.
            </p>
            <Button className="w-full" disabled>Manage Timesheets</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <CalendarDays className="mr-2 h-5 w-5 text-muted-foreground" />
              Timetable (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create and manage school and class timetables.
            </p>
            <Button className="w-full" disabled>Manage Timetables</Button>
          </CardContent>
        </Card>

         <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <UserCheckIcon className="mr-2 h-5 w-5 text-muted-foreground" />
              Staff Attendance (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage and track attendance for teachers and staff.
            </p>
            <Button className="w-full" disabled>Manage Staff Attendance</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileTextIcon className="mr-2 h-5 w-5 text-muted-foreground" />
              Custom Reports (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate customized reports for school operations.
            </p>
            <Button className="w-full" disabled>View Reports</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileUp className="mr-2 h-5 w-5 text-muted-foreground" />
              Student Docs (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload and manage important student documents.
            </p>
            <Button className="w-full" disabled>Manage Documents</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <School className="mr-2 h-5 w-5 text-muted-foreground" />
              School Settings (Conceptual)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Configure general school information, academic years, etc.
            </p>
            <Button className="w-full" disabled>Configure Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
