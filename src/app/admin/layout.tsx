// src/app/admin/layout.tsx
import { AppHeader } from "@/components/layout/app-header"; // Can be admin-specific header later
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"; // Can be admin-specific later

export default function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout can be customized for admins.
  // For now, it reuses the main AppHeader and MobileBottomNav.
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <MobileBottomNav />
      <div className="pb-16 md:pb-0"></div>
    </div>
  );
}
