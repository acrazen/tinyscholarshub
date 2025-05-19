
// src/components/portfolio/report-list-item.tsx
import type { ReportItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, FileType2, FileArchive } from 'lucide-react';
import Link from 'next/link';

interface ReportListItemProps {
  report: ReportItem;
}

// Map icon names to actual Lucide components
const iconComponents: Record<NonNullable<ReportItem['iconName']>, React.FC<React.SVGProps<SVGSVGElement>>> = {
  FileArchive: FileArchive,
  FileText: FileText,
  FileType2: FileType2,
};

export function ReportListItem({ report }: ReportListItemProps) {
  // Use a default icon if iconName is not specified or not found in the map
  const IconToRender = report.iconName && iconComponents[report.iconName] ? iconComponents[report.iconName] : FileText;
  
  // Fallback logic based on type if iconName is missing
  let EffectiveIcon = IconToRender;
  if (!report.iconName) {
    EffectiveIcon = report.type === 'pdf' ? FileType2 : FileText;
  }


  return (
    <Card className="shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4">
        <div className="flex-shrink-0 p-2 sm:p-3 bg-primary/10 rounded-md">
          <EffectiveIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">{report.title}</h3>
          <p className="text-xs text-muted-foreground">{report.termName}</p>
        </div>
        <Button asChild variant="outline" size="sm" className="px-2.5 sm:px-3 py-1 h-auto text-sm">
          <Link href={report.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${report.title}`}>
            <Download className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> View
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
