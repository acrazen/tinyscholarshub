
// src/app/(main)/more/statement-of-account/page.tsx
"use client"; // Required for using the context hook

import { Receipt, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppCustomization } from '@/context/app-customization-context'; // Import the hook

export default function StatementOfAccountPage() {
  const { moduleSettings } = useAppCustomization(); // Get module settings from context

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <Receipt className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Statement of Account</h1>
        <p className="text-muted-foreground">
          View your account statements and payment history.
        </p>
      </div>

      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>Details of your financial transactions with the school.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              Statement of Account feature is coming soon.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              You will be able to view detailed transaction history, outstanding balances, and download statements here.
            </p>
            {moduleSettings.paymentGateway && (
              <div className="mt-6 p-4 border border-green-500/30 bg-green-500/10 rounded-lg">
                <div className="flex items-center justify-center text-green-700 mb-2">
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span className="font-semibold text-sm">Online Payments Enabled!</span>
                </div>
                <p className="text-xs text-green-600">
                  This school supports online fee payments. You'll be able to pay fees directly through the app soon.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        {moduleSettings.paymentGateway && (
            <CardFooter>
                <Button className="w-full" disabled>
                    <CreditCard className="mr-2 h-4 w-4"/> Make a Payment (Coming Soon)
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
