
// src/app/auth/page.tsx
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { LogIn, UserPlus, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import type { UserRole } from '@/lib/types'; // Import UserRole if needed for typing

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type FormData = z.infer<typeof formSchema>;

// Helper function to determine redirect path based on email
const getRedirectPath = (email?: string | null): string => {
  if (!email) return '/'; // Default for safety or if email is somehow null

  switch (email) {
    case 'superadmin@example.com':
      return '/superadmin/dashboard';
    case 'appmanager@example.com':
      return '/app-manager/management/dashboard';
    case 'appmanagerfinance@example.com':
      return '/app-manager/finance/dashboard';
    case 'appmanagersales@example.com':
      return '/app-manager/finance/dashboard'; // Or specific sales dashboard if created
    case 'appmanagersupport@example.com':
      return '/app-manager/management/dashboard'; // Or specific support dashboard
    case 'schooladmin@example.com':
      return '/admin/dashboard';
    case 'contenteditor@example.com':
      return '/school-data-editor/dashboard';
    case 'schoolfinance@example.com':
      return '/school-finance-manager/dashboard';
    case 'classteacher@example.com':
    case 'teacher@example.com':
      return '/teacher/dashboard';
    case 'parent@example.com': // Explicitly Parent role
    default: // Default for parents, subscribers, or any other role not specifically routed
      return '/';
  }
};


export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md shadow-xl rounded-xl">
          <CardHeader className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <CardTitle className="text-2xl font-bold">Supabase Not Configured</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Authentication features are unavailable because Supabase environment variables (URL and Anon Key) are not set.
              Please configure them in your Firebase Studio project settings.
            </p>
          </CardContent>
           <CardFooter>
            <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">Back to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);
    try {
      let userEmail: string | undefined | null = formData.email;

      if (isSignUp) {
        const { data: signUpData, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        
        userEmail = signUpData.user?.email; // Get email from signup data
        
        toast({ title: "Sign Up Successful!", description: "Please check your email to confirm your account." });
        // For sign-up, Supabase usually requires email confirmation.
        // Redirecting to a generic page or success message might be better than direct dashboard access.
        // However, for prototype purposes and immediate role testing, we'll redirect based on role.
        // router.push('/'); // Or a page like /auth/confirm-email

      } else { // Sign In
        const { data: signInData, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        userEmail = signInData.user?.email; // Get email from signin data
        toast({ title: "Sign In Successful!", description: "Welcome back!" });
      }
      
      // Determine redirect path based on user's email (which dictates their role in this prototype)
      const redirectPath = getRedirectPath(userEmail);
      router.push(redirectPath);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: isSignUp ? "Sign Up Failed" : "Sign In Failed",
        description: error.error_description || error.message || "An unexpected error occurred.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isSignUp ? <UserPlus className="h-12 w-12 text-primary" /> : <LogIn className="h-12 w-12 text-primary" />}
          </div>
          <CardTitle className="text-3xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Enter your details to get started." : "Sign in to access your account."}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="text-base"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="text-base"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-6">
              <Button type="submit" disabled={isLoading || !supabase} className="w-full" size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : isSignUp ? (
                  <UserPlus className="mr-2 h-5 w-5" />
                ) : (
                  <LogIn className="mr-2 h-5 w-5" />
                )}
                {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  form.reset();
                }}
                disabled={isLoading || !supabase}
                className="text-sm"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
