// src/app/superadmin/layout.tsx
import { AppHeader } from "@/components/layout/app-header";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader /> 
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      {/* No MobileBottomNav for SuperAdmin */}
    </div>
  );
}

    