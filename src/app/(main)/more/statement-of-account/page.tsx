// src/app/(main)/more/statement-of-account/page.tsx
import { Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function StatementOfAccountPage() {
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}