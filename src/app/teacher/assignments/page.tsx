
// src/app/teacher/assignments/page.tsx
import { getAssignments } from '@/lib/services/assignmentService';
import type { Assignment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, ClipboardList, CalendarDays, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function AssignmentsListPage() {
  const assignments = await getAssignments();

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <ClipboardList className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Manage Assignments</h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Create, view, and manage assignments for your classes.
          </p>
        </div>
        <Link href="/teacher/assignments/create" passHref>
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Assignment
          </Button>
        </Link>
      </div>

      {assignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="shadow-lg rounded-xl flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl line-clamp-2">{assignment.title}</CardTitle>
                  <Badge variant="outline">{assignment.className}</Badge>
                </div>
                <CardDescription className="text-sm flex items-center pt-1">
                  <CalendarDays className="mr-1.5 h-4 w-4 text-muted-foreground" />
                  Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{assignment.description}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex space-x-2">
                <Link href={`/teacher/assignments/${assignment.id}`} passHref className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </Button>
                </Link>
                <Button variant="secondary" size="icon" disabled>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Assignment</span>
                </Button>
                 <Button variant="destructive" size="icon" disabled>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete Assignment</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-muted/30 rounded-lg">
          <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-medium text-foreground">No assignments created yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Click "Create New Assignment" to get started.</p>
        </div>
      )}
    </div>
  );
}
