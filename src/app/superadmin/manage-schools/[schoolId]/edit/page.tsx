
// src/app/superadmin/manage-schools/[schoolId]/edit/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, FileEdit, Save } from 'lucide-react';
import { sampleRegisteredSchools } from '../../dashboard/page'; // Import the mock data

// Helper to get school data by ID from the mock array
const getSchoolData = (id: string) => {
  if (!sampleRegisteredSchools) return undefined; // Guard clause
  return sampleRegisteredSchools.find(school => school.id === id);
};

export async function generateStaticParams() {
  if (!sampleRegisteredSchools) {
    // Handle case where data might not be loaded (e.g., during initial build phase if dashboard is client-side only)
    // Or if this page itself is being built before dashboard/page.tsx is fully resolved in some build setups.
    // For now, return an empty array or a sensible default if data isn't ready.
    // This might require ensuring dashboard/page.tsx is treated as a module that exports data consistently.
    console.warn("generateStaticParams in edit page: sampleRegisteredSchools is not available at build time. Returning empty array.");
    return [];
  }
  return sampleRegisteredSchools.map((school) => ({
    schoolId: school.id,
  }));
}

interface EditSchoolDetailsPageProps {
  params: { schoolId: string };
}

export default function EditSchoolDetailsPage({ params }: EditSchoolDetailsPageProps) {
  const schoolId = params.schoolId;
  const school = getSchoolData(schoolId);

  if (!school) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <FileEdit className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">School Not Found</h1>
        <p className="text-muted-foreground mb-6">The school details you are looking for could not be found.</p>
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
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <FileEdit className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl md:text-3xl">Edit School Details</CardTitle>
          </div>
          <CardDescription>Modifying details for: <span className="font-semibold text-foreground">{school.name}</span></CardDescription>
        </CardHeader>
        <form action={async () => {
          "use server";
          console.log("Conceptual save action triggered for school:", school.id);
        }}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="schoolName">School Name</Label>
              <Input id="schoolName" name="schoolName" defaultValue={school.name} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="subdomain">Subdomain</Label>
              <Input id="subdomain" name="subdomain" defaultValue={school.subdomain} className="mt-1" readOnly />
              <p className="text-xs text-muted-foreground mt-1">Subdomain is typically not editable after creation or requires a complex migration.</p>
            </div>
            <div>
              <Label htmlFor="adminEmail">Primary Admin Email</Label>
              <Input id="adminEmail" name="adminEmail" type="email" defaultValue={school.adminEmail} className="mt-1" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="subscriptionPackage">Subscription Package</Label>
                <Select name="subscriptionPackage" defaultValue={school.package}>
                  <SelectTrigger id="subscriptionPackage" className="mt-1">
                    <SelectValue placeholder="Select package..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Premium Plus">Premium Plus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={school.status}>
                  <SelectTrigger id="status" className="mt-1">
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h4 className="text-md font-semibold pt-4 border-t">Resource Limits</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="studentLimit">Student Limit</Label>
                <Input id="studentLimit" name="studentLimit" type="number" defaultValue={school.studentLimit} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="teacherLimit">Teacher Limit</Label>
                <Input id="teacherLimit" name="teacherLimit" type="number" defaultValue={school.teacherLimit} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="adminLimit">Admin Limit</Label>
                <Input id="adminLimit" name="adminLimit" type="number" defaultValue={school.adminLimit} className="mt-1" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <Link href="/superadmin/dashboard?tab=school_management" passHref>
              <Button type="button" variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Button>
            </Link>
             <Button type="button" onClick={() => alert('Conceptual Save: Changes for ' + school.name + ' would be processed here. (No actual data saved in prototype)')}>
              <Save className="mr-2 h-4 w-4" /> Save Changes (Conceptual)
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
