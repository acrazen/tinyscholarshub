// src/app/(main)/more/eservice/page.tsx
import { FilePenLine } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function EServicePage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <FilePenLine className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">eServices</h1>
        <p className="text-muted-foreground">
          Access various online services provided by the school.
        </p>
      </div>

      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle>Available eServices</CardTitle>
          <CardDescription>Manage forms, requests, and other digital services.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              eServices portal is currently under development.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Soon you'll be able to submit forms, make requests, and access other online services conveniently.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}