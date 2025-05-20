
// src/app/(main)/more/awards/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Award as AwardIcon, Trophy, Star, Sparkles, UserCheck, BookOpen, type LucideIcon, ArrowRight, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import type { Student, ChildAward, SchoolAward } from '@/lib/types';
import { getStudentById } from '@/lib/services/studentService';
import { studentsData, sampleSchoolAwards } from '@/lib/data'; // Using direct import for sampleSchoolAwards
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryColors: Record<ChildAward['category'], string> = {
  'Academic': 'bg-blue-100 text-blue-700 border-blue-300',
  'Sports': 'bg-green-100 text-green-700 border-green-300',
  'Arts': 'bg-purple-100 text-purple-700 border-purple-300',
  'Citizenship': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'Effort': 'bg-pink-100 text-pink-700 border-pink-300',
};

const categoryIcons: Record<ChildAward['category'], LucideIcon> = {
    'Academic': BookOpen,
    'Sports': Trophy,
    'Arts': Sparkles,
    'Citizenship': UserCheck,
    'Effort': Star,
};

const schoolAwardIconMap: Record<string, LucideIcon> = {
  'Trophy': Trophy,
  'Star': Star,
  // Add other specific icon names if used in sampleSchoolAwards
};


export default function AwardsAndRecognitionsPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      try {
        if (studentsData.length > 0) {
          const fetchedStudent = await getStudentById(studentsData[0].id);
          if (fetchedStudent) {
            setStudent(fetchedStudent);
          } else {
             toast({ title: "Error", description: "Could not load child's data.", variant: "destructive" });
          }
        } else {
           toast({ title: "No Student Data", description: "No student data available for awards.", variant: "default" });
        }
      } catch (error) {
        console.error("Failed to fetch student data:", error);
        toast({ title: "Error", description: "Could not load child's awards.", variant: "destructive" });
      }
      setIsLoading(false);
    };
    fetchStudentData();
  }, [toast]);

  const renderSchoolAwardIcon = (award: SchoolAward) => {
    if (award.iconName && schoolAwardIconMap[award.iconName]) {
      const IconComponent = schoolAwardIconMap[award.iconName];
      let iconColor = "text-muted-foreground"; // Default color
      if (award.iconName === 'Trophy') iconColor = "text-yellow-500";
      if (award.iconName === 'Star') iconColor = "text-green-500 fill-green-500";
      
      return (
        <div className="p-3 bg-background rounded-lg shadow-sm flex-shrink-0">
          <IconComponent className={`h-8 w-8 ${iconColor}`} />
        </div>
      );
    }
    if (award.imageUrl) {
      return (
        <div className="p-1 bg-background rounded-lg shadow-sm flex-shrink-0 relative w-16 h-16">
          <Image
            src={award.imageUrl}
            alt={`${award.title} icon`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md object-cover"
            data-ai-hint={award.dataAiHint || "award image"}
          />
        </div>
      );
    }
    return (
      <div className="p-3 bg-background rounded-lg shadow-sm flex-shrink-0">
        <AwardIcon className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  };


  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <AwardIcon className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Awards & Recognitions</h1>
        <p className="text-muted-foreground max-w-lg">
          Celebrating achievements, both personal and for our school community.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-2 text-center sm:text-left">My Child's Awards & Achievements</h2>
        <p className="text-muted-foreground mb-6 text-center sm:text-left">
            Special recognitions for {student ? `${student.firstName}'s` : "your child's"} hard work and accomplishments.
        </p>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Loading child's awards...</p>
          </div>
        ) : student && student.childAwards && student.childAwards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {student.childAwards.map((award) => {
              const IconComponent = categoryIcons[award.category] || AwardIcon;
              return (
                <Card key={award.id} className="shadow-lg rounded-xl flex flex-col">
                  <CardHeader className="flex flex-row items-start space-x-4 p-5 bg-card">
                     <div className={`p-3 bg-${categoryColors[award.category].split(' ')[0].replace('bg-','primary')}/10 rounded-lg shadow-sm flex-shrink-0`}>
                        <IconComponent className={`h-8 w-8 text-${categoryColors[award.category].split(' ')[1].replace('text-','primary')}`} />
                    </div>
                    <div className="flex-grow">
                      <CardTitle className="text-lg">{award.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {format(new Date(award.dateAwarded), 'MMMM d, yyyy')}
                      </CardDescription>
                    </div>
                     <Badge variant="outline" className={`text-xs ${categoryColors[award.category]}`}>{award.category}</Badge>
                  </CardHeader>
                  <CardContent className="p-5 flex-grow">
                    <p className="text-sm text-muted-foreground leading-relaxed">{award.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-lg">
            <AwardIcon className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium text-foreground">
              No specific awards recorded for {student ? student.firstName : "your child"} yet.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">Keep encouraging their wonderful efforts!</p>
          </div>
        )}
      </section>

      <Separator className="my-10" />

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">Our School's Recognitions</h2>
        {(sampleSchoolAwards && sampleSchoolAwards.filter(a => !!a).length > 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleSchoolAwards.filter(a => !!a).map((award) => ( // Added filter for robustness
                <Card key={award.id} className="shadow-lg rounded-xl flex flex-col hover:shadow-xl transition-shadow">
                   <Link href={`/more/awards/school/${award.id}`} className="flex flex-col h-full">
                    <CardHeader className="flex flex-row items-start space-x-4 p-5 bg-muted/20">
                      {renderSchoolAwardIcon(award)}
                      <div className="flex-grow">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">{award.title}</CardTitle>
                          <CardDescription className="text-sm">
                          Awarded by: {award.awardingBody} - {award.year}
                          </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 flex-grow">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{award.description}</p>
                    </CardContent>
                    <div className="p-4 mt-auto border-t">
                        <Button variant="link" className="p-0 h-auto text-primary">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                  </Link>
                </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <AwardIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium text-foreground">No school awards to display</h3>
            <p className="mt-1 text-sm text-muted-foreground">We're always striving for excellence!</p>
          </div>
        )}
      </section>
    </div>
  );
}
