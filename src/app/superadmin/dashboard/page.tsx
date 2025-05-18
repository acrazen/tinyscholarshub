
// src/app/superadmin/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cog, Save } from "lucide-react";
import NextImage from 'next/image'; // Renamed to avoid conflict with local 'Image' if any
import { useToast } from '@/hooks/use-toast';
import { useAppCustomization } from '@/context/app-customization-context';

export default function SuperAdminDashboardPage() {
  const { appName: currentAppName, appIconUrl: currentAppIconUrl, setAppName, setAppIconUrl } = useAppCustomization();
  const { toast } = useToast();

  // Local state for form inputs, initialized from context
  const [formAppName, setFormAppName] = useState<string>(currentAppName);
  const [formAppIconUrl, setFormAppIconUrl] = useState<string>(currentAppIconUrl || ""); // Handle null from context

  // Effect to update local form state if context changes (e.g., on initial load)
  useEffect(() => {
    setFormAppName(currentAppName);
    setFormAppIconUrl(currentAppIconUrl || "");
  }, [currentAppName, currentAppIconUrl]);


  const handleSaveChanges = () => {
    setAppName(formAppName);
    setAppIconUrl(formAppIconUrl.trim() ? formAppIconUrl.trim() : null); // Set to null if empty
    toast({
      title: "Settings Updated",
      description: "App name and icon have been updated in the header.",
    });
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
            Global settings for white-labeling the application. Changes will reflect in the app header.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="appName" className="text-base">Custom App Name</Label>
            <Input 
              id="appName" 
              placeholder="Enter custom app name" 
              value={formAppName}
              onChange={(e) => setFormAppName(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              This name will appear in the app header. Try 'My School App'.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="appIconUrl" className="text-base">Custom App Icon URL</Label>
            <Input 
              id="appIconUrl" 
              type="url"
              placeholder="Enter URL for custom app icon (e.g., https://...)" 
              value={formAppIconUrl}
              onChange={(e) => setFormAppIconUrl(e.target.value)}
              className="text-base"
            />
             <p className="text-sm text-muted-foreground">
              Provide a URL for the app's main icon/logo (e.g., from placehold.co or picsum.photos for testing).
            </p>
            {formAppIconUrl && (
              <div className="mt-3 p-3 border rounded-md inline-flex items-center justify-center bg-muted">
                <NextImage // Use the aliased import
                  src={formAppIconUrl} 
                  alt="App Icon Preview" 
                  width={64} 
                  height={64} 
                  className="rounded-md object-contain"
                  data-ai-hint="app logo"
                  unoptimized={true} // To allow various test URLs
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none'; // Hide broken image element
                    // Optionally, show a text placeholder or specific error icon
                    const errorPlaceholder = document.createElement('span');
                    errorPlaceholder.textContent = 'Invalid URL';
                    errorPlaceholder.className = 'text-destructive text-xs';
                    target.parentNode?.appendChild(errorPlaceholder);
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" /> Apply Changes
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
