// src/app/superadmin/dashboard/page.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cog, Save, Palette, Image as ImageIcon } from "lucide-react";
import NextImage from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAppCustomization } from '@/context/app-customization-context';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  type HSLColor, 
  parseHslString, 
  hslToString, 
  generateLighterVariants, 
  isValidHslColorString,
  isHexColorString,
  hexToHsl
} from '@/lib/color-utils';

export default function SuperAdminDashboardPage() {
  const { 
    appName: currentAppName, 
    appIconUrl: currentAppIconUrl, 
    primaryColor: currentPrimaryColor,
    secondaryColor: currentSecondaryColor,
    setAppName, 
    setAppIconUrl,
    setPrimaryColor,
    setSecondaryColor
  } = useAppCustomization();
  const { toast } = useToast();

  const [formAppName, setFormAppName] = useState<string>(currentAppName);
  const [formAppIconUrl, setFormAppIconUrl] = useState<string>(currentAppIconUrl || "");
  const [rawPrimaryColorInput, setRawPrimaryColorInput] = useState<string>(currentPrimaryColor);
  const [rawSecondaryColorInput, setRawSecondaryColorInput] = useState<string>(currentSecondaryColor);

  const [secondaryColorSuggestions, setSecondaryColorSuggestions] = useState<HSLColor[]>([]);

  // Effect to initialize form state from context
  useEffect(() => {
    setFormAppName(currentAppName);
    setFormAppIconUrl(currentAppIconUrl || "");
    setRawPrimaryColorInput(currentPrimaryColor); // context always stores HSL
    setRawSecondaryColorInput(currentSecondaryColor); // context always stores HSL
  }, [currentAppName, currentAppIconUrl, currentPrimaryColor, currentSecondaryColor]);

  // Generate secondary color suggestions when primary color (from context, which is HSL) changes
  // or when rawPrimaryColorInput is a valid HSL string
  useEffect(() => {
    let baseHslForSuggestions: HSLColor | null = parseHslString(currentPrimaryColor); // Default to context HSL

    // If user types a valid HSL in the input, use that for immediate suggestion updates
    const parsedInput = parseHslString(rawPrimaryColorInput);
    if (parsedInput) {
      baseHslForSuggestions = parsedInput;
    }
    
    if (baseHslForSuggestions) {
      const suggestions = generateLighterVariants(baseHslForSuggestions, 5, 8);
      setSecondaryColorSuggestions(suggestions);
    } else {
      setSecondaryColorSuggestions([]);
    }
  }, [rawPrimaryColorInput, currentPrimaryColor]); // React to raw input for suggestions

  const handleSaveChanges = () => {
    let finalPrimaryHsl: string | null = null;
    let finalSecondaryHsl: string | null = null;

    // Process Primary Color
    if (isValidHslColorString(rawPrimaryColorInput)) {
      finalPrimaryHsl = rawPrimaryColorInput;
    } else if (isHexColorString(rawPrimaryColorInput)) {
      const hsl = hexToHsl(rawPrimaryColorInput);
      if (hsl) {
        finalPrimaryHsl = hslToString(hsl);
      }
    }

    if (!finalPrimaryHsl) {
      toast({ title: "Invalid Primary Color", description: "Primary color must be a valid HSL string (e.g., '25 95% 55%') or HEX code (e.g., '#FF8C00').", variant: "destructive"});
      return;
    }

    // Process Secondary Color
    if (isValidHslColorString(rawSecondaryColorInput)) {
      finalSecondaryHsl = rawSecondaryColorInput;
    } else if (isHexColorString(rawSecondaryColorInput)) {
      const hsl = hexToHsl(rawSecondaryColorInput);
      if (hsl) {
        finalSecondaryHsl = hslToString(hsl);
      }
    }

    if (!finalSecondaryHsl) {
      toast({ title: "Invalid Secondary Color", description: "Secondary color must be a valid HSL string or HEX code.", variant: "destructive"});
      return;
    }
    
    setAppName(formAppName);
    setAppIconUrl(formAppIconUrl.trim() ? formAppIconUrl.trim() : null);
    setPrimaryColor(finalPrimaryHsl);
    setSecondaryColor(finalSecondaryHsl);
    
    toast({
      title: "Settings Updated",
      description: "App customization settings have been applied.",
    });
  };
  
  const handleSecondarySuggestionSelect = (hslString: string) => {
    setRawSecondaryColorInput(hslString); // Update the raw input with the HSL string
  };

  const getColorPreviewStyle = (colorInput: string): React.CSSProperties => {
    if (isValidHslColorString(colorInput)) {
      return { backgroundColor: `hsl(${colorInput})` };
    }
    if (isHexColorString(colorInput)) {
      return { backgroundColor: colorInput };
    }
    return { backgroundColor: 'transparent', border: '1px dashed #ccc' };
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
            Global settings for white-labeling the application. Changes will reflect across the app.
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
              Provide a URL for the app's main icon/logo. For testing, use a placehold.co or picsum.photos URL.
            </p>
            {formAppIconUrl ? (
              <div className="mt-3 p-3 border rounded-md inline-flex items-center justify-center bg-muted">
                <NextImage 
                  src={formAppIconUrl} 
                  alt="App Icon Preview" 
                  width={64} 
                  height={64} 
                  className="rounded-md object-contain"
                  data-ai-hint="custom logo"
                  unoptimized={true} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentNode as HTMLElement;
                    target.style.display = 'none'; 
                    
                    const existingError = parent.querySelector('.error-placeholder');
                    if (existingError) parent.removeChild(existingError);

                    const errorPlaceholder = document.createElement('span');
                    errorPlaceholder.textContent = 'Invalid URL';
                    errorPlaceholder.className = 'text-destructive text-xs error-placeholder';
                    parent.appendChild(errorPlaceholder);
                  }}
                />
              </div>
            ) : (
              <div className="mt-3 p-3 border rounded-md inline-flex items-center justify-center bg-muted h-[88px] w-[88px]">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </div>

          <Separator />

          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Theme Colors</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor" className="text-base">Primary Color (HSL or HEX)</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  id="primaryColor" 
                  placeholder="e.g., 25 95% 55% or #FF8C00" 
                  value={rawPrimaryColorInput}
                  onChange={(e) => setRawPrimaryColorInput(e.target.value)}
                  className="text-base flex-grow"
                />
                <div 
                  className="w-8 h-8 rounded-md border shrink-0" 
                  style={getColorPreviewStyle(rawPrimaryColorInput)}
                  title="Primary Color Preview"
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter HSL (e.g., "25 95% 55%") or HEX (e.g., "#FF8C00").
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor" className="text-base">Secondary Color (HSL or HEX)</Label>
               <div className="flex items-center space-x-2">
                <Input 
                  id="secondaryColor" 
                  placeholder="e.g., 25 95% 75% or #FFA500" 
                  value={rawSecondaryColorInput}
                  onChange={(e) => setRawSecondaryColorInput(e.target.value)}
                  className="text-base flex-grow"
                />
                 <div 
                  className="w-8 h-8 rounded-md border shrink-0" 
                  style={getColorPreviewStyle(rawSecondaryColorInput)}
                  title="Secondary Color Preview"
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter HSL or HEX. Lighter variants of primary are suggested below if primary is HSL.
              </p>
              {secondaryColorSuggestions.length > 0 && (
                <div className="mt-2 space-y-1">
                  <Label htmlFor="secondaryColorSuggestions" className="text-xs text-muted-foreground">Or pick a lighter variant (based on Primary HSL):</Label>
                  <Select onValueChange={handleSecondarySuggestionSelect} value={rawSecondaryColorInput}>
                    <SelectTrigger id="secondaryColorSuggestions" className="w-full text-sm">
                      <SelectValue placeholder="Select a light variant..." />
                    </SelectTrigger>
                    <SelectContent>
                      {secondaryColorSuggestions.map((hsl, index) => {
                        const hslStr = hslToString(hsl);
                        return (
                          <SelectItem key={index} value={hslStr}>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 rounded border" style={{backgroundColor: `hsl(${hslStr})`}}></div>
                              <span>{hslStr}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
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
            <CardTitle>Other Global Settings (Ideas)</CardTitle>
            <CardDescription>Placeholders for future super admin configurations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
            <p>- Feature Flags (Enable/disable app modules)</p>
            <p>- Default Language Settings & Timezone</p>
            <p>- Master Font Selection (Advanced)</p>
            <p>- Manage Terms of Service / Privacy Policy links</p>
            <p>- Integration keys for third-party services (e.g., payment gateway, analytics)</p>
            <p>- Email notification templates & SMTP settings</p>
            <p>- Branding: Favicon URL</p>
        </CardContent>
      </Card>
    </div>
  );
}

