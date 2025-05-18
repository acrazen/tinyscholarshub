// src/app/superadmin/layout.tsx
// This is a basic layout for the super admin section.
// It could have a different header/nav if needed.

import { AppHeader } from "@/components/layout/app-header"; // Or a specific SuperAdminHeader

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* For a real super admin, you might have a different header
          or no standard app header if it's a purely administrative backend UI.
          Using AppHeader for now as a placeholder. */}
      <AppHeader /> 
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      {/* No mobile bottom nav typically for super admin */}
    </div>
  );
}
