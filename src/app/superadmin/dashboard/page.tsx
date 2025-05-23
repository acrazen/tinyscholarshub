
// src/app/superadmin/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Cog,
  Save,
  Palette,
  Image as ImageIcon,
  Puzzle,
  Users2,
  School,
  PlusCircle,
  Briefcase,
  Building,
  DollarSign,
  Settings,
  ExternalLink,
  Link as LinkIcon
} from 'lucide-react';
import NextImage from 'next/image';
import { useToast } from '@/hooks/use-toast';
import {
  useAppCustomization,
  type AppModuleKey,
} from '@/context/app-customization-context';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  type HSLColor,
  parseHslString,
  hslToString,
  generateLighterVariants,
  isValidHslColorString,
  isHexColorString,
  hexToHsl,
} from '@/lib/color-utils';
import type { UserRole } from '@/lib/types';
import Link from 'next/link';

const manageableModules: {
  key: AppModuleKey;
  label: string;
  description: string;
}[] = [
  {
    key: 'messaging',
    label: 'Messaging',
    description: 'Enable/disable direct messaging features.',
  },
  {
    key: 'myLearning',
    label: 'My Learning',
    description: 'Enable/disable the "My Learning" section.',
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    description: 'Enable/disable student portfolio viewing.',
  },
  {
    key: 'eventBooking',
    label: 'Event Booking',
    description: 'Enable/disable school event booking.',
  },
  {
    key: 'resources',
    label: 'Resources',
    description: 'Enable/disable shared school resources.',
  },
  {
    key: 'statementOfAccount',
    label: 'Statement of Account',
    description: 'Enable/disable financial statements view.',
  },
  {
    key: 'eService',
    label: 'eService',
    description: 'Enable/disable general eServices portal.',
  },
  {
    key: 'settings',
    label: 'Settings Page Access',
    description: 'Enable/disable user access to settings.',
  },
  {
    key: 'adminManageStudents',
    label: 'School Admin: Manage Students',
    description: 'Student management for School Admins.',
  },
  {
    key: 'teacherSmartUpdate',
    label: 'Teacher: Smart Update',
    description: 'AI update generator for Teachers.',
  },
  {
    key: 'paymentGateway',
    label: 'Payment Gateway',
    description: 'Enable/disable payment gateway features for schools.',
  },
];

const allUserRolesForSimulation: UserRole[] = [
  'SuperAdmin',
  'AppManager_Management',
  'AppManager_Sales',
  'AppManager_Finance',
  'AppManager_Support',
  'SchoolAdmin',
  'SchoolDataEditor',
  'SchoolFinanceManager',
  'ClassTeacher',
  'Teacher',
  'Parent',
  'Subscriber',
];

export default function SuperAdminDashboardPage() {
  const {
    appName: currentAppName,
    appIconUrl: currentAppIconUrl,
    primaryColor: currentPrimaryColor,
    secondaryColor: currentSecondaryColor,
    moduleSettings,
    currentUser,
    tempSetUserRole,
    setAppName,
    setAppIconUrl,
    setPrimaryColor,
    setSecondaryColor,
    toggleModule,
  } = useAppCustomization();
  const { toast } = useToast();

  const [formAppName, setFormAppName] = useState<string>(currentAppName);
  const [formAppIconUrl, setFormAppIconUrl] = useState<string>(
    currentAppIconUrl || ''
  );
  const [rawPrimaryColorInput, setRawPrimaryColorInput] =
    useState<string>(currentPrimaryColor);
  const [rawSecondaryColorInput, setRawSecondaryColorInput] =
    useState<string>(currentSecondaryColor);

  const [secondaryColorSuggestions, setSecondaryColorSuggestions] = useState<
    HSLColor[]
  >([]);

  useEffect(() => {
    setFormAppName(currentAppName);
    setFormAppIconUrl(currentAppIconUrl || '');
    setRawPrimaryColorInput(currentPrimaryColor);
    setRawSecondaryColorInput(currentSecondaryColor);
  }, [
    currentAppName,
    currentAppIconUrl,
    currentPrimaryColor,
    currentSecondaryColor,
  ]);

  useEffect(() => {
    let baseHslForSuggestions: HSLColor | null = null;
    if (isValidHslColorString(rawPrimaryColorInput)) {
      baseHslForSuggestions = parseHslString(rawPrimaryColorInput);
    } else if (isHexColorString(rawPrimaryColorInput)) {
      baseHslForSuggestions = hexToHsl(rawPrimaryColorInput);
    }

    if (baseHslForSuggestions) {
      const suggestions = generateLighterVariants(baseHslForSuggestions, 5, 8);
      setSecondaryColorSuggestions(suggestions);
    } else {
      setSecondaryColorSuggestions([]);
    }
  }, [rawPrimaryColorInput]);

  const handleBrandingSaveChanges = () => {
    let finalPrimaryHsl: string | null = null;
    let finalSecondaryHsl: string | null = null;

    if (isValidHslColorString(rawPrimaryColorInput)) {
      finalPrimaryHsl = rawPrimaryColorInput;
    } else if (isHexColorString(rawPrimaryColorInput)) {
      const hsl = hexToHsl(rawPrimaryColorInput);
      if (hsl) finalPrimaryHsl = hslToString(hsl);
    }

    if (!finalPrimaryHsl) {
      toast({
        title: 'Invalid Primary Color',
        description:
          "Primary color must be a valid HSL string (e.g., 'H S% L%') or HEX code (e.g., '#RRGGBB').",
        variant: 'destructive',
      });
      return;
    }

    if (isValidHslColorString(rawSecondaryColorInput)) {
      finalSecondaryHsl = rawSecondaryColorInput;
    } else if (isHexColorString(rawSecondaryColorInput)) {
      const hsl = hexToHsl(rawSecondaryColorInput);
      if (hsl) finalSecondaryHsl = hslToString(hsl);
    }

    if (!finalSecondaryHsl) {
      toast({
        title: 'Invalid Secondary Color',
        description:
          "Secondary color must be a valid HSL string (e.g., 'H S% L%') or HEX code (e.g., '#RRGGBB').",
        variant: 'destructive',
      });
      return;
    }

    setAppName(formAppName);
    setAppIconUrl(formAppIconUrl.trim() ? formAppIconUrl.trim() : null);
    setPrimaryColor(finalPrimaryHsl);
    setSecondaryColor(finalSecondaryHsl);

    toast({
      title: 'Branding Updated',
      description:
        'App customization settings have been applied (frontend simulation).',
    });
  };

  const handleSecondarySuggestionSelect = (hslString: string) => {
    setRawSecondaryColorInput(hslString);
  };

  const getColorPreviewStyle = (
    colorInput: string
  ): React.CSSProperties => {
    if (isValidHslColorString(colorInput))
      return { backgroundColor: `hsl(${colorInput})` };
    if (isHexColorString(colorInput)) return { backgroundColor: colorInput };
    return { backgroundColor: 'transparent', border: '1px dashed #ccc' };
  };


  if (currentUser?.role !== 'SuperAdmin') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Briefcase className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <Cog className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">
          Super Admin Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5 text-primary" />
                App Branding & Theme
              </CardTitle>
              <CardDescription>
                Global settings for white-labeling the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="appName">Custom App Name</Label>
                <Input
                  id="appName"
                  placeholder="Enter custom app name"
                  value={formAppName}
                  onChange={(e) => setFormAppName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="appIconUrl">Custom App Icon URL</Label>
                <Input
                  id="appIconUrl"
                  type="url"
                  placeholder="Enter URL for custom app icon"
                  value={formAppIconUrl}
                  onChange={(e) => setFormAppIconUrl(e.target.value)}
                />
                {formAppIconUrl ? (
                  <div className="mt-2 p-2 border rounded-md inline-flex items-center justify-center bg-muted/50">
                    <NextImage
                      src={formAppIconUrl}
                      alt="App Icon Preview"
                      width={48}
                      height={48}
                      className="rounded-md object-contain"
                      data-ai-hint="custom logo"
                      unoptimized={true}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        console.error("Failed to load custom app icon:", formAppIconUrl);
                      }}
                    />
                  </div>
                ) : (
                  <div className="mt-2 p-2 border rounded-md inline-flex items-center justify-center bg-muted/50 h-[64px] w-[64px]">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="primaryColor">
                    Primary Color (HSL or HEX)
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryColor"
                      placeholder="e.g., 25 95% 55% or #FF8C00"
                      value={rawPrimaryColorInput}
                      onChange={(e) => setRawPrimaryColorInput(e.target.value)}
                      className="flex-grow"
                    />
                    <div
                      className="w-8 h-8 rounded-md border shrink-0"
                      style={getColorPreviewStyle(rawPrimaryColorInput)}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="secondaryColor">
                    Secondary Color (HSL or HEX)
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondaryColor"
                      placeholder="e.g., 25 95% 75% or #FFA500"
                      value={rawSecondaryColorInput}
                      onChange={(e) =>
                        setRawSecondaryColorInput(e.target.value)
                      }
                      className="flex-grow"
                    />
                    <div
                      className="w-8 h-8 rounded-md border shrink-0"
                      style={getColorPreviewStyle(rawSecondaryColorInput)}
                    ></div>
                  </div>
                  {secondaryColorSuggestions.length > 0 && (
                    <div className="mt-1 space-y-1">
                      <Label
                        htmlFor="secondaryColorSuggestions"
                        className="text-xs text-muted-foreground"
                      >
                        Or pick a lighter variant:
                      </Label>
                      <Select
                        onValueChange={handleSecondarySuggestionSelect}
                        value={rawSecondaryColorInput}
                      >
                        <SelectTrigger
                          id="secondaryColorSuggestions"
                          className="w-full text-xs h-9"
                        >
                          <SelectValue placeholder="Select light variant..." />
                        </SelectTrigger>
                        <SelectContent>
                          {secondaryColorSuggestions.map((hsl, index) => {
                            const hslStr = hslToString(hsl);
                            return (
                              <SelectItem
                                key={index}
                                value={hslStr}
                                className="text-xs"
                              >
                                <div className="flex items-center space-x-2">
                                  <div
                                    className="w-3 h-3 rounded-sm border"
                                    style={{
                                      backgroundColor: `hsl(${hslStr})`,
                                    }}
                                  ></div>
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
            <CardFooter className="border-t pt-4">
              <Button onClick={handleBrandingSaveChanges}>
                <Save className="mr-2 h-4 w-4" /> Apply Branding
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5 text-primary" />
                Tenant / School Management
              </CardTitle>
              <CardDescription>
                Oversee school instances, subdomains, and package assignments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/superadmin/register-school" passHref>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Register New School
                </Button>
              </Link>
              <div className="mt-3 p-3 border rounded-lg bg-muted/30 text-sm space-y-1">
                <h4 className="font-semibold text-foreground mb-1">
                  Conceptual Features:
                </h4>
                <p className="text-muted-foreground">
                  <ExternalLink className="inline mr-1.5 h-3.5 w-3.5" />
                  View/Manage Existing Schools & Subdomains
                </p>
                <p className="text-muted-foreground">
                  <Puzzle className="inline mr-1.5 h-3.5 w-3.5" />
                  Assign/Update Subscription Packages per School
                </p>
                <p className="text-muted-foreground">
                  <Users2 className="inline mr-1.5 h-3.5 w-3.5" />
                  View School Admins & User Limits per School
                </p>
                <p className="text-muted-foreground">
                  <School className="inline mr-1.5 h-3.5 w-3.5" />
                  Activate/Suspend School Accounts
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-xs text-muted-foreground">
                Full tenant management requires backend infrastructure.
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Puzzle className="mr-2 h-5 w-5 text-primary" />
                Core Module Management
              </CardTitle>
              <CardDescription>
                Enable or disable features globally. (Per-tenant toggles would be managed per tenant).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {manageableModules.map((module) => (
                  <div
                    key={module.key}
                    className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <Label
                        htmlFor={`module-${module.key}`}
                        className="font-medium"
                      >
                        {module.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {module.description}
                      </p>
                    </div>
                    <Switch
                      id={`module-${module.key}`}
                      checked={moduleSettings[module.key] ?? true}
                      onCheckedChange={() => toggleModule(module.key)}
                      aria-label={`Toggle ${module.label} module`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users2 className="mr-2 h-5 w-5 text-primary" />
                User Role Simulation
              </CardTitle>
              <CardDescription>
                Switch current user's role to test UI changes (frontend
                simulation only).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="userRoleSelect">Current Simulated Role</Label>
              <Select
                value={currentUser?.role || 'Parent'}
                onValueChange={(value) => tempSetUserRole(value as UserRole)}
              >
                <SelectTrigger id="userRoleSelect" className="w-full md:w-1/2">
                  <SelectValue placeholder="Select a role..." />
                </SelectTrigger>
                <SelectContent>
                  {allUserRolesForSimulation.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {currentUser && (
                <p className="text-xs text-muted-foreground mt-1">
                  Current User ID: {currentUser.id}, Email:{' '}
                  {currentUser.email || 'N/A'}
                </p>
              )}
            </CardContent>
          </Card>

           <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-primary" />
                Platform Finance (Conceptual)
              </CardTitle>
              <CardDescription>
                Oversee revenue from school subscriptions. (Handled by AppManager_Finance)
              </CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">
                This section would show aggregated financial data like total MRR, active subscriptions, payment statuses from schools, etc. 
                Requires backend finance & subscription management integration.
              </p>
               <Link href="/app-manager/finance/dashboard" passHref>
                <Button className="mt-3 w-full" variant="outline">
                    <LinkIcon className="mr-2 h-4 w-4" /> Go to App Finance Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

           <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5 text-primary" />
                Global App Settings (Conceptual)
              </CardTitle>
              <CardDescription>
                Manage other platform-wide configurations.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">
                Placeholders for settings like: Default new user roles, global announcement templates, feature flags for experimental features, integration keys for third-party services (e.g., email, analytics).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    