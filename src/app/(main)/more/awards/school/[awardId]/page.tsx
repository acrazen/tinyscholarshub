
// src/app/(main)/more/awards/school/[awardId]/page.tsx
import { getSchoolAwardById, sampleSchoolAwards } from '@/lib/data'; // Import sampleSchoolAwards
import type { SchoolAward } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Building, Info, AlertTriangle } from 'lucide-react';
// import { format } from 'date-fns'; // Year is just a string, format not needed for it

interface AwardDetailPageProps {
  params: { awardId: string };
}

// Required for static export with dynamic routes
export async function generateStaticParams() {
  // Ensure robust handling in case sampleSchoolAwards has undefined entries
  return sampleSchoolAwards
    .filter(award => !!award && !!award.id) // Filter out any undefined or id-less awards
    .map((award) => ({
      awardId: award.id,
    }));
}

export default async function AwardDetailPage({ params }: AwardDetailPageProps) {
  const award = await getSchoolAwardById(params.awardId);

  if (!award) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Award Not Found</h1>
        <p className="text-muted-foreground mb-6">The award details you are looking for could not be found.</p>
        <Link href="/more/awards">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Awards
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-4 md:p-6">
      <div className="text-center md:text-left">
        <Link href="/more/awards" className="inline-flex items-center text-sm text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Awards
        </Link>
      </div>

      <article className="bg-card shadow-xl rounded-xl overflow-hidden">
        {award.imageUrl && (
          <div className="relative w-full h-64 md:h-80 bg-muted">
            <Image
              src={award.imageUrl}
              alt={award.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
              className="object-cover"
              data-ai-hint={award.dataAiHint || "award presentation"}
            />
          </div>
        )}
        <div className="p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              {award.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground space-y-1 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-1.5 text-primary" />
                <span>Awarded by: {award.awardingBody}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5 text-primary" />
                <span>Year: {award.year}</span>
              </div>
            </div>
          </header>

          <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 leading-relaxed">
            <p>{award.description}</p>
          </div>
        </div>
      </article>

      <div className="mt-12 text-center">
        <Link href="/more/awards">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to All Awards
          </Button>
        </Link>
      </div>
    </div>
  );
}
