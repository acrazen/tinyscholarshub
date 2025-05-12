import { getStudentById } from '@/lib/data';
import { StudentProfileView } from '@/components/profile/student-profile-view';
import { GuardianContactCard } from '@/components/profile/guardian-contact-card';
import { StudentPerformanceView } from '@/components/performance/student-performance-view';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, TrendingUp, Users2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface StudentDetailPageProps {
  params: { studentId: string };
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const student = getStudentById(params.studentId);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Student Not Found</h1>
        <p className="text-muted-foreground mb-6">The student you are looking for does not exist.</p>
        <Link href="/students">
          <Button variant="outline">Back to Students List</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{`${student.firstName} ${student.lastName}`}</h1>
        <p className="text-muted-foreground md:mt-0 mt-1">Class: {student.className}</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 rounded-lg shadow-sm">
          <TabsTrigger value="profile" className="py-3 data-[state=active]:shadow-md">
            <User className="mr-2 h-5 w-5" /> Profile
          </TabsTrigger>
          <TabsTrigger value="performance" className="py-3 data-[state=active]:shadow-md">
            <TrendingUp className="mr-2 h-5 w-5" /> Performance
          </TabsTrigger>
          <TabsTrigger value="guardians" className="py-3 data-[state=active]:shadow-md">
            <Users2 className="mr-2 h-5 w-5" /> Guardians
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <StudentProfileView student={student} />
        </TabsContent>
        <TabsContent value="performance">
          <StudentPerformanceView student={student} />
        </TabsContent>
        <TabsContent value="guardians">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl">Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {student.guardians.map((guardian) => (
                <GuardianContactCard key={guardian.id} guardian={guardian} />
              ))}
              {student.guardians.length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-4">No guardian information available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
