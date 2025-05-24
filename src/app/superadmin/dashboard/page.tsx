
// src/app/superadmin/dashboard/page.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  Settings as SettingsIcon,
  ExternalLink,
  Link as LinkIcon,
  List,
  FileEdit,
  Eye,
  Search,
  Filter,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const manageableModules: {
  key: AppModuleKey;
  label: string;
  description: string;
}[] = [
  { key: 'messaging', label: 'Messaging', description: 'Enable/disable direct messaging features.' },
  { key: 'myLearning', label: 'My Learning', description: 'Enable/disable the "My Learning" section.' },
  { key: 'portfolio', label: 'Portfolio', description: 'Enable/disable student portfolio viewing.' },
  { key: 'eventBooking', label: 'Event Booking', description: 'Enable/disable school event booking.' },
  { key: 'resources', label: 'Resources', description: 'Enable/disable shared school resources.' },
  { key: 'statementOfAccount', label: 'Statement of Account', description: 'Enable/disable financial statements view.' },
  { key: 'eService', label: 'eService', description: 'Enable/disable general eServices portal.' },
  { key: 'settings', label: 'Settings Page Access', description: 'Enable/disable user access to settings.' },
  { key: 'adminManageStudents', label: 'School Admin: Manage Students', description: 'Student management for School Admins.' },
  { key: 'teacherSmartUpdate', label: 'Teacher: Smart Update', description: 'AI update generator for Teachers.' },
  { key: 'paymentGateway', label: 'Payment Gateway', description: 'Enable/disable payment gateway features for schools.' },
];

const allUserRolesForSimulation: UserRole[] = [
  'SuperAdmin', 'AppManager_Management', 'AppManager_Sales', 'AppManager_Finance', 'AppManager_Support',
  'SchoolAdmin', 'SchoolDataEditor', 'SchoolFinanceManager', 'ClassTeacher', 'Teacher', 'Parent', 'Subscriber',
];

interface SampleSchool {
  id: string;
  name: string;
  subdomain: string;
  status: 'Active' | 'Pending' | 'Suspended';
  adminEmail: string;
  package: 'Basic' | 'Standard' | 'Premium' | 'Premium Plus';
  studentLimit: number;
  teacherLimit: number;
  adminLimit: number;
}

const sampleRegisteredSchools: SampleSchool[] = [
  { id: 'school_bright_beginnings', name: 'Bright Beginnings Academy', subdomain: 'brightbeginnings', status: 'Active', adminEmail: 'admin@brightbeginnings.com', package: 'Premium Plus', studentLimit: 500, teacherLimit: 50, adminLimit: 5 },
  { id: 'school_little_explorers', name: 'Little Explorers Playschool', subdomain: 'littleexplorers', status: 'Active', adminEmail: 'contact@littleexplorers.org', package: 'Standard', studentLimit: 200, teacherLimit: 20, adminLimit: 2 },
  { id: 'school_happy_hearts', name: 'Happy Hearts Kindergarten', subdomain: 'happyhearts', status: 'Pending', adminEmail: 'info@happyhearts.edu', package: 'Basic', studentLimit: 100, teacherLimit: 10, adminLimit: 1 },
  { id: 'school_creative_minds', name: 'Creative Minds Preschool', subdomain: 'creativeminds', status: 'Active', adminEmail: 'director@creativeminds.com', package: 'Premium', studentLimit: 300, teacherLimit: 30, adminLimit: 3 },
  { id: 'school_sunshine_daycare', name: 'Sunshine Daycare & Learning', subdomain: 'sunshine', status: 'Suspended', adminEmail: 'manager@sunshine.net', package: 'Basic', studentLimit: 150, teacherLimit: 15, adminLimit: 2 },
];

export default function SuperAdminDashboardPage() {
  const {
    appName: currentAppName, appIconUrl: currentAppIconUrl, primaryColor: currentPrimaryColor,
    secondaryColor: currentSecondaryColor, moduleSettings, currentUser, isLoadingAuth,
    tempSetUserRole, setAppName, setAppIconUrl, setPrimaryColor, setSecondaryColor, toggleModule,
  } = useAppCustomization();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [formAppName, setFormAppName] = useState<string>(currentAppName);
  const [formAppIconUrl, setFormAppIconUrl] = useState<string>(currentAppIconUrl || '');
  const [rawPrimaryColorInput, setRawPrimaryColorInput] = useState<string>(currentPrimaryColor);
  const [rawSecondaryColorInput, setRawSecondaryColorInput] = useState<string>(currentSecondaryColor);
  const [secondaryColorSuggestions, setSecondaryColorSuggestions] = useState<HSLColor[]>([]);

  const [schoolSearchTerm, setSchoolSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Pending' | 'Suspended'>('all');
  const [packageFilter, setPackageFilter] = useState<'all' | 'Basic' | 'Standard' | 'Premium' | 'Premium Plus'>('all');
  const [selectedSchoolForQuickView, setSelectedSchoolForQuickView] = useState<SampleSchool | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const initialTab = searchParams.get('tab') || 'platform_settings';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.replace(`/superadmin/dashboard?tab=${value}`, { scroll: false });
  };

  useEffect(() => {
    setFormAppName(currentAppName);
    setFormAppIconUrl(currentAppIconUrl || '');
    setRawPrimaryColorInput(currentPrimaryColor);
    setRawSecondaryColorInput(currentSecondaryColor);
  }, [currentAppName, currentAppIconUrl, currentPrimaryColor, currentSecondaryColor]);

  useEffect(() => {
    let baseHslForSuggestions: HSLColor | null = null;
    if (isValidHslColorString(rawPrimaryColorInput)) {
      baseHslForSuggestions = parseHslString(rawPrimaryColorInput);
    } else if (isHexColorString(rawPrimaryColorInput)) {
      baseHslForSuggestions = hexToHsl(rawPrimaryColorInput);
    }
    if (baseHslForSuggestions) {
      setSecondaryColorSuggestions(generateLighterVariants(baseHslForSuggestions, 5, 8));
    } else {
      setSecondaryColorSuggestions([]);
    }
  }, [rawPrimaryColorInput]);

  const handleBrandingSaveChanges = () => {
    let finalPrimaryHsl: string | null = null;
    let finalSecondaryHsl: string | null = null;
    if (isValidHslColorString(rawPrimaryColorInput)) { finalPrimaryHsl = rawPrimaryColorInput; }
    else if (isHexColorString(rawPrimaryColorInput)) { const hsl = hexToHsl(rawPrimaryColorInput); if (hsl) finalPrimaryHsl = hslToString(hsl); }
    if (!finalPrimaryHsl) { toast({ title: 'Invalid Primary Color', description: "Primary color must be a valid HSL string or HEX code.", variant: 'destructive' }); return; }
    if (isValidHslColorString(rawSecondaryColorInput)) { finalSecondaryHsl = rawSecondaryColorInput; }
    else if (isHexColorString(rawSecondaryColorInput)) { const hsl = hexToHsl(rawSecondaryColorInput); if (hsl) finalSecondaryHsl = hslToString(hsl); }
    if (!finalSecondaryHsl) { toast({ title: 'Invalid Secondary Color', description: "Secondary color must be a valid HSL string or HEX code.", variant: 'destructive' }); return; }
    setAppName(formAppName);
    setAppIconUrl(formAppIconUrl.trim() ? formAppIconUrl.trim() : null);
    setPrimaryColor(finalPrimaryHsl);
    setSecondaryColor(finalSecondaryHsl);
    toast({ title: 'Branding Updated', description: 'App customization settings have been applied (frontend simulation).' });
  };

  const handleSecondarySuggestionSelect = (hslString: string) => setRawSecondaryColorInput(hslString);
  const getColorPreviewStyle = (colorInput: string): React.CSSProperties => {
    if (isValidHslColorString(colorInput)) return { backgroundColor: `hsl(${colorInput})` };
    if (isHexColorString(colorInput)) return { backgroundColor: colorInput };
    return { backgroundColor: 'transparent', border: '1px dashed #ccc' };
  };

  const filteredSchools = useMemo(() => sampleRegisteredSchools.filter(school => 
    (school.name.toLowerCase().includes(schoolSearchTerm.toLowerCase()) ||
     school.subdomain.toLowerCase().includes(schoolSearchTerm.toLowerCase())) &&
    (statusFilter === 'all' || school.status === statusFilter) &&
    (packageFilter === 'all' || school.package === packageFilter)
  ), [schoolSearchTerm, statusFilter, packageFilter]);

  const handleQuickView = (school: SampleSchool) => { setSelectedSchoolForQuickView(school); setIsQuickViewOpen(true); };

  if (isLoadingAuth) return <div className="flex justify-center items-center h-64"><Cog className="h-12 w-12 animate-spin text-primary" /><p className="ml-3 text-muted-foreground">Loading Super Admin Dashboard...</p></div>;
  if (currentUser?.role !== 'SuperAdmin') return <div className="flex flex-col items-center justify-center h-[60vh]"><Briefcase className="h-12 w-12 text-destructive mb-4" /><h1 className="text-2xl font-semibold">Access Denied</h1><p className="text-muted-foreground">You do not have permission to view this page.</p></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <Cog className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
      </div>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-6 rounded-lg shadow-sm bg-muted h-auto">
          <TabsTrigger value="platform_settings" className="py-2.5 text-sm sm:text-base data-[state=active]:shadow-md data-[state=active]:bg-background data-[state=active]:rounded-md">Platform Settings</TabsTrigger>
          <TabsTrigger value="school_management" className="py-2.5 text-sm sm:text-base data-[state=active]:shadow-md data-[state=active]:bg-background data-[state=active]:rounded-md">School Management</TabsTrigger>
        </TabsList>

        <TabsContent value="platform_settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6"> {/* Column 1 */}
              <Card className="shadow-lg rounded-xl">
                <CardHeader><CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5 text-primary" />App Branding & Theme</CardTitle><CardDescription>Global settings for white-labeling the application.</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1"><Label htmlFor="appName">Custom App Name</Label><Input id="appName" placeholder="Enter custom app name" value={formAppName} onChange={(e) => setFormAppName(e.target.value)} /></div>
                  <div className="space-y-1"><Label htmlFor="appIconUrl">Custom App Icon URL</Label><Input id="appIconUrl" type="url" placeholder="Enter URL for custom app icon" value={formAppIconUrl} onChange={(e) => setFormAppIconUrl(e.target.value)} />
                    {formAppIconUrl ? <div className="mt-2 p-2 border rounded-md inline-flex items-center justify-center bg-muted/50"><NextImage src={formAppIconUrl} alt="App Icon Preview" width={48} height={48} className="rounded-md object-contain" data-ai-hint="custom logo" unoptimized={true} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div> : <div className="mt-2 p-2 border rounded-md inline-flex items-center justify-center bg-muted/50 h-[64px] w-[64px]"><ImageIcon className="h-8 w-8 text-muted-foreground" /></div>}
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1"><Label htmlFor="primaryColor">Primary Color (HSL or HEX)</Label><div className="flex items-center space-x-2"><Input id="primaryColor" placeholder="e.g., 25 95% 55% or #FF8C00" value={rawPrimaryColorInput} onChange={(e) => setRawPrimaryColorInput(e.target.value)} className="flex-grow" /><div className="w-8 h-8 rounded-md border shrink-0" style={getColorPreviewStyle(rawPrimaryColorInput)}></div></div></div>
                    <div className="space-y-1"><Label htmlFor="secondaryColor">Secondary Color (HSL or HEX)</Label><div className="flex items-center space-x-2"><Input id="secondaryColor" placeholder="e.g., 25 95% 75% or #FFA500" value={rawSecondaryColorInput} onChange={(e) => setRawSecondaryColorInput(e.target.value)} className="flex-grow" /><div className="w-8 h-8 rounded-md border shrink-0" style={getColorPreviewStyle(rawSecondaryColorInput)}></div></div>
                      {secondaryColorSuggestions.length > 0 && (<div className="mt-1 space-y-1"><Label htmlFor="secondaryColorSuggestions" className="text-xs text-muted-foreground">Or pick a lighter variant:</Label><Select onValueChange={handleSecondarySuggestionSelect} value={rawSecondaryColorInput}><SelectTrigger id="secondaryColorSuggestions" className="w-full text-xs h-9"><SelectValue placeholder="Select light variant..." /></SelectTrigger><SelectContent>{secondaryColorSuggestions.map((hsl, index) => { const hslStr = hslToString(hsl); return (<SelectItem key={index} value={hslStr} className="text-xs"><div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: `hsl(${hslStr})` }}></div><span>{hslStr}</span></div></SelectItem>);})}</SelectContent></Select></div>)}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4"><Button onClick={handleBrandingSaveChanges}><Save className="mr-2 h-4 w-4" /> Apply Branding</Button></CardFooter>
              </Card>
              <Card className="shadow-lg rounded-xl">
                <CardHeader><CardTitle className="flex items-center"><DollarSign className="mr-2 h-5 w-5 text-primary" />Platform Finance (Conceptual)</CardTitle><CardDescription>Oversee revenue from school subscriptions.</CardDescription></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Aggregated financial data: total MRR, active subscriptions, payment statuses.</p><Link href="/app-manager/finance/dashboard" passHref><Button className="mt-3 w-full" variant="outline"><LinkIcon className="mr-2 h-4 w-4" /> Go to App Finance Dashboard</Button></Link></CardContent>
              </Card>
            </div>
            <div className="space-y-6"> {/* Column 2 */}
              <Card className="shadow-lg rounded-xl">
                <CardHeader><CardTitle className="flex items-center"><Puzzle className="mr-2 h-5 w-5 text-primary" />Core Module Management</CardTitle><CardDescription>Enable or disable features globally for all tenants.</CardDescription></CardHeader>
                <CardContent className="space-y-3"><div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">{manageableModules.map((module) => (<div key={module.key} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"><div><Label htmlFor={`module-${module.key}`} className="font-medium">{module.label}</Label></div><Switch id={`module-${module.key}`} checked={moduleSettings[module.key] ?? true} onCheckedChange={() => toggleModule(module.key)} aria-label={`Toggle ${module.label} module`} /></div>))}</div></CardContent>
              </Card>
              <Card className="shadow-lg rounded-xl">
                <CardHeader><CardTitle className="flex items-center"><Users2 className="mr-2 h-5 w-5 text-primary" />User Role Simulation</CardTitle><CardDescription>Switch current user's role to test UI (frontend only).</CardDescription></CardHeader>
                <CardContent className="space-y-2"><Label htmlFor="userRoleSelect">Current Simulated Role</Label><Select value={currentUser?.role || 'Parent'} onValueChange={(value) => tempSetUserRole(value as UserRole)}><SelectTrigger id="userRoleSelect" className="w-full md:w-1/2"><SelectValue placeholder="Select a role..." /></SelectTrigger><SelectContent>{allUserRolesForSimulation.map((role) => (<SelectItem key={role} value={role}>{role}</SelectItem>))}</SelectContent></Select></CardContent>
              </Card>
              <Card className="shadow-lg rounded-xl">
                <CardHeader><CardTitle className="flex items-center"><SettingsIcon className="mr-2 h-5 w-5 text-primary" />Global App Settings (Conceptual)</CardTitle><CardDescription>Manage other platform-wide configurations.</CardDescription></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">E.g., Default new user roles, feature flags, integration keys.</p></CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="school_management">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <CardTitle className="flex items-center"><Building className="mr-2 h-5 w-5 text-primary" />Tenant (School) Management</CardTitle>
                  <CardDescription>Oversee registered schools, onboard new ones, and manage tenant configurations.</CardDescription>
                </div>
                <Link href="/superadmin/register-school?tab=school_management" passHref>
                  <Button><PlusCircle className="mr-2 h-4 w-4" /> Register New School</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-4 p-4 border rounded-md bg-muted/20">
                <div className="relative flex-grow">
                  <Input placeholder="Search schools by name or subdomain..." value={schoolSearchTerm} onChange={(e) => setSchoolSearchTerm(e.target.value)} className="pl-10" />
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                    <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Suspended">Suspended</SelectItem></SelectContent>
                  </Select>
                  <Select value={packageFilter} onValueChange={(value) => setPackageFilter(value as any)}>
                    <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by package" /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All Packages</SelectItem><SelectItem value="Basic">Basic</SelectItem><SelectItem value="Standard">Standard</SelectItem><SelectItem value="Premium">Premium</SelectItem><SelectItem value="Premium Plus">Premium Plus</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              {filteredSchools.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 border rounded-md p-3">
                  {filteredSchools.map((school) => (
                    <div key={school.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors bg-card">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{school.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{school.subdomain}.{currentAppName.toLowerCase().replace(/\s+/g, '') || 'yourapp'}.com</p>
                        <p className="text-xs text-muted-foreground">Package: {school.package}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                        <Badge variant={school.status === 'Active' ? 'default' : school.status === 'Pending' ? 'secondary' : 'destructive'} className={cn("text-xs px-1.5 py-0.5 h-5", school.status === 'Active' ? 'bg-green-100 text-green-700 border-green-300' : school.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-red-100 text-red-700 border-red-300')}>{school.status}</Badge>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleQuickView(school)}><Eye className="h-4 w-4" /><span className="sr-only">Quick View</span></Button>
                        <Link href={`/superadmin/manage-schools/${school.id}/edit?tab=school_management`} passHref><Button variant="ghost" size="icon" className="h-7 w-7"><FileEdit className="h-4 w-4" /><span className="sr-only">Edit Details</span></Button></Link>
                        <Link href={`/superadmin/manage-schools/${school.id}/settings?tab=school_management`} passHref><Button variant="ghost" size="icon" className="h-7 w-7"><SettingsIcon className="h-4 w-4" /><span className="sr-only">School Settings</span></Button></Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No schools match your search or filters.</p>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-xs text-muted-foreground">School management features (editing, specific settings) require backend integration.</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedSchoolForQuickView && (
        <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle>{selectedSchoolForQuickView.name} - Quick View</DialogTitle><DialogDescription>Subdomain: {selectedSchoolForQuickView.subdomain}.{currentAppName.toLowerCase().replace(/\s+/g, '') || 'yourapp'}.com</DialogDescription></DialogHeader>
            <div className="grid gap-3 py-4 text-sm">
              <div className="grid grid-cols-[120px_1fr] items-center gap-2"><span className="font-medium text-muted-foreground">Status:</span><Badge variant={selectedSchoolForQuickView.status === 'Active' ? 'default' : selectedSchoolForQuickView.status === 'Pending' ? 'secondary' : 'destructive'} className={cn("w-fit", selectedSchoolForQuickView.status === 'Active' ? 'bg-green-100 text-green-700 border-green-300' : selectedSchoolForQuickView.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-red-100 text-red-700 border-red-300')}>{selectedSchoolForQuickView.status}</Badge></div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2"><span className="font-medium text-muted-foreground">Admin Email:</span><span>{selectedSchoolForQuickView.adminEmail}</span></div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2"><span className="font-medium text-muted-foreground">Package:</span><span>{selectedSchoolForQuickView.package}</span></div>
              <Separator className="my-1" />
              <div className="grid grid-cols-[120px_1fr] items-center gap-2"><span className="font-medium text-muted-foreground">Student Limit:</span><span>{selectedSchoolForQuickView.studentLimit}</span></div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2"><span className="font-medium text-muted-foreground">Teacher Limit:</span><span>{selectedSchoolForQuickView.teacherLimit}</span></div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2"><span className="font-medium text-muted-foreground">Admin Limit:</span><span>{selectedSchoolForQuickView.adminLimit}</span></div>
            </div>
            <DialogFooter><DialogClose asChild><Button type="button" variant="outline">Close</Button></DialogClose></DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
