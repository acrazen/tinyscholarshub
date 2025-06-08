
// src/app/(main)/portfolio/[studentId]/page.tsx
import { getStudentById, getAllStudents } from '@/lib/services/studentService'; // Updated import
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, FileText as ReportIcon, FolderClosed as DocumentsIcon, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MilestonesCard } from '@/components/performance/milestones-card';
import { ReportsTabContent } from '@/components/portfolio/reports-tab-content';
import { DocumentsTabContent } from '@/components/portfolio/documents-tab-content'; // New import

interface PortfolioDetailPageProps {
  params: { studentId: string };
}

// Required for static export with dynamic routes
export async function generateStaticParams() {
  const students = await getAllStudents(); // Use service to fetch students
  return students.map((student) => ({
    studentId: student.id,
  }));
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const student = await getStudentById(params.studentId);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Student Not Found</h1>
        <p className="text-muted-foreground mb-6">The student portfolio you are looking for does not exist.</p>
        <Link href="/portfolio">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Portfolio Overview
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
        <TabsList className="grid w-full grid-cols-3 mb-6 rounded-lg shadow-sm bg-muted h-auto">
          <TabsTrigger 
            value="activities" 
            className="py-2.5 sm:py-3 text-sm sm:text-base data-[state=active]:shadow-md data-[state=active]:bg-background data-[state=active]:rounded-md"
          >
            <Activity className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span>Activities</span>
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="py-2.5 sm:py-3 text-sm sm:text-base data-[state=active]:shadow-md data-[state=active]:bg-background data-[state=active]:rounded-md"
          >
            <ReportIcon className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span>Reports</span>
          </TabsTrigger>
           <TabsTrigger 
            value="documents" 
            className="py-2.5 sm:py-3 text-sm sm:text-base data-[state=active]:shadow-md data-[state=active]:bg-background data-[state=active]:rounded-md"
          >
            <DocumentsIcon className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span>Documents</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <div className="space-y-6">
            <MilestonesCard milestones={student.milestones} />
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <ReportsTabContent student={student} />
        </TabsContent>
         <TabsContent value="documents">
          <DocumentsTabContent student={student} />
        </TabsContent>
      </Tabs>

       <div className="mt-8 text-center">
        <Link href="/admin/manage-students"> 
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Student List (Admin)
          </Button>
        </Link>
      </div>
    </div>
  );
}
