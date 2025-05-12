// src/app/admin/manage-students/page.tsx
// This page was formerly src/app/(main)/more/kids-profile/page.tsx
// It's now an admin/teacher feature to manage all student profiles.

import Link from 'next/link';
import Image from 'next/image';
import { UserCircle2, UserPlus, ArrowRight, Edit3, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { studentsData } from '@/lib/data'; // In a real app, fetch this based on admin rights
import type { Student } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export default function ManageStudentsPage() {
  const kids = studentsData; // Admins/Teachers see all students

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
        <Button className="mt-4 md:mt-0">
          <UserPlus className="mr-2 h-5 w-5" /> Add New Student
        </Button>
      </div>

      {kids.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kids.map((kid: Student) => (
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
                    {/* Link to the general student detail page, accessible by multiple roles */}
                    <Link href={`/students/${kid.id}`} passHref className="flex-1">
                        <Button variant="outline" className="w-full">
                        View Full Profile <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Button variant="secondary" size="icon" aria-label="Edit Profile">
                        <Edit3 className="h-4 w-4" />
                    </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <UserCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-medium text-foreground">No student profiles found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Get started by adding a student's profile.</p>
        </div>
      )}
    </div>
  );
}
