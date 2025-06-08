
// src/app/admin/manage-student-documents/page.tsx
import Link from 'next/link';
import { UserCircle2, FolderOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAllStudents } from '@/lib/services/studentService';
import type { Student } from '@/lib/types';

export default async function ManageStudentDocumentsOverviewPage() {
  const students = await getAllStudents();

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <FolderOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Manage Student Documents</h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Select a student to view, upload, or manage their documents.
          </p>
        </div>
      </div>

      {students.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student: Student) => (
            <Card key={student.id} className="shadow-lg rounded-xl overflow-hidden flex flex-col">
              <CardHeader className="items-center text-center p-4 bg-muted/20">
                <Avatar className="w-20 h-20 mb-2 border-2 border-background shadow-sm">
                  <AvatarImage src={student.profilePhotoUrl} alt={`${student.firstName} ${student.lastName}`} data-ai-hint="child portrait" />
                  <AvatarFallback className="text-2xl">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{`${student.firstName} ${student.lastName}`}</CardTitle>
                <CardDescription className="text-sm">Class: {student.className}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 mt-auto">
                <Link href={`/admin/manage-student-documents/${student.id}`} passHref className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Documents <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <UserCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-medium text-foreground">No student profiles found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Add students before managing documents.</p>
        </div>
      )}
    </div>
  );
}
