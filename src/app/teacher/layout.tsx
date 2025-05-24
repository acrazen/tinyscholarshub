// src/app/teacher/layout.tsx
import { AppHeader } from "@/components/layout/app-header"; 
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"; 

export default function TeacherAppLayout({
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
      <MobileBottomNav /> 
      <div className="pb-16 md:pb-0"></div>
    </div>
  );
}

    