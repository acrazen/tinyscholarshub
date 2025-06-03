
// src/app/teacher/assignments/[assignmentId]/page.tsx
import { getAssignmentById } from '@/lib/services/assignmentService';
import type { Assignment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, Edit, Trash2, ClipboardList, Users, UploadCloud, FileText } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

interface AssignmentDetailPageProps {
  params: { assignmentId: string };
}

// For dynamic segment without pre-rendering:
export const dynamic = 'force-dynamic'; 

export default async function AssignmentDetailPage({ params }: AssignmentDetailPageProps) {
  const assignment = await getAssignmentById(params.assignmentId);

  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <ClipboardList className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Assignment Not Found</h1>
        <p className="text-muted-foreground mb-6">The assignment details you are looking for could not be found.</p>
        <Link href="/teacher/assignments">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Assignments
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
       <div className="mb-6">
        <Link href="/teacher/assignments" className="inline-flex items-center text-sm text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Assignments
        </Link>
      </div>

      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-2xl md:text-3xl mb-1">{assignment.title}</CardTitle>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Badge variant="secondary">{assignment.className}</Badge>
                <div className="flex items-center">
                  <CalendarDays className="mr-1.5 h-4 w-4" />
                  Due: {format(new Date(assignment.dueDate), 'EEEE, MMMM dd, yyyy')}
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-0 flex space-x-2">
                <Button variant="outline" size="sm" disabled><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                <Button variant="destructive" size="sm" disabled><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2 mt-2">Description</h3>
          <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 leading-relaxed">
            <p>{assignment.description}</p>
          </div>

          {assignment.fileUrl && (
            <>
              <Separator className="my-4" />
              <h3 className="text-lg font-semibold mb-2">Attached File</h3>
              <Button variant="outline" asChild size="sm">
                <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer" download={assignment.fileName || 'assignment-file'}>
                  <FileText className="mr-2 h-4 w-4" /> {assignment.fileName || 'Download Attachment'}
                </a>
              </Button>
               <p className="text-xs text-muted-foreground mt-1">
                Note: This is a conceptual download. The file URL is temporary if created via local file selection.
              </p>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
            <CardTitle className="flex items-center text-xl"><Users className="mr-2 h-5 w-5 text-primary" /> Student Submissions</CardTitle>
            <CardDescription>View and grade student submissions for this assignment. (Conceptual)</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-6 text-muted-foreground">
                <p>Student submission tracking and grading features are coming soon.</p>
            </div>
        </CardContent>
         <CardFooter>
             <Button disabled>View Submissions (Conceptual)</Button>
        </CardFooter>
      </Card>

    </div>
  );
}
