
// src/app/(main)/my-assignments/[assignmentId]/page.tsx
import { getAssignmentById, getAssignments } from '@/lib/services/assignmentService'; // Added getAssignments
import type { Assignment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, ClipboardList, FileText, Download } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

interface AssignmentDetailPageProps {
  params: { assignmentId: string };
}

// Required for static export with dynamic routes
export async function generateStaticParams() {
  const assignments = await getAssignments(); // Fetch all assignments
  return assignments.map((assignment) => ({
    assignmentId: assignment.id,
  }));
}

export default async function ParentViewAssignmentDetailPage({ params }: AssignmentDetailPageProps) {
  const assignment = await getAssignmentById(params.assignmentId);

  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <ClipboardList className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Assignment Not Found</h1>
        <p className="text-muted-foreground mb-6">This assignment could not be found or is no longer available.</p>
        <Link href="/my-assignments">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to My Assignments
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <Link href="/my-assignments" className="inline-flex items-center text-sm text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Assignments
        </Link>
      </div>

      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl mb-1">{assignment.title}</CardTitle>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <Badge variant="secondary">{assignment.className} Class</Badge>
            <div className="flex items-center">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              Due: {format(new Date(assignment.dueDate), 'EEEE, MMMM dd, yyyy')}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2 mt-2">Assignment Details</h3>
          <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 leading-relaxed">
            <p>{assignment.description}</p>
          </div>

          {assignment.fileUrl && (
            <>
              <Separator className="my-4" />
              <h3 className="text-lg font-semibold mb-2">Attached File</h3>
              <Button variant="outline" asChild size="sm">
                <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer" download={assignment.fileName || 'assignment-file'}>
                  <Download className="mr-2 h-4 w-4" /> {assignment.fileName || 'Download Attachment'}
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
            <CardTitle className="flex items-center text-xl"><FileText className="mr-2 h-5 w-5 text-primary" /> Submit Your Work</CardTitle>
            <CardDescription>Upload your completed assignment here. (Conceptual)</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-6 text-muted-foreground">
                <p>Assignment submission functionality will be available soon.</p>
                <Button disabled className="mt-3">Upload Submission (Coming Soon)</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
