
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
import { Loader2, FilePlus, ArrowLeft, Paperclip } from 'lucide-react';
import Link from 'next/link';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/gif"];

const assignmentFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100, "Title is too long."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000, "Description is too long."),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." }),
  className: z.enum(["Butterflies", "Caterpillars"], { required_error: "Please select a class." }),
  attachment: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files[0].type),
      "Only .pdf, .jpg, .png, .gif files are accepted."
    ),
});

type AssignmentFormData = z.infer<typeof assignmentFormSchema>;

export default function CreateAssignmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      className: undefined,
      attachment: undefined,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      form.setValue('attachment', files); // Update RHF state
    } else {
      setFileName(null);
      form.setValue('attachment', undefined);
    }
  };

  const onSubmit: SubmitHandler<AssignmentFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      let fileUrl: string | undefined = undefined;
      let attachmentName: string | undefined = undefined;

      if (data.attachment && data.attachment.length > 0) {
        const file = data.attachment[0];
        // Simulate file upload: In a real app, upload to cloud storage and get URL
        // For conceptual frontend, we can use a blob URL for local preview if needed,
        // or just use the filename as a placeholder.
        fileUrl = URL.createObjectURL(file); // This URL is temporary and local to the browser session
        attachmentName = file.name;
        console.log("Simulating file upload for:", file.name, "Conceptual URL:", fileUrl);
      }

      const assignmentData = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        className: data.className,
        teacherId: 'teacher-placeholder-id', // In a real app, from authenticated user
        fileUrl: fileUrl,
        fileName: attachmentName,
      };

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
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="attachment"
                render={() => ( // field is not directly used in render for file input with RHF
                  <FormItem>
                    <FormLabel>Attachment (Optional)</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <label
                          htmlFor="file-upload"
                          className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-secondary/80 transition-colors text-sm"
                        >
                          <Paperclip className="mr-2 h-4 w-4" />
                          Choose File
                        </label>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png,.gif"
                        />
                        {fileName && <span className="text-sm text-muted-foreground truncate max-w-[200px]">{fileName}</span>}
                      </div>
                    </FormControl>
                    <FormDescription>Max 5MB. PDF, JPG, PNG, GIF accepted.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
