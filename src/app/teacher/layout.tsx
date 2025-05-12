// src/app/teacher/layout.tsx
import { AppHeader } from "@/components/layout/app-header"; // Can be a teacher-specific header later
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"; // Can be teacher-specific later

export default function TeacherAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout can be customized for teachers, e.g., different nav items in AppHeader.
  // For now, it reuses the main AppHeader and MobileBottomNav.
  // In a real app, you'd pass role-specific props or use different components.
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader /> 
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      {/* MobileBottomNav might be different or hidden for teachers on larger screens */}
      <MobileBottomNav /> 
      <div className="pb-16 md:pb-0"></div>
    </div>
  );
}
