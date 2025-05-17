
// src/components/portfolio/report-list-item.tsx
import type { ReportItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FileArchive, Download, FileType2 } from 'lucide-react'; // Using FileText as a generic "Folio" and FileType2 for PDF
import Link from 'next/link';

interface ReportListItemProps {
  report: ReportItem;
}

export function ReportListItem({ report }: ReportListItemProps) {
  const Icon = report.type === 'pdf' ? FileType2 : FileArchive; // FileArchive for 'folio'

  return (
    <Card className="shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-md">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-grow">
          <h3 className="text-base font-semibold text-foreground truncate">{report.title}</h3>
          <p className="text-sm text-muted-foreground">{report.termName}</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={report.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${report.title}`}>
            <Download className="mr-2 h-4 w-4" /> View
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
