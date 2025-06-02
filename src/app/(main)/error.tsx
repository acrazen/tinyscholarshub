// src/app/(main)/error.tsx
"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function MainAppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Main App Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-background p-4 text-center">
      <Card className="w-full max-w-md shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">An Error Occurred</CardTitle>
          <CardDescription>
            Sorry, something went wrong while trying to load this part of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You can try to refresh the page or go back to the homepage.
          </p>
           {error.message && (
            <details className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
              <summary>Error Details (for debugging)</summary>
              <pre className="mt-1 whitespace-pre-wrap break-all">{error.message}</pre>
              {error.digest && <pre className="mt-1">Digest: {error.digest}</pre>}
            </details>
          )}
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={() => reset()} variant="default" size="lg">
              Refresh Page
            </Button>
             <Link href="/" legacyBehavior>
                <Button variant="outline" size="lg" asChild><a>Go to Homepage</a></Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
