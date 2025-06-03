
// src/app/teacher/assignments/create/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createAssignment } from '@/lib/services/assignmentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FilePlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Teacher ID is conceptual for now, not part of the form for simplicity.
const assignmentFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100, "Title is too long."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000, "Description is too long."),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." }),
  className: z.enum(["Butterflies", "Caterpillars"], { required_error: "Please select a class." }),
  // fileUrl: z.string().url().optional(), // For future file uploads
});

type AssignmentFormData = z.infer<typeof assignmentFormSchema>;

export default function CreateAssignmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      className: undefined, // Default to undefined so placeholder shows
    },
  });

  const onSubmit: SubmitHandler<AssignmentFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // In a real app, teacherId would come from the authenticated user session
      const assignmentData = { ...data, teacherId: 'teacher-placeholder-id' };
      await createAssignment(assignmentData);
      toast({
        title: "Assignment Created!",
        description: `"${data.title}" has been successfully created.`,
      });
      router.push('/teacher/assignments');
    } catch (error) {
      console.error("Failed to create assignment:", error);
      toast({
        title: "Error",
        description: "Could not create the assignment. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <FilePlus className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Create New Assignment</CardTitle>
          </div>
          <CardDescription>Fill in the details below to create a new assignment for your class.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignment Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Nature Walk Observations" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe the assignment tasks and learning objectives..." {...field} rows={5} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="className"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Butterflies">Butterflies</SelectItem>
                          <SelectItem value="Caterpillars">Caterpillars</SelectItem>
                          {/* Add more classes if needed */}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Future file upload field can go here */}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Link href="/teacher/assignments" passHref>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FilePlus className="mr-2 h-4 w-4" />}
                {isSubmitting ? 'Creating...' : 'Create Assignment'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
