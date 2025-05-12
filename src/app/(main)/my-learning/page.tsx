// src/app/(main)/my-learning/page.tsx
import { GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MyLearningPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">My Learning</h1>
        <p className="text-muted-foreground">
          Track your child's learning journey, milestones, and educational content.
        </p>
      </div>

      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle>Learning Overview</CardTitle>
          <CardDescription>Access learning materials, progress reports, and activities.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              My Learning section is currently under development.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Soon you'll find personalized learning resources and progress updates here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
