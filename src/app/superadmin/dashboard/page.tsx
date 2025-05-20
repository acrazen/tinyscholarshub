
// src/app/superadmin/dashboard/page.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Cog, Save, Palette, Image as ImageIcon, Puzzle, Users2 } from "lucide-react";
import NextImage from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAppCustomization, type AppModuleKey, type UserRole } from '@/context/app-customization-context';
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

// Define modules that can be toggled
const manageableModules: { key: AppModuleKey; label: string; description: string }[] = [
  { key: 'messaging', label: 'Messaging', description: 'Enable/disable direct messaging features.' },
  { key: 'myLearning', label: 'My Learning', description: 'Enable/disable the "My Learning" section for students/parents.' },
  { key: 'portfolio', label: 'Portfolio', description: 'Enable/disable the student portfolio viewing feature.' },
  { key: 'eventBooking', label: 'Event Booking', description: 'Enable/disable school event booking functionality.' },
  { key: 'resources', label: 'Resources', description: 'Enable/disable access to shared school resources.' },
  { key: 'statementOfAccount', label: 'Statement of Account', description: 'Enable/disable viewing financial statements.' },
  { key: 'eService', label: 'eService', description: 'Enable/disable general eServices portal.' },
  // { key: 'settings', label: 'Settings Page', description: 'Enable/disable user access to the settings page.' }, // Settings usually core
  { key: 'adminManageStudents', label: 'Admin: Manage Students', description: 'Enable/disable student management for admins.' },
  { key: 'teacherSmartUpdate', label: 'Teacher: Smart Update', description: 'Enable/disable AI update generator for teachers.' },
];

const userRoles: UserRole[] = ['SuperAdmin', 'Admin', 'Teacher', 'Parent'];

export default function SuperAdminDashboardPage() {
  const { 
    appName: currentAppName, 
    appIconUrl: currentAppIconUrl, 
    primaryColor: currentPrimaryColor,
    secondaryColor: currentSecondaryColor,
    moduleSettings,
    currentUserRole, // Get current role
    setAppName, 
    setAppIconUrl,
    setPrimaryColor,
    setSecondaryColor,
    toggleModule,
    setCurrentUserRole // Get role setter
  } = useAppCustomization();
  const { toast } = useToast();

  const [formAppName, setFormAppName] = useState<string>(currentAppName);
  const [formAppIconUrl, setFormAppIconUrl] = useState<string>(currentAppIconUrl || "");
  const [rawPrimaryColorInput, setRawPrimaryColorInput] = useState<string>(currentPrimaryColor);
  const [rawSecondaryColorInput, setRawSecondaryColorInput] = useState<string>(currentSecondaryColor);

  const [secondaryColorSuggestions, setSecondaryColorSuggestions] = useState<HSLColor[]>([]);

  useEffect(() => {
    setFormAppName(currentAppName);
    setFormAppIconUrl(currentAppIconUrl || "");
    setRawPrimaryColorInput(currentPrimaryColor);
    setRawSecondaryColorInput(currentSecondaryColor);
  }, [currentAppName, currentAppIconUrl, currentPrimaryColor, currentSecondaryColor]);

  useEffect(() => {
    let baseHslForSuggestions: HSLColor | null = parseHslString(currentPrimaryColor);
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
  }, [rawPrimaryColorInput, currentPrimaryColor]);

  const handleSaveChanges = () => {
    let finalPrimaryHsl: string | null = null;
    let finalSecondaryHsl: string | null = null;

    if (isValidHslColorString(rawPrimaryColorInput)) {
      finalPrimaryHsl = rawPrimaryColorInput;
    } else if (isHexColorString(rawPrimaryColorInput)) {
      const hsl = hexToHsl(rawPrimaryColorInput);
      if (hsl) finalPrimaryHsl = hslToString(hsl);
    }

    if (!finalPrimaryHsl) {
      toast({ title: "Invalid Primary Color", description: "Primary color must be a valid HSL string or HEX code.", variant: "destructive"});
      return;
    }

    if (isValidHslColorString(rawSecondaryColorInput)) {
      finalSecondaryHsl = rawSecondaryColorInput;
    } else if (isHexColorString(rawSecondaryColorInput)) {
      const hsl = hexToHsl(rawSecondaryColorInput);
      if (hsl) finalSecondaryHsl = hslToString(hsl);
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
      description: "App customization settings have been applied (frontend simulation).",
    });
  };
  
  const handleSecondarySuggestionSelect = (hslString: string) => {
    setRawSecondaryColorInput(hslString);
  };

  const getColorPreviewStyle = (colorInput: string): React.CSSProperties => {
    if (isValidHslColorString(colorInput)) return { backgroundColor: `hsl(${colorInput})` };
    if (isHexColorString(colorInput)) return { backgroundColor: colorInput };
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
            Global settings for white-labeling the application. Changes will reflect across the app (frontend simulation).
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="appIconUrl" className="text-base">Custom App Icon URL</Label>
            <Input 
              id="appIconUrl" 
              type="url"
              placeholder="Enter URL for custom app icon" 
              value={formAppIconUrl}
              onChange={(e) => setFormAppIconUrl(e.target.value)}
              className="text-base"
            />
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
                  onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }}
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
            <Save className="mr-2 h-4 w-4" /> Apply Branding Changes
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Users2 className="h-5 w-5 text-muted-foreground" />
            <CardTitle>User Role Simulation</CardTitle>
          </div>
          <CardDescription>
            Switch the current user role to test UI changes (frontend simulation only).
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-2">
          <Label htmlFor="userRoleSelect" className="text-base">Current Simulated Role</Label>
          <Select value={currentUserRole} onValueChange={(value) => setCurrentUserRole(value as UserRole)}>
            <SelectTrigger id="userRoleSelect" className="w-full md:w-1/2 text-base">
              <SelectValue placeholder="Select a role..." />
            </SelectTrigger>
            <SelectContent>
              {userRoles.map((role) => (
                <SelectItem key={role} value={role} className="text-base">
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Puzzle className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Module Management</CardTitle>
          </div>
          <CardDescription>
            Enable or disable specific features/modules for this instance of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {manageableModules.map(module => (
            <div key={module.key} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 hover:bg-muted/50">
              <div>
                <Label htmlFor={`module-${module.key}`} className="text-base font-medium">
                  {module.label}
                </Label>
                <p className="text-xs text-muted-foreground">{module.description}</p>
              </div>
              <Switch
                id={`module-${module.key}`}
                checked={moduleSettings[module.key] ?? true} // Default to true if not set
                onCheckedChange={() => toggleModule(module.key)}
                aria-label={`Toggle ${module.label} module`}
              />
            </div>
          ))}
        </CardContent>
         <CardFooter className="border-t pt-6">
          <p className="text-sm text-muted-foreground">Module changes are applied instantly (frontend simulation).</p>
        </CardFooter>
      </Card>

      <Card className="shadow-lg rounded-xl mt-8 opacity-70">
        <CardHeader>
            <CardTitle>Other Global Settings (Ideas)</CardTitle>
            <CardDescription>Placeholders for future super admin configurations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
            <p>- Feature Flags (More granular)</p>
            <p>- Default Language Settings & Timezone</p>
            <p>- Master Font Selection</p>
            <p>- Manage Terms of Service / Privacy Policy links</p>
            <p>- Integration keys (e.g., payment gateway, analytics)</p>
        </CardContent>
      </Card>
    </div>
  );
}
