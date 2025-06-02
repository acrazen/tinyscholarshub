// src/app/global-error.tsx
"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { WifiOff, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Global Error Boundary Caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
          <Card className="w-full max-w-md shadow-xl rounded-xl">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Oops! Something Went Wrong</CardTitle>
              <CardDescription>
                We encountered an unexpected issue. Please try again.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If the problem persists, please contact support or try returning to the homepage.
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
                  Try Again
                </Button>
                <Link href="/" legacyBehavior>
                  <Button variant="outline" size="lg" asChild><a>Go to Homepage</a></Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}
