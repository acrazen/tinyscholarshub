
// src/components/portfolio/documents-tab-content.tsx
import type { Student, StudentDocument } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileArchive, Download, FileWarning } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface DocumentsTabContentProps {
  student?: Student; // Made student optional
}

const getFileIcon = (category: StudentDocument['category']) => {
  // Could expand this with more specific icons later
  return FileArchive; 
};

export function DocumentsTabContent({ student }: DocumentsTabContentProps) {
  if (!student || !student.studentDocuments || student.studentDocuments.length === 0) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="items-center text-center">
          <FileWarning className="h-12 w-12 text-muted-foreground mb-3" />
          <CardTitle>No Documents Available</CardTitle>
          <CardDescription>
            There are no documents uploaded for {student?.firstName || 'this student'} at this time.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            School administration can upload documents like consent forms or medical records.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort documents by upload date, newest first
  const sortedDocuments = [...student.studentDocuments].sort(
    (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedDocuments.map((doc) => {
        const IconComponent = getFileIcon(doc.category);
        return (
          <Card key={doc.id} className="shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0 p-2 sm:p-3 bg-primary/10 rounded-md">
                <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate" title={doc.documentName}>
                  {doc.documentName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Category: {doc.category} | Uploaded: {format(new Date(doc.uploadDate), 'PP')}
                </p>
                {doc.fileName && (
                     <p className="text-xs text-muted-foreground truncate" title={doc.fileName}>File: {doc.fileName}</p>
                )}
              </div>
              <Button asChild variant="outline" size="sm" className="px-2.5 sm:px-3 py-1 h-auto text-sm">
                <Link href={doc.fileUrl} target="_blank" rel="noopener noreferrer" aria-label={`Download ${doc.documentName}`}>
                  <Download className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> View/Download
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
