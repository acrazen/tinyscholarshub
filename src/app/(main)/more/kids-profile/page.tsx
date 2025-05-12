// src/app/(main)/more/kids-profile/page.tsx
import { UserCircle2, Construction, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function KidsProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] py-8">
      <Card className="w-full max-w-md shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <UserCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Kid's Profile</CardTitle>
          <CardDescription>View and manage your child's profile information.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Construction className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
          <p className="text-lg text-foreground mb-2">
            Coming Soon!
          </p>
          <p className="text-muted-foreground mb-6">
            This section is currently under construction. We're working hard to bring you this feature.
          </p>
          <Link href="/more">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to More Options
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
