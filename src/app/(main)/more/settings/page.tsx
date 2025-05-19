
// src/app/(main)/more/settings/page.tsx
import { Settings, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <Settings className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your app preferences and account settings.
        </p>
      </div>

      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
          <CardDescription>Customize your experience.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center py-6">
            <p className="text-lg text-muted-foreground">
              General app settings are currently under development.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Soon you'll be able to manage notifications, theme, and other preferences here.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-primary" />
              Messaging Preferences
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Customize your chat experience, including notifications, read receipts, and more.
            </p>
            <Link href="/messages/settings" passHref>
              <Button variant="outline">Go to Chat Settings</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 text-center">
        <Separator className="my-6" />
        <div className="flex flex-col items-center space-y-1 text-sm text-muted-foreground">
          <p className="font-medium text-foreground flex items-center">
            Proudly Made in India 
            <Heart className="h-4 w-4 inline-block ml-1.5 text-red-500 fill-red-500" />
          </p>
          <p>by <span className="font-semibold text-primary">Tiny Scholars Hub</span></p>
        </div>
         <p className="text-xs text-muted-foreground/80 mt-4">
          Version 1.0.0 (Prototype)
        </p>
      </div>
    </div>
  );
}
