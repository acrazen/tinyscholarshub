
// src/app/superadmin/manage-schools/[schoolId]/settings/page.tsx
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Settings, ShieldCheck, Palette, Puzzle, CreditCard, Power, Save, Router } from 'lucide-react';
import type { SampleSchool } from '@/lib/types';
import { sampleRegisteredSchools } from '@/lib/data'; // Import from the central data file
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';
import { revalidatePath } from 'next/cache';

// Helper to get school data by ID from the mock array
const getSchoolData = (id: string): SampleSchool | undefined => {
  if (!sampleRegisteredSchools) return undefined;
  return sampleRegisteredSchools.find(school => school.id === id);
};

export async function generateStaticParams() {
  if (!sampleRegisteredSchools) {
    return [];
  }
  return sampleRegisteredSchools.map((school) => ({
    schoolId: school.id,
  }));
}

export default function SchoolSpecificSettingsPage({ params }: { params: { schoolId: string } }) {
  const schoolId = params.schoolId;
  const school = getSchoolData(schoolId);

  async function handleConceptualSettingsSave(formData: FormData) {
    "use server";
    console.log(`Conceptual settings save triggered for school ID: ${params.schoolId}.`);
    // In a real app, you'd read form data:
    // const customLogoOverride = formData.get('customLogoOverride') === 'on';
    // const customThemeOverride = formData.get('customThemeOverride') === 'on';
    // etc.
    // Then update the database.
    // For now, just log.
    console.log("Form data would be processed here.");
    // Optionally redirect or revalidate after save
    // redirect('/superadmin/dashboard?tab=school_management');
  }

  async function toggleAccountStatus() {
    "use server";
    const schoolIndex = sampleRegisteredSchools.findIndex(s => s.id === params.schoolId);
    if (schoolIndex !== -1) {
      const currentStatus = sampleRegisteredSchools[schoolIndex].status;
      sampleRegisteredSchools[schoolIndex].status = currentStatus === "Suspended" ? "Active" : "Suspended";
      console.log(`School ${params.schoolId} status changed to: ${sampleRegisteredSchools[schoolIndex].status}`);
      revalidatePath('/superadmin/dashboard'); // Revalidate the dashboard to show updated status
      redirect('/superadmin/dashboard?tab=school_management');
    } else {
      console.error(`School with ID ${params.schoolId} not found for status update.`);
      // Handle error - maybe redirect with an error message
    }
  }


  if (!school) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <Settings className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">School Not Found</h1>
        <p className="text-muted-foreground mb-6">The school settings you are looking for could not be found.</p>
        <Link href="/superadmin/dashboard?tab=school_management">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Settings className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl md:text-3xl">School Specific Settings</CardTitle>
          </div>
          <CardDescription>Configuring settings for: <span className="font-semibold text-foreground">{school.name}</span></CardDescription>
        </CardHeader>
        <form action={handleConceptualSettingsSave}> {/* Main form for most settings */}
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center"><Palette className="mr-2 h-5 w-5 text-primary/80" /> Branding (Conceptual)</h3>
              <div className="space-y-4 p-4 border rounded-md bg-muted/30">
                <div className="flex items-center justify-between">
                  <Label htmlFor="customLogoOverride" className="cursor-pointer flex-grow">Allow Custom Logo Override</Label>
                  <Switch id="customLogoOverride" name="customLogoOverride" defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="customThemeOverride" className="cursor-pointer flex-grow">Allow Custom Theme Color Override</Label>
                  <Switch id="customThemeOverride" name="customThemeOverride" defaultChecked={false} />
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center"><Puzzle className="mr-2 h-5 w-5 text-primary/80" /> Module Configuration (Conceptual)</h3>
              <div className="space-y-4 p-4 border rounded-md bg-muted/30">
                <p className="text-sm text-muted-foreground">Toggle modules specifically for {school.name}. Overrides global settings if allowed by package.</p>
                <div className="flex items-center justify-between">
                  <Label htmlFor="moduleAdvancedReporting" className="cursor-pointer flex-grow">Enable Advanced Reporting</Label>
                  <Switch id="moduleAdvancedReporting" name="moduleAdvancedReporting" defaultChecked={school.package === "Premium Plus"} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="moduleExtendedSupport" className="cursor-pointer flex-grow">Enable Extended Support Package</Label>
                  <Switch id="moduleExtendedSupport" name="moduleExtendedSupport" defaultChecked={school.package?.includes("Plus")} />
                </div>
              </div>
            </section>
            
            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center"><CreditCard className="mr-2 h-5 w-5 text-primary/80" /> Payment Gateway (Conceptual)</h3>
              <div className="p-4 border rounded-md bg-muted/30">
                <p className="text-sm text-muted-foreground mb-3">Manage payment gateway integration for fee collection for {school.name}.</p>
                <Button variant="outline" disabled>Configure Gateway Credentials</Button>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-primary/80" /> Admin Users (Conceptual)</h3>
              <div className="p-4 border rounded-md bg-muted/30">
                <p className="text-sm text-muted-foreground mb-3">Manage school administrator accounts for {school.name}.</p>
                <div className="flex gap-2">
                  <Button variant="outline" disabled>Invite New Admin</Button>
                  <Button variant="outline" disabled>View Admin List</Button>
                </div>
              </div>
            </section>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <Link href="/superadmin/dashboard?tab=school_management" passHref>
              <Button type="button" variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Button>
            </Link>
            <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save All Settings (Conceptual)
            </Button>
          </CardFooter>
        </form>
        
        <Separator />

        {/* Separate form for Account Status to have its own Server Action */}
        <section className="p-6 pt-0"> {/* Adjusted padding to remove top padding here */}
            <h3 className="text-lg font-semibold mb-3 flex items-center"><Power className="mr-2 h-5 w-5 text-destructive" /> Account Status</h3>
            <div className="p-4 border rounded-md bg-muted/30">
              <p className="text-sm text-muted-foreground mb-3">Current status: <span className="font-bold">{school.status}</span>. Manage the operational status of {school.name}'s account.</p>
              <form action={toggleAccountStatus}>
                {school.status === "Suspended" ? (
                  <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700 text-white">Activate Account</Button>
                ) : (
                  <Button type="submit" variant="destructive">Suspend Account</Button>
                )}
              </form>
            </div>
        </section>
      </Card>
    </div>
  );
}
