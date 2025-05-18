
// src/app/superadmin/dashboard/page.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cog, Image as ImageIcon, Save } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function SuperAdminDashboardPage() {
  const [appName, setAppName] = useState<string>("Tiny Scholars Hub (Default)");
  const [appIconUrl, setAppIconUrl] = useState<string>("https://placehold.co/100x100.png?text=AppLogo");
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // In a real app, this would save to a backend.
    // Here, we just simulate it.
    console.log("Simulated Save:", { appName, appIconUrl });
    toast({
      title: "Settings Saved (Simulated)",
      description: "App name and icon URL have been updated in the local state.",
    });
    // Note: These changes won't reflect in the actual Logo component
    // without further integration (e.g., global state/context and backend).
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Cog className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
      </div>
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Application Customization</CardTitle>
          <CardDescription>
            Global settings for white-labeling the application.
            <span className="block text-xs text-muted-foreground mt-1">
              (Note: Changes here are for demonstration and won't persist or globally update the app in this prototype.)
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="appName" className="text-base">Custom App Name</Label>
            <Input 
              id="appName" 
              placeholder="Enter custom app name" 
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              This name would appear globally (e.g., in the header).
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="appIconUrl" className="text-base">Custom App Icon URL</Label>
            <Input 
              id="appIconUrl" 
              type="url"
              placeholder="Enter URL for custom app icon" 
              value={appIconUrl}
              onChange={(e) => setAppIconUrl(e.target.value)}
              className="text-base"
            />
             <p className="text-sm text-muted-foreground">
              Provide a URL for the app's main icon/logo.
            </p>
            {appIconUrl && (
              <div className="mt-3 p-3 border rounded-md inline-flex items-center justify-center bg-muted">
                <Image 
                  src={appIconUrl} 
                  alt="App Icon Preview" 
                  width={64} 
                  height={64} 
                  className="rounded-md object-contain"
                  data-ai-hint="app logo"
                  onError={(e) => {
                    // Fallback for invalid image URLs during demo
                    e.currentTarget.src = "https://placehold.co/64x64.png?text=Error";
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" /> Save Changes (Simulated)
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg rounded-xl mt-8">
        <CardHeader>
            <CardTitle>Other Global Settings</CardTitle>
            <CardDescription>Placeholders for other super admin configurations.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Feature flags, theme overrides, etc., would go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

