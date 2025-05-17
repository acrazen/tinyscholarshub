
// src/app/(main)/portfolio/page.tsx
// This page will now directly show the detailed portfolio for a default student

import { studentsData, getStudentById } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, FileText as ReportIcon, AlertTriangle, ArrowLeft, FolderKanban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MilestonesCard } from '@/components/performance/milestones-card';
import { ReportsTabContent } from '@/components/portfolio/reports-tab-content';

export default function PortfolioPage() {
  // For this page, we'll display the portfolio of the first student as a default.
  // In a real app, you might have a different logic to select which student to show here,
  // or this page might be a dashboard leading to individual student portfolios.
  const studentIdToShow = studentsData[0]?.id; // Get the ID of the first student
  const student = studentIdToShow ? getStudentById(studentIdToShow) : null;

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">No Student Data</h1>
        <p className="text-muted-foreground mb-6">There is no student data available to display a portfolio.</p>
        {/* Optionally, link to a selection page or home if needed */}
         <Link href="/">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  // The content below is similar to src/app/(main)/portfolio/[studentId]/page.tsx
  // but adapted for this page to show a specific student directly.
  return (
    <div className="space-y-6">
      {/* Page Title - consistent with other top-level pages */}
      <div className="flex items-center justify-center md:justify-start space-x-2 mb-8 text-center md:text-left">
        <FolderKanban className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Student Portfolio</h1>
      </div>
      
      {/* Student Header Info */}
      <div className="flex flex-col items-center text-center p-4 md:p-6 bg-card rounded-xl shadow-lg">
        <Avatar className="w-24 h-24 md:w-28 md:h-28 mb-4 border-4 border-background shadow-md">
          <AvatarImage src={student.profilePhotoUrl} alt={`${student.firstName} ${student.lastName}`} data-ai-hint={student.dataAiHint || "student photo"}/>
          <AvatarFallback className="text-3xl md:text-4xl">
            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {`${student.firstName} ${student.lastName}`}
        </h1>
        <p className="text-base text-muted-foreground mt-1">Class: {student.className}</p>
      </div>
      
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg shadow-sm bg-muted">
          <TabsTrigger value="activities" className="py-3 text-base data-[state=active]:shadow-md data-[state=active]:bg-background">
            <Activity className="mr-2 h-5 w-5" /> Activities
          </TabsTrigger>
          <TabsTrigger value="reports" className="py-3 text-base data-[state=active]:shadow-md data-[state=active]:bg-background">
            <ReportIcon className="mr-2 h-5 w-5" /> Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <div className="space-y-6">
            <MilestonesCard milestones={student.milestones} />
            {/* Consider adding AttendanceCard or other activity-related components here */}
            {/* e.g., <AttendanceCard student={student} /> */}
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <ReportsTabContent student={student} />
        </TabsContent>
      </Tabs>

      {/* 
        If you still want a way to see other students, you might add a link here 
        or re-introduce a student selection mechanism on another page.
        For now, this page directly shows one student's portfolio.
      */}
    </div>
  );
}
