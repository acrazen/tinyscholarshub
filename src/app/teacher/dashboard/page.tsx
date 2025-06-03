
// src/app/teacher/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
    LayoutDashboard, Edit3, Users, Settings,
    UserCheck as UserCheckIcon, ClipboardList, Award, MessageCircle, CalendarCheck2
} from "lucide-react";

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Welcome, Teacher! Manage your classroom activities and student information.
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
            <Settings className="mr-2 h-4 w-4" /> Account Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Edit3 className="mr-2 h-5 w-5 text-primary" />
              Smart Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate daily updates for parents based on classroom activities.
            </p>
            <Link href="/teacher/smart-update" passHref>
              <Button className="w-full">Go to Smart Update</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="mr-2 h-5 w-5 text-primary" />
              My Students (Portfolios)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View student portfolios and track their progress.
            </p>
            <Link href="/portfolio" passHref> 
              <Button className="w-full" variant="secondary">View Portfolios</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <UserCheckIcon className="mr-2 h-5 w-5 text-muted-foreground"/>
              Student Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Mark daily attendance for your class. (Coming Soon)
            </p>
            <Button className="w-full" disabled>Manage Attendance</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <ClipboardList className="mr-2 h-5 w-5 text-primary"/>
              Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create and manage homework or assignments.
            </p>
            <Link href="/teacher/assignments" passHref>
              <Button className="w-full">Manage Assignments</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Award className="mr-2 h-5 w-5 text-muted-foreground"/>
              Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate certificates for student achievements. (Coming Soon)
            </p>
            <Button className="w-full" disabled>Create Certificates</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <MessageCircle className="mr-2 h-5 w-5 text-muted-foreground"/>
              Class Communication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Send messages or announcements to your class parents. (Coming Soon)
            </p>
            <Button className="w-full" disabled>Send Message</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg rounded-xl opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
                <CalendarCheck2 className="mr-2 h-5 w-5 text-muted-foreground" />
                My Timetable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View your teaching schedule and class timetable. (Coming Soon)
            </p>
            <Button className="w-full" disabled>View Timetable</Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
