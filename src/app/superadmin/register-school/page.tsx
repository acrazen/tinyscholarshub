
// src/app/superadmin/register-school/page.tsx
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Label is used by FormLabel
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator'; // Import Separator
import { useToast } from '@/hooks/use-toast';
import { Briefcase, Loader2, PlusCircle, ArrowLeft, Building } from 'lucide-react';
import { useAppCustomization } from '@/context/app-customization-context';
import Link from 'next/link';

const registerSchoolSchema = z.object({
  schoolName: z.string().min(3, "School name must be at least 3 characters."),
  subdomain: z.string().min(3, "Subdomain must be at least 3 characters.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Subdomain can only contain lowercase letters, numbers, and hyphens."),
  adminEmail: z.string().email("Invalid email address for admin."),
  subscriptionModel: z.enum(["perStudentMonthly", "flatFeeMonthly", "tieredFeature", "customPackage"]),
  pricePerStudent: z.string().optional(), // string to allow empty, convert to number on submit
  flatFee: z.string().optional(), // string to allow empty, convert to number on submit
  maxAdmins: z.coerce.number().min(1, "At least 1 admin required.").max(10),
  maxTeachers: z.coerce.number().min(1, "At least 1 teacher required.").max(100),
  maxClassTeachers: z.coerce.number().min(0).max(50),
  studentLimit: z.coerce.number().min(10, "Minimum 10 students.").max(10000),
  packageName: z.string().min(2, "Package name is required.").optional(),
});

type RegisterSchoolFormData = z.infer<typeof registerSchoolSchema>;

export default function RegisterSchoolPage() {
  const { toast } = useToast();
  const { currentUser } = useAppCustomization();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterSchoolFormData>({
    resolver: zodResolver(registerSchoolSchema),
    defaultValues: {
      schoolName: '',
      subdomain: '',
      adminEmail: '',
      subscriptionModel: 'perStudentMonthly',
      pricePerStudent: '',
      flatFee: '',
      maxAdmins: 1,
      maxTeachers: 10,
      maxClassTeachers: 5,
      studentLimit: 100,
      packageName: '',
    },
  });

  const watchedSubscriptionModel = form.watch("subscriptionModel");

  const onSubmit: SubmitHandler<RegisterSchoolFormData> = async (data) => {
    setIsSubmitting(true);
    // In a real app, this would make an API call to your backend
    console.log("Conceptual School Registration Data:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "School Registration Initiated (Conceptual)",
      description: `Simulating registration for ${data.schoolName}. Backend integration required.`,
    });
    setIsSubmitting(false);
    form.reset(); // Reset form after successful conceptual submission
  };

  if (currentUser?.role !== 'SuperAdmin' && currentUser?.role !== 'AppManager_Management') {
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
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Building className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl md:text-3xl">Register New School</CardTitle>
          </div>
          <CardDescription>
            Fill in the details below to create a new school instance on the platform. All fields are conceptual.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Little Stars Preschool" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="subdomain"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Desired Subdomain</FormLabel>
                        <FormControl>
                        <div className="flex items-center">
                            <Input placeholder="e.g., littlestars" {...field} className="rounded-r-none" />
                            <span className="px-3 py-2 text-sm bg-muted border border-l-0 border-input rounded-r-md text-muted-foreground">
                            .yourapp.com
                            </span>
                        </div>
                        </FormControl>
                        <FormDescription>Lowercase letters, numbers, hyphens only.</FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="adminEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial School Admin Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@schoolname.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />
              <h3 className="text-lg font-medium">Subscription & Package</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="subscriptionModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subscription model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="perStudentMonthly">Per Student (Monthly)</SelectItem>
                          <SelectItem value="flatFeeMonthly">Flat Fee (Monthly)</SelectItem>
                          <SelectItem value="tieredFeature">Feature-Tiered Plan</SelectItem>
                          <SelectItem value="customPackage">Custom Package</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="packageName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Package Name/ID</FormLabel>
                        <FormControl>
                            <Input placeholder="E.g., Basic, Premium, SchoolTier1" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
              </div>
              
              {watchedSubscriptionModel === 'perStudentMonthly' && (
                <FormField
                  control={form.control}
                  name="pricePerStudent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Per Student (/month)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {watchedSubscriptionModel === 'flatFeeMonthly' && (
                <FormField
                  control={form.control}
                  name="flatFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flat Fee (/month)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Separator />
              <h3 className="text-lg font-medium">User & Resource Limits</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="maxAdmins"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Admins</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxTeachers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Teachers</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxClassTeachers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Class Teachers</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Limit</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Link href="/superadmin/dashboard" passHref>
                 <Button type="button" variant="outline" disabled={isSubmitting}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PlusCircle className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? 'Registering...' : 'Register School (Conceptual)'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
