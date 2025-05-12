
// src/app/offline/page.tsx
import { WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <WifiOff className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">You're Offline</CardTitle>
          <CardDescription>
            It seems you're not connected to the internet. Some features may not be available.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Please check your network connection. Pages you've visited before might still be accessible.
          </p>
          <Link href="/">
            <Button variant="outline">Try Homepage</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
