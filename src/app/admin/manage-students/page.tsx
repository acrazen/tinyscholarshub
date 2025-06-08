
// src/app/admin/manage-students/page.tsx
"use client"; 

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { UserCircle2, UserPlus, ArrowRight, Edit3, ShieldAlert, Search, Filter, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllStudents } from '@/lib/services/studentService';
import type { Student } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function ManageStudentsPage() {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const fetchedStudents = await getAllStudents();
        setAllStudents(fetchedStudents);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast({
          title: "Error",
          description: "Could not load student profiles.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };
    fetchStudents();
  }, [toast]);

  const uniqueClasses = useMemo(() => {
    const classes = new Set(allStudents.map(student => student.className));
    return ['all', ...Array.from(classes)];
  }, [allStudents]);

  const filteredStudents = useMemo(() => {
    return allStudents.filter(student => {
      const nameMatch = `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
      const classMatch = selectedClass === 'all' || student.className === selectedClass;
      return nameMatch && classMatch;
    });
  }, [allStudents, searchTerm, selectedClass]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading student profiles...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <UserCircle2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Manage Student Profiles</h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Add, view, and manage all student profiles in the school system.
          </p>
        </div>
        <Button className="mt-4 md:mt-0" disabled> {/* Add Student functionality can be future enhancement */}
          <UserPlus className="mr-2 h-5 w-5" /> Add New Student
        </Button>
      </div>

      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Filter className="mr-2 h-5 w-5 text-primary" />
            Filter & Search Students
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 p-4">
          <div className="relative flex-grow">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              {uniqueClasses.map(className => (
                <SelectItem key={className} value={className}>
                  {className === 'all' ? 'All Classes' : className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((kid: Student) => (
            <Card key={kid.id} className="shadow-lg rounded-xl overflow-hidden flex flex-col">
              <CardHeader className="items-center text-center p-6 bg-muted/20">
                <Avatar className="w-24 h-24 mb-3 border-2 border-background shadow-sm">
                  <AvatarImage src={kid.profilePhotoUrl} alt={`${kid.firstName} ${kid.lastName}`} data-ai-hint="child portrait" />
                  <AvatarFallback className="text-3xl">
                    {kid.firstName.charAt(0)}{kid.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{`${kid.firstName} ${kid.lastName}`}</CardTitle>
                <CardDescription>Class: {kid.className}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 flex-grow space-y-3">
                {kid.allergies && kid.allergies.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <ShieldAlert className="h-4 w-4 text-destructive flex-shrink-0" />
                    <span className="font-medium">Allergies:</span>
                    <div className="flex flex-wrap gap-1">
                      {kid.allergies.map(allergy => (
                        <Badge key={allergy} variant="destructive" className="text-xs">{allergy}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {kid.notes || "No additional notes for this child."}
                </p>
              </CardContent>
              <div className="p-4 border-t mt-auto">
                <div className="flex space-x-2">
                  <Link href={`/portfolio/${kid.id}`} passHref className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Full Profile <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/manage-students/${kid.id}/edit`} passHref>
                    <Button variant="secondary" size="icon" aria-label="Edit Profile">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-muted/30 rounded-lg">
          <UserCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-medium text-foreground">
            {allStudents.length > 0 ? 'No students match your search criteria.' : 'No student profiles found.'}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
             {allStudents.length > 0 ? 'Try adjusting your search or filters.' : 'Get started by adding a student\'s profile.'}
          </p>
        </div>
      )}
    </div>
  );
}
