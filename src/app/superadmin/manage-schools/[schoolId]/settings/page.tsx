
// src/app/superadmin/manage-schools/[schoolId]/settings/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Settings } from 'lucide-react';

// This function would typically fetch from your actual data source for getStaticPaths.
// For this prototype, it uses a static list.
const getSampleSchoolsForParams = () => [
    { id: 'school_bright_beginnings', name: 'Bright Beginnings Academy' },
    { id: 'school_little_explorers', name: 'Little Explorers Playschool' },
    { id: 'school_happy_hearts', name: 'Happy Hearts Kindergarten' },
    { id: 'school_creative_minds', name: 'Creative Minds Preschool' },
    { id: 'school_sunshine_daycare', name: 'Sunshine Daycare & Learning' },
];

export async function generateStaticParams() {
  const schools = getSampleSchoolsForParams(); // Using the local helper
  return schools.map((school) => ({
    schoolId: school.id,
  }));
}

interface SchoolSpecificSettingsPageProps {
    params: { schoolId: string };
}

export default function SchoolSpecificSettingsPage({ params }: SchoolSpecificSettingsPageProps) {
  const schoolId = params.schoolId;
  const school = getSampleSchoolsForParams().find(s => s.id === schoolId);
  const schoolName = school ? school.name : schoolId.replace('school_', '').split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2"><Settings className="h-8 w-8 text-primary" /><CardTitle className="text-2xl md:text-3xl">School Specific Settings</CardTitle></div>
          <CardDescription>Configuring settings for: <span className="font-semibold text-foreground">{schoolName}</span></CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is a placeholder page for managing school-specific settings. Options here could include:</p>
          <div className="mt-6 p-4 bg-muted/50 border rounded-md">
            <h4 className="font-semibold mb-2">Conceptual Settings:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>School Branding (Logo, Theme overrides if allowed by package)</li>
              <li>Payment Gateway Configuration (if enabled for this school)</li>
              <li>Default Communication Preferences</li>
              <li>Academic Year Configuration specific to this school</li>
              <li>Feature Flags specific to this school (e.g., enabling beta features)</li>
              <li>Data Retention Policies</li><li>Manage School Admin Users</li><li>Activate/Deactivate School Account</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
           <Link href="/superadmin/dashboard?tab=school_management" passHref>
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Button>
          </Link>
          <Button className="ml-auto" disabled>Save Settings (Conceptual)</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
