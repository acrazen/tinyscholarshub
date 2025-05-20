
// src/components/layout/app-header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderKanban, GraduationCap, LayoutGrid, MessageSquare, ShieldCheck, UserCog, Briefcase } from 'lucide-react'; // Added UserCog, Briefcase
import { Logo } from '@/components/icons/logo';
import type { NavItem, UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppCustomization, type AppModuleKey } from '@/context/app-customization-context';

// Map module keys to their primary navigation paths and labels
const mainNavModuleMap: Record<AppModuleKey, { href: string; label: string; icon: NavItem['icon'] } | null> = {
  messaging: { href: '/messages', label: 'Messages', icon: MessageSquare },
  myLearning: { href: '/my-learning', label: 'My Learning', icon: GraduationCap },
  portfolio: { href: '/portfolio', label: 'Portfolio', icon: FolderKanban },
  eventBooking: null, // Not a primary nav item, accessed via "More"
  resources: null, // Not a primary nav item, accessed via "More"
  statementOfAccount: null, // Not a primary nav item, accessed via "More"
  eService: null, // Not a primary nav item, accessed via "More"
  settings: null, // Settings page is in "More"
  adminManageStudents: null, // Admin specific
  teacherSmartUpdate: null, // Teacher specific
};


export function AppHeader() {
  const pathname = usePathname();
  const { moduleSettings, currentUserRole } = useAppCustomization(); // Get currentUserRole

  const baseNavItems: NavItem[] = [
    { href: '/', label: 'Home', icon: Home },
    // Dynamically add module-based nav items
    ...(Object.keys(moduleSettings) as AppModuleKey[]).reduce((acc, key) => {
      if (moduleSettings[key] && mainNavModuleMap[key]) {
        // Further filter based on role if needed for main nav items
        // For now, main user nav items are primarily for 'Parent' role
        if (currentUserRole === 'Parent') {
            acc.push(mainNavModuleMap[key]!);
        }
      }
      return acc;
    }, [] as NavItem[]),
    { href: '/more', label: 'More', icon: LayoutGrid },
  ];

  // Determine if admin/teacher/superadmin links should be shown
  const showAdminLink = currentUserRole === 'Admin';
  const showTeacherLink = currentUserRole === 'Teacher';
  const showSuperAdminLink = currentUserRole === 'SuperAdmin';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-wrap">
          {/* Parent/User specific main navigation */}
          {currentUserRole === 'Parent' && baseNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-2 py-1 text-sm font-medium transition-colors hover:text-primary rounded-md",
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Role-specific dashboard links */}
          {showAdminLink && (
             <Link
              href="/admin/dashboard"
              className={cn(
                "px-2 py-1 text-sm font-medium transition-colors hover:text-primary rounded-md text-muted-foreground flex items-center",
                pathname.startsWith('/admin') && "text-primary bg-primary/10"
              )}
            >
              <UserCog className="mr-1 h-4 w-4" /> Admin Dashboard
            </Link>
          )}
          {showTeacherLink && (
             <Link
              href="/teacher/dashboard"
              className={cn(
                "px-2 py-1 text-sm font-medium transition-colors hover:text-primary rounded-md text-muted-foreground flex items-center",
                pathname.startsWith('/teacher') && "text-primary bg-primary/10"
              )}
            >
              <Briefcase className="mr-1 h-4 w-4" /> Teacher Dashboard
            </Link>
          )}
           {showSuperAdminLink && (
             <Link
                href="/superadmin/dashboard"
                className={cn(
                  "px-2 py-1 text-sm font-medium transition-colors hover:text-primary rounded-md text-muted-foreground flex items-center",
                  pathname.startsWith('/superadmin') && "text-primary bg-primary/10"
                )}
              >
                <ShieldCheck className="mr-1 h-4 w-4" /> Super Admin
              </Link>
           )}
        </nav>

        <div className="md:hidden">
          {/* Avatar link logic might depend on the role, or always point to a generic profile/settings */}
          <Link href={currentUserRole === 'Parent' ? "/more/my-profile" : "/more/settings"} aria-label="My Profile or Settings">
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src="https://picsum.photos/seed/headeravatar/40/40" alt="User Profile" data-ai-hint="user avatar" />
              <AvatarFallback className="bg-muted text-muted-foreground">
                U
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
