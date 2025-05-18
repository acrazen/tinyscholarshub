// src/app/(main)/more/settings/page.tsx
import { Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
        <CardContent className="p-6">
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              Settings page is currently under development.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Soon you'll be able to manage notifications, theme, and other preferences here.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <Separator className="my-4" />
        <p>Proudly Made in India</p>
        <p>By Tiny Scholars Hub</p>
      </div>
    </div>
  );
}
