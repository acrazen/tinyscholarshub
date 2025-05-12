import Link from 'next/link';
import Image from 'next/image';
import { studentsData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function StudentsListPage() {
  const students = studentsData; // Fetch or import students data

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center md:text-left">Our Little Scholars</h1>
      {students.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student) => (
            <Card key={student.id} className="overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] w-full relative">
                  <Image
                    src={student.profilePhotoUrl}
                    alt={`${student.firstName} ${student.lastName}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                    data-ai-hint="student portrait"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-1">{`${student.firstName} ${student.lastName}`}</CardTitle>
                <p className="text-sm text-muted-foreground mb-3">Class: {student.className}</p>
                <Link href={`/students/${student.id}`} passHref>
                  <Button variant="outline" className="w-full">
                    View Profile <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No students found.</p>
        </div>
      )}
    </div>
  );
}
