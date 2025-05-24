// src/app/admin/layout.tsx
import { AppHeader } from "@/components/layout/app-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"; // SchoolAdmin might still need mobile nav

export default function AdminAppLayout({
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
      {/* SchoolAdmin roles might use mobile nav if they access student-facing features or for convenience */}
      <MobileBottomNav /> 
      <div className="pb-16 md:pb-0"></div>
    </div>
  );
}

    