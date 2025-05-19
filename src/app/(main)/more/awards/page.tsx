
// src/app/(main)/more/awards/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Award as AwardIcon, Trophy, Star, Sparkles, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import type { Student, ChildAward } from '@/lib/types';
import { getStudentById } from '@/lib/services/studentService'; // Using service
import { studentsData } from '@/lib/data'; // Direct import for schoolAwardsData for now
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface SchoolAward {
  id: string;
  title: string;
  awardingBody: string;
  year: string;
  description: string;
  icon?: JSX.Element;
  imageUrl?: string;
  dataAiHint?: string;
}

// This data remains for general school awards
const schoolAwardsData: SchoolAward[] = [
  {
    id: 'award1',
    title: 'Best Early Learning Center 2023',
    awardingBody: 'National Education Excellence',
    year: '2023',
    description: 'Recognized for innovative teaching methodologies and nurturing environment.',
    icon: <Trophy className="h-8 w-8 text-yellow-500" />,
    dataAiHint: "award trophy",
  },
  {
    id: 'award2',
    title: 'Child Safety Excellence Award',
    awardingBody: 'SafeKids Foundation',
    year: '2022',
    description: 'Awarded for maintaining the highest standards of child safety and security.',
    imageUrl: 'https://picsum.photos/seed/safetyaward/80/80', // Updated placeholder
    dataAiHint: "safety shield",
  },
  {
    id: 'award3',
    title: 'Green School Initiative Award',
    awardingBody: 'Environmental Education Board',
    year: '2023',
    description: 'For outstanding efforts in promoting environmental awareness and sustainability.',
    icon: <Star className="h-8 w-8 text-green-500 fill-green-500" />,
    dataAiHint: "green award",
  },
  {
    id: 'award4',
    title: 'Community Engagement Award',
    awardingBody: 'Local Community Council',
    year: '2021',
    description: 'Acknowledged for fostering strong relationships with local families and community members.',
    imageUrl: 'https://picsum.photos/seed/communityaward/80/80', // Updated placeholder
    dataAiHint: "community hands",
  },
];

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


export default function AwardsAndRecognitionsPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      try {
        // For prototype, always fetch the first student to simulate "my child"
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

      {/* Section for My Child's Awards */}
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

      {/* Section for School Awards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">Our School's Recognitions</h2>
        {schoolAwardsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schoolAwardsData.map((award) => (
              <Card key={award.id} className="shadow-lg rounded-xl flex flex-col">
                <CardHeader className="flex flex-row items-start space-x-4 p-5 bg-muted/20">
                  {award.icon ? (
                    <div className="p-3 bg-background rounded-lg shadow-sm flex-shrink-0">
                      {award.icon}
                    </div>
                  ) : award.imageUrl ? (
                    <div className="p-1 bg-background rounded-lg shadow-sm flex-shrink-0">
                      <Image 
                          src={award.imageUrl} 
                          alt={`${award.title} icon`} 
                          width={60} 
                          height={60} 
                          className="rounded-md object-contain"
                          data-ai-hint={award.dataAiHint || "award image"}
                      />
                    </div>
                  ) : <div className="p-3 bg-background rounded-lg shadow-sm flex-shrink-0"><AwardIcon className="h-8 w-8 text-muted-foreground" /></div> }
                  <div className="flex-grow">
                    <CardTitle className="text-xl">{award.title}</CardTitle>
                    <CardDescription className="text-sm">
                      Awarded by: {award.awardingBody} - {award.year}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-5 flex-grow">
                  <p className="text-sm text-muted-foreground leading-relaxed">{award.description}</p>
                </CardContent>
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
