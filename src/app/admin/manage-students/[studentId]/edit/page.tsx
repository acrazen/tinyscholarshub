// src/app/admin/manage-students/[studentId]/edit/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getStudentById } from '@/lib/services/studentService';
import type { Student } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, UserCog, ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { getAllStudents } from '@/lib/services/studentService'; // For generateStaticParams

// Form schema
const studentFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  className: z.string().min(1, "Class name is required."),
  allergies: z.string().optional().transform(val => val ? val.split(',').map(s => s.trim()).filter(Boolean) : []), // Transform comma-separated string to array
  notes: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentFormSchema>;

// Required for static export with dynamic routes
export async function generateStaticParams() {
  const students = await getAllStudents();
  return students.map((student) => ({
    studentId: student.id,
  }));
}


export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.studentId as string;
  const { toast } = useToast();
  const [student, setStudent] = useState<Student | null | undefined>(undefined); // undefined for loading, null for not found
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      className: '',
      allergies: [],
      notes: '',
    },
  });

  useEffect(() => {
    if (studentId) {
      const fetchStudent = async () => {
        setIsLoading(true);
        try {
          const fetchedStudent = await getStudentById(studentId);
          setStudent(fetchedStudent);
          if (fetchedStudent) {
            form.reset({
              firstName: fetchedStudent.firstName,
              lastName: fetchedStudent.lastName,
              className: fetchedStudent.className,
              allergies: fetchedStudent.allergies || [],
              notes: fetchedStudent.notes || '',
            });
          }
        } catch (error) {
          console.error("Failed to fetch student:", error);
          toast({ title: "Error", description: "Could not load student data.", variant: "destructive" });
        }
        setIsLoading(false);
      };
      fetchStudent();
    }
  }, [studentId, form, toast]);

  const onSubmit: SubmitHandler<StudentFormData> = async (data) => {
    setIsSaving(true);
    console.log("Simulating save for student:", studentId, data);
    // In a real app, you'd call an updateStudent service here
    // e.g., await updateStudent(studentId, data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    toast({
      title: "Student Updated (Simulated)",
      description: `${data.firstName} ${data.lastName}'s profile has been updated.`,
    });
    setIsSaving(false);
    router.push('/admin/manage-students'); // Navigate back to the list
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading student details...</p>
      </div>
    );
  }

  if (student === null) { // Explicitly null means not found
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Student Not Found</h1>
        <p className="text-muted-foreground mb-6">The student profile you are trying to edit does not exist.</p>
        <Link href="/admin/manage-students">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Manage Students
          </Button>
        </Link>
      </div>
    );
  }
  
  if (!student) return null; // Handles the case where student is undefined (initial state or error)

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <UserCog className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Edit Student: {student.firstName} {student.lastName}</CardTitle>
          </div>
          <CardDescription>Modify the student's profile information below.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Student's first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Student's last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Butterflies" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies (comma-separated)</FormLabel>
                    <FormControl>
                       <Input placeholder="e.g., Peanuts, Dairy" {...field} value={Array.isArray(field.value) ? field.value.join(', ') : ''} />
                    </FormControl>
                    <FormDescription>
                      List allergies separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any other important information..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Link href="/admin/manage-students" passHref>
                <Button type="button" variant="outline" disabled={isSaving}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
