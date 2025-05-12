import Image from 'next/image';
import type { Student } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cake, Users, ShieldAlert, Info } from 'lucide-react';
import { format } from 'date-fns';

interface StudentProfileViewProps {
  student: Student;
}

export function StudentProfileView({ student }: StudentProfileViewProps) {
  const dob = format(new Date(student.dateOfBirth), 'MMMM d, yyyy');

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="items-center text-center p-6 bg-muted/30 rounded-t-xl">
        <Avatar className="w-32 h-32 mb-4 border-4 border-background shadow-md">
          <AvatarImage src={student.profilePhotoUrl} alt={`${student.firstName} ${student.lastName}`} data-ai-hint="student portrait" />
          <AvatarFallback className="text-4xl">
            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">{`${student.firstName} ${student.lastName}`}</CardTitle>
        <CardDescription className="text-base">Class: {student.className}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <Cake className="h-5 w-5 text-primary" />
          <span className="text-sm"><strong>Date of Birth:</strong> {dob}</span>
        </div>
        {student.allergies && student.allergies.length > 0 && (
          <div className="flex items-start space-x-3">
            <ShieldAlert className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold">Allergies:</span>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {student.allergies.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {student.notes && (
           <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
             <div>
               <span className="text-sm font-semibold">Notes:</span>
               <p className="text-sm text-muted-foreground">{student.notes}</p>
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
