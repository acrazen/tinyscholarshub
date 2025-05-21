
// src/app/school-data-editor/dashboard/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, LibraryBig, Megaphone, Briefcase } from "lucide-react";
import { useAppCustomization } from "@/context/app-customization-context";
import Link from "next/link";

export default function SchoolDataEditorDashboardPage() {
  const { currentUser } = useAppCustomization();

  if (currentUser?.role !== 'SchoolDataEditor') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Briefcase className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Edit className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">School Content Dashboard</h1>
      </div>
      <p className="text-muted-foreground">Manage school announcements, resources, and other informational content.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Megaphone className="mr-2 h-5 w-5 text-primary" />
              Manage Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create, edit, and publish school-wide announcements for parents and staff.
            </p>
            <Button className="w-full" disabled>Manage Announcements (Conceptual)</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <LibraryBig className="mr-2 h-5 w-5 text-primary" />
              School Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload and manage documents, links, and other resources for parents.
            </p>
            <Link href="/more/resources" passHref>
                 <Button variant="outline" className="w-full">
                    Go to Resources (View as Parent)
                </Button>
            </Link>
            <Button className="w-full mt-2" variant="secondary" disabled>
                Edit Resources (Conceptual)
            </Button>
          </CardContent>
        </Card>
        
         <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Edit className="mr-2 h-5 w-5 text-primary" />
              Edit School Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Update general school details, contact information, and about us sections.
            </p>
            <Button className="w-full" disabled>Edit School Info (Conceptual)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
