
// src/components/portfolio/report-list-item.tsx
import type { ReportItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, FileType2 } from 'lucide-react'; // Using FileText as a generic "Folio" and FileType2 for PDF
import Link from 'next/link';

interface ReportListItemProps {
  report: ReportItem;
}

export function ReportListItem({ report }: ReportListItemProps) {
  // Use FileText for 'folio' and FileType2 for 'pdf'
  const Icon = report.type === 'pdf' ? FileType2 : FileText; 

  return (
    <Card className="shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4">
        <div className="flex-shrink-0 p-2 sm:p-3 bg-primary/10 rounded-md">
          <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        </div>
        <div className="flex-grow min-w-0"> {/* Added min-w-0 for better flex handling of truncate */}
          <h3 className="text-xs sm:text-sm font-semibold text-foreground truncate">{report.title}</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">{report.termName}</p>
        </div>
        <Button asChild variant="outline" size="sm" className="px-2.5 sm:px-3 py-1 h-auto text-xs sm:text-sm">
          <Link href={report.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${report.title}`}>
            <Download className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> View
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

