
// src/app/superadmin/register-school/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, Loader2, PlusCircle, ArrowLeft, Building } from 'lucide-react';
import { useAppCustomization, type AppModuleKey } from '@/context/app-customization-context';
import Link from 'next/link';

const initialSchoolModuleKeys: AppModuleKey[] = [
  'messaging', 'myLearning', 'portfolio', 'eventBooking', 'resources',
  'statementOfAccount', 'eService', 'settings', 'paymentGateway',
];

const defaultModulesSchemaObject = initialSchoolModuleKeys.reduce((acc, key) => {
  acc[key] = z.boolean();
  return acc;
}, {} as Record<AppModuleKey, z.ZodBoolean>);

const defaultModulesSchema = z.object(defaultModulesSchemaObject);

const sampleTimezones = [
  "Etc/GMT+12", "Pacific/Midway", "Pacific/Honolulu", "America/Anchorage", "America/Los_Angeles",
  "America/Denver", "America/Chicago", "America/New_York", "America/Caracas", "America/Sao_Paulo",
  "Atlantic/South_Georgia", "Atlantic/Azores", "Etc/GMT", "Europe/Berlin", "Europe/Athens",
  "Europe/Moscow", "Asia/Dubai", "Asia/Karachi", "Asia/Dhaka", "Asia/Kolkata", "Asia/Kathmandu",
  "Asia/Almaty", "Asia/Yangon", "Asia/Bangkok", "Asia/Shanghai", "Asia/Tokyo", "Australia/Sydney",
  "Pacific/Auckland", "Pacific/Fiji",
];

const registerSchoolSchema = z.object({
  schoolName: z.string().min(3, "School name must be at least 3 characters."),
  subdomain: z.string().min(3, "Subdomain must be at least 3 characters.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Subdomain can only contain lowercase letters, numbers, and hyphens."),
  adminEmail: z.string().email("Invalid email address for admin."),
  schoolAddress: z.string().optional(),
  schoolPhoneNumber: z.string().optional(),
  schoolLogoUrl: z.string().url({ message: "Please enter a valid URL for the logo." }).optional().or(z.literal('')),
  schoolTimeZone: z.string().min(1, "Timezone is required."),
  schoolCurrency: z.string().min(3, "Currency code should be 3 letters, e.g., USD, INR.").max(3, "Currency code should be 3 letters.").optional(),
  academicYearStart: z.string().optional(), // Could use date picker later
  academicYearEnd: z.string().optional(),   // Could use date picker later
  subscriptionModel: z.enum(["perStudentMonthly", "flatFeeMonthly", "tieredFeature", "customPackage"]),
  pricePerStudent: z.string().optional(), 
  flatFee: z.string().optional(),
  packageName: z.string().min(2, "Package name is required.").optional(),
  maxAdmins: z.coerce.number().min(1, "At least 1 admin required.").max(10),
  maxTeachers: z.coerce.number().min(1, "At least 1 teacher required.").max(100),
  maxClassTeachers: z.coerce.number().min(0).max(50),
  studentLimit: z.coerce.number().min(10, "Minimum 10 students.").max(10000),
  defaultModules: defaultModulesSchema.optional(),
});

type RegisterSchoolFormData = z.infer<typeof registerSchoolSchema>;

export default function RegisterSchoolPage() {
  const { toast } = useToast();
  const { currentUser, appName: currentGlobalAppName, isLoadingAuth } = useAppCustomization();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialDefaultModules = initialSchoolModuleKeys.reduce((acc, key) => {
    acc[key] = true; 
    return acc;
  }, {} as Record<AppModuleKey, boolean>);

  const form = useForm<RegisterSchoolFormData>({
    resolver: zodResolver(registerSchoolSchema),
    defaultValues: {
      schoolName: '', subdomain: '', adminEmail: '', schoolAddress: '', schoolPhoneNumber: '', schoolLogoUrl: '',
      schoolTimeZone: 'Asia/Kolkata', schoolCurrency: 'INR', academicYearStart: '', academicYearEnd: '',
      subscriptionModel: 'perStudentMonthly', pricePerStudent: '', flatFee: '', packageName: '',
      maxAdmins: 1, maxTeachers: 10, maxClassTeachers: 5, studentLimit: 100,
      defaultModules: initialDefaultModules,
    },
  });

  const watchedSubscriptionModel = form.watch("subscriptionModel");

  const onSubmit: SubmitHandler<RegisterSchoolFormData> = async (data) => {
    setIsSubmitting(true);
    console.log("Conceptual New School Registration Data:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({ title: "School Registration Initiated (Conceptual)", description: `Simulating registration for ${data.schoolName}. Backend integration required.` });
    setIsSubmitting(false);
    // router.push('/superadmin/dashboard?tab=school_management'); // Optionally redirect
  };

  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (currentUser?.role !== 'SuperAdmin' && currentUser?.role !== 'AppManager_Management') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Briefcase className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
         <Link href="/superadmin/dashboard?tab=platform_settings" passHref>
            <Button variant="outline" className="mt-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2"><Building className="h-8 w-8 text-primary" /><CardTitle className="text-2xl md:text-3xl">Register New School</CardTitle></div>
          <CardDescription>Fill in the details below to create a new school instance on the platform. All fields are conceptual.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <section><h3 className="text-lg font-semibold mb-3 border-b pb-2">Basic School Information</h3><div className="space-y-4">
                <FormField control={form.control} name="schoolName" render={({ field }) => (<FormItem><FormLabel>School Name *</FormLabel><FormControl><Input placeholder="E.g., Little Stars Preschool" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="subdomain" render={({ field }) => (<FormItem><FormLabel>Desired Subdomain *</FormLabel><FormControl><div className="flex items-center"><Input placeholder="e.g., littlestars" {...field} className="rounded-r-none" /><span className="px-3 py-2 text-sm bg-muted border border-l-0 border-input rounded-r-md text-muted-foreground">.{currentGlobalAppName.toLowerCase().replace(/\s+/g, '') || 'yourapp'}.com</span></div></FormControl><FormDescription>Lowercase letters, numbers, hyphens only.</FormDescription><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="adminEmail" render={({ field }) => (<FormItem><FormLabel>Initial School Admin Email *</FormLabel><FormControl><Input type="email" placeholder="admin@schoolname.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div></div></section>
              <Separator />
              <section><h3 className="text-lg font-semibold mb-3 border-b pb-2">School Contact & Branding</h3><div className="space-y-4">
                <FormField control={form.control} name="schoolAddress" render={({ field }) => (<FormItem><FormLabel>School Address</FormLabel><FormControl><Textarea placeholder="123 Learning Lane, Knowledge City, ST 12345" {...field} rows={3}/></FormControl><FormMessage /></FormItem>)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="schoolPhoneNumber" render={({ field }) => (<FormItem><FormLabel>School Phone Number</FormLabel><FormControl><Input type="tel" placeholder="+1-555-123-4567" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="schoolLogoUrl" render={({ field }) => (<FormItem><FormLabel>School Logo URL</FormLabel><FormControl><Input type="url" placeholder="https://school.com/logo.png" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div></div></section>
              <Separator />
              <section><h3 className="text-lg font-semibold mb-3 border-b pb-2">Regional & Academic Settings</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="schoolTimeZone" render={({ field }) => (<FormItem><FormLabel>Timezone *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a timezone" /></SelectTrigger></FormControl><SelectContent>{sampleTimezones.map(tz => (<SelectItem key={tz} value={tz}>{tz.replace(/_/g, ' ')}</SelectItem>))}</SelectContent></Select><FormDescription>Select the school's primary timezone.</FormDescription><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="schoolCurrency" render={({ field }) => (<FormItem><FormLabel>Currency Code</FormLabel><FormControl><Input placeholder="E.g., INR, USD" {...field} /></FormControl><FormDescription>3-letter ISO currency code.</FormDescription><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="academicYearStart" render={({ field }) => (<FormItem><FormLabel>Academic Year Start (YYYY-MM-DD)</FormLabel><FormControl><Input placeholder="e.g., 2024-08-01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="academicYearEnd" render={({ field }) => (<FormItem><FormLabel>Academic Year End (YYYY-MM-DD)</FormLabel><FormControl><Input placeholder="e.g., 2025-06-30" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div></section>
              <Separator />
              <section><h3 className="text-lg font-semibold mb-3 border-b pb-2">Subscription & Package</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="subscriptionModel" render={({ field }) => (<FormItem><FormLabel>Subscription Model *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a subscription model" /></SelectTrigger></FormControl><SelectContent><SelectItem value="perStudentMonthly">Per Student (Monthly)</SelectItem><SelectItem value="flatFeeMonthly">Flat Fee (Monthly)</SelectItem><SelectItem value="tieredFeature">Feature-Tiered Plan</SelectItem><SelectItem value="customPackage">Custom Package</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="packageName" render={({ field }) => (<FormItem><FormLabel>Package Name/ID</FormLabel><FormControl><Input placeholder="E.g., Basic, Premium, SchoolTier1" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              {watchedSubscriptionModel === 'perStudentMonthly' && (<FormField control={form.control} name="pricePerStudent" render={({ field }) => (<FormItem className="mt-4"><FormLabel>Price Per Student (/month)</FormLabel><FormControl><Input type="number" placeholder="e.g., 10" {...field} /></FormControl><FormMessage /></FormItem>)} />)}
              {watchedSubscriptionModel === 'flatFeeMonthly' && (<FormField control={form.control} name="flatFee" render={({ field }) => (<FormItem className="mt-4"><FormLabel>Flat Fee (/month)</FormLabel><FormControl><Input type="number" placeholder="e.g., 500" {...field} /></FormControl><FormMessage /></FormItem>)} />)}
              </section>
              <Separator />
              <section><h3 className="text-lg font-semibold mb-3 border-b pb-2">User & Resource Limits *</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField control={form.control} name="maxAdmins" render={({ field }) => (<FormItem><FormLabel>Max Admins</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="maxTeachers" render={({ field }) => (<FormItem><FormLabel>Max Teachers</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="maxClassTeachers" render={({ field }) => (<FormItem><FormLabel>Max Class Teachers</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="studentLimit" render={({ field }) => (<FormItem><FormLabel>Student Limit</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div></section>
              <Separator />
              <section><h3 className="text-lg font-semibold mb-3 border-b pb-2">Default Enabled Modules</h3><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {initialSchoolModuleKeys.map((moduleKey) => (<FormField key={moduleKey} control={form.control} name={`defaultModules.${moduleKey}` as any} render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-muted/30"><div className="space-y-0.5"><FormLabel className="text-sm capitalize">{moduleKey.replace(/([A-Z])/g, ' $1').trim()}</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />))}
              </div><FormDescription className="mt-2 text-xs">These modules will be enabled by default for the new school. They can be adjusted later.</FormDescription></section>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Link href="/superadmin/dashboard?tab=school_management" passHref>
                 <Button type="button" variant="outline" disabled={isSubmitting}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : (<PlusCircle className="mr-2 h-4 w-4" />)}{isSubmitting ? 'Registering...' : 'Register School (Conceptual)'}</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
