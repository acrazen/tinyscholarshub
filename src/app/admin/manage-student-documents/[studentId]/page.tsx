
// src/app/admin/manage-student-documents/[studentId]/page.tsx
"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getStudentById } from '@/lib/services/studentService';
import { getStudentDocuments, addStudentDocument } from '@/lib/services/documentService';
import type { Student, StudentDocument } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, FileText, ArrowLeft, AlertTriangle, Trash2, Download, Eye } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const documentUploadSchema = z.object({
  documentName: z.string().min(3, "Document name must be at least 3 characters.").max(100),
  category: z.enum(['Consent Form', 'Medical Record', 'Previous Report', 'Identification', 'Other'], {
    required_error: "Please select a document category.",
  }),
  attachment: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "File is required.")
    .refine(
      (files) => files && files.length > 0 && files[0].size <= MAX_FILE_SIZE,
      `Max file size is 10MB.`
    )
    .refine(
      (files) => files && files.length > 0 && ACCEPTED_FILE_TYPES.includes(files[0].type),
      "Only .pdf, .jpg, .png, .doc, .docx files are accepted."
    ),
});

type DocumentUploadFormData = z.infer<typeof documentUploadSchema>;

export default function ManageSpecificStudentDocumentsPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.studentId as string;
  const { toast } = useToast();

  const [student, setStudent] = useState<Student | null | undefined>(undefined);
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [isLoadingStudent, setIsLoadingStudent] = useState(true);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<DocumentUploadFormData>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      documentName: '',
      category: undefined,
      attachment: undefined,
    },
  });

  useEffect(() => {
    if (studentId) {
      const fetchStudentData = async () => {
        setIsLoadingStudent(true);
        try {
          const fetchedStudent = await getStudentById(studentId);
          setStudent(fetchedStudent);
        } catch (error) {
          console.error("Failed to fetch student:", error);
          toast({ title: "Error", description: "Could not load student data.", variant: "destructive" });
          setStudent(null); // Set to null on error
        }
        setIsLoadingStudent(false);
      };
      fetchStudentData();
    }
  }, [studentId, toast]);

  useEffect(() => {
    if (studentId) {
      const fetchDocuments = async () => {
        setIsLoadingDocuments(true);
        try {
          const fetchedDocs = await getStudentDocuments(studentId);
          setDocuments(fetchedDocs);
        } catch (error) {
          console.error("Failed to fetch documents:", error);
          toast({ title: "Error", description: "Could not load documents.", variant: "destructive" });
        }
        setIsLoadingDocuments(false);
      };
      fetchDocuments();
    }
  }, [studentId, toast]);

  const onUploadSubmit: SubmitHandler<DocumentUploadFormData> = async (data) => {
    if (!studentId) return;
    setIsUploading(true);
    try {
      const file = data.attachment[0];
      const fileUrl = URL.createObjectURL(file); 

      const newDocData = {
        documentName: data.documentName,
        category: data.category,
        fileUrl: fileUrl, 
        fileName: file.name,
        dataAiHint: file.type.startsWith('image/') ? 'student document image' : 'student document file'
      };

      const newDocument = await addStudentDocument(studentId, newDocData);
      setDocuments(prevDocs => [newDocument, ...prevDocs]); 

      toast({
        title: "Document Uploaded (Simulated)",
        description: `"${newDocument.documentName}" has been added for ${student?.firstName}.`,
      });
      form.reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast({ title: "Upload Failed", description: "Could not upload the document.", variant: "destructive" });
    }
    setIsUploading(false);
  };
  
  const handleConceptualDelete = (docId: string, docName: string) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== docId));
    toast({
      title: "Document Deleted (Simulated)",
      description: `"${docName}" has been removed.`,
      variant: "default",
    });
  };

  if (isLoadingStudent) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading student details...</p>
      </div>
    );
  }

  if (student === null) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Student Not Found</h1>
        <Link href="/admin/manage-student-documents">
          <Button variant="outline" size="lg"><ArrowLeft className="mr-2 h-5 w-5" />Back to Overview</Button>
        </Link>
      </div>
    );
  }
  if (!student) return null;


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={student.profilePhotoUrl} alt={student.firstName} data-ai-hint="child photo"/>
            <AvatarFallback>{student.firstName.charAt(0)}{student.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manage Documents for {student.firstName} {student.lastName}</h1>
            <p className="text-muted-foreground">Class: {student.className}</p>
          </div>
        </div>
        <Link href="/admin/manage-student-documents" passHref>
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Student List</Button>
        </Link>
      </div>

      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center"><UploadCloud className="mr-2 h-5 w-5 text-primary" /> Upload New Document</CardTitle>
          <CardDescription>Add a new document for {student.firstName}.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUploadSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="documentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Name *</FormLabel>
                    <FormControl><Input placeholder="E.g., Term 1 Report Card, Signed Consent Form" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Consent Form">Consent Form</SelectItem>
                        <SelectItem value="Medical Record">Medical Record</SelectItem>
                        <SelectItem value="Previous Report">Previous Report</SelectItem>
                        <SelectItem value="Identification">Identification</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attachment"
                render={({ field: { onChange, ...rest } }) => ( 
                  <FormItem>
                    <FormLabel>File *</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => onChange(e.target.files)}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        {...rest}
                      />
                    </FormControl>
                    <FormDescription>PDF, JPG, PNG, DOC, DOCX. Max 10MB.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button type="submit" disabled={isUploading}>
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                {isUploading ? 'Uploading...' : 'Upload Document'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Separator />

      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" /> Existing Documents</CardTitle>
          <CardDescription>View and manage currently uploaded documents for {student.firstName}.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingDocuments ? (
             <div className="flex justify-center items-center py-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Loading documents...</p>
            </div>
          ) : documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" title={doc.documentName}>{doc.documentName}</p>
                    <p className="text-xs text-muted-foreground">Category: {doc.category} | Uploaded: {format(new Date(doc.uploadDate), 'PP')}</p>
                     {doc.fileName && <p className="text-xs text-muted-foreground">File: {doc.fileName}</p>}
                  </div>
                  <div className="flex space-x-1 ml-2">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                        <Link href={doc.fileUrl} target="_blank" rel="noopener noreferrer" title="View/Download Document (conceptual)">
                            <Download className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleConceptualDelete(doc.id, doc.documentName)} className="h-8 w-8 text-destructive hover:text-destructive" title="Delete Document (conceptual)">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">No documents found for this student.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
