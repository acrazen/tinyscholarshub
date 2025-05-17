
// src/components/portfolio/reports-tab-content.tsx
import type { Student } from '@/lib/types';
import { ReportListItem } from './report-list-item';
import { AlertTriangle, FolderOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


interface ReportsTabContentProps {
  student?: Student; // Made student optional to handle loading/error states gracefully
}

export function ReportsTabContent({ student }: ReportsTabContentProps) {
  if (!student || !student.reports || student.reports.length === 0) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="items-center text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-3" />
          <CardTitle>No Reports Available</CardTitle>
          <CardDescription>There are no reports uploaded for {student?.firstName || 'this student'} yet.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">Please check back later or contact the school for more information.</p>
        </CardContent>
      </Card>
    );
  }

  // Sort reports by year (descending) and then by term name (descending, assuming term names like "Term 4" sort correctly)
  const sortedReports = [...student.reports].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    return b.termName.localeCompare(a.termName); // This might need adjustment if term names are complex
  });


  return (
    <div className="space-y-4">
      {sortedReports.map((report) => (
        <ReportListItem key={report.id} report={report} />
      ))}
    </div>
  );
}

