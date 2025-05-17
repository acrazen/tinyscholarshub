
// src/app/(main)/portfolio/[studentId]/page.tsx
import { getStudentById } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, FileText as ReportIcon, AlertTriangle, ArrowLeft } from 'lucide-react'; // Changed User to Activity, TrendingUp to ReportIcon
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MilestonesCard } from '@/components/performance/milestones-card';
import { ReportsTabContent } from '@/components/portfolio/reports-tab-content';
import { StudentProfileView } from '@/components/profile/student-profile-view'; // To display basic profile info

interface PortfolioDetailPageProps {
  params: { studentId: string };
}

export default function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const student = getStudentById(params.studentId);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Student Not Found</h1>
        <p className="text-muted-foreground mb-6">The student portfolio you are looking for does not exist.</p>
        <Link href="/portfolio">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Portfolios
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
        <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg shadow-sm bg-muted">
          <TabsTrigger value="activities" className="py-3 text-base data-[state=active]:shadow-md data-[state=active]:bg-background">
            <Activity className="mr-2 h-5 w-5" /> Activities
          </TabsTrigger>
          <TabsTrigger value="reports" className="py-3 text-base data-[state=active]:shadow-md data-[state=active]:bg-background">
            <ReportIcon className="mr-2 h-5 w-5" /> Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          {/* For "Activities", we can show Milestones or other relevant performance info */}
          {/* We can also include StudentProfileView for basic details if not covered above */}
          <div className="space-y-6">
            <MilestonesCard milestones={student.milestones} />
            {/* You could add AttendanceCard here as well if desired under Activities */}
            {/* <AttendanceCard student={student} /> */}
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <ReportsTabContent student={student} />
        </TabsContent>
      </Tabs>

       <div className="mt-8 text-center">
        <Link href="/portfolio">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Portfolios
          </Button>
        </Link>
      </div>
    </div>
  );
}

