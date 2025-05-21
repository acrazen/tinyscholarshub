
// src/components/layout/app-header.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { Home, FolderKanban, GraduationCap, LayoutGrid, MessageSquare, ShieldCheck, UserCog, Briefcase, Settings, LogIn, LogOut } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import type { NavItem, UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppCustomization, type AppModuleKey } from '@/context/app-customization-context';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client
import { useToast } from '@/hooks/use-toast'; // For logout toast

const mainNavModuleMap: Record<AppModuleKey, { href: string; label: string; icon: NavItem['icon'] } | null> = {
  messaging: { href: '/messages', label: 'Messages', icon: MessageSquare },
  myLearning: { href: '/my-learning', label: 'My Learning', icon: GraduationCap },
  portfolio: { href: '/portfolio', label: 'Portfolio', icon: FolderKanban },
  eventBooking: null,
  resources: null,
  statementOfAccount: null,
  eService: null,
  settings: null,
  adminManageStudents: null,
  teacherSmartUpdate: null,
};

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter(); // For navigation after logout
  const { moduleSettings, currentUser, isLoadingAuth, tempSetUserRole } = useAppCustomization();
  const userRole = currentUser?.role;
  const { toast } = useToast();

  const baseNavItemsForParent: NavItem[] = [
    { href: '/', label: 'Home', icon: Home },
    ...(Object.keys(moduleSettings) as AppModuleKey[]).reduce((acc, key) => {
      const moduleConfig = mainNavModuleMap[key];
      if (moduleSettings[key] !== false && moduleConfig) {
        acc.push(moduleConfig);
      }
      return acc;
    }, [] as NavItem[]),
    { href: '/more', label: 'More', icon: LayoutGrid },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      // currentUser in context will be set to null by onAuthStateChange
      router.push('/'); // Redirect to home after logout
    }
  };

  const renderNavLinks = () => {
    // Show parent navigation if user is a Parent OR if no user is logged in (guest view)
    if (!currentUser || userRole === 'Parent') {
      return baseNavItemsForParent.map((item) => (
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
      ));
    }
    // For other roles, specific dashboard links will be shown instead of full nav.
    return null;
  };

  const getDashboardLink = (role: UserRole | undefined) => {
    switch (role) {
      case 'SchoolAdmin':
      case 'SchoolDataEditor':
      case 'SchoolFinanceManager':
        return { href: '/admin/dashboard', label: 'Admin Dashboard', icon: UserCog };
      case 'ClassTeacher':
      case 'Teacher':
        return { href: '/teacher/dashboard', label: 'Teacher Dashboard', icon: Briefcase };
      case 'SuperAdmin':
        return { href: '/superadmin/dashboard', label: 'Super Admin', icon: ShieldCheck };
      default:
        return null;
    }
  };

  const dashboardLink = getDashboardLink(userRole);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-wrap">
          {renderNavLinks()}
          {dashboardLink && currentUser && ( // Only show if currentUser and dashboardLink exists
            <Link
              href={dashboardLink.href}
              className={cn(
                "px-2 py-1 text-sm font-medium transition-colors hover:text-primary rounded-md text-muted-foreground flex items-center",
                pathname.startsWith(dashboardLink.href) && "text-primary bg-primary/10"
              )}
            >
              <dashboardLink.icon className="mr-1 h-4 w-4" /> {dashboardLink.label}
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-2">
          {isLoadingAuth ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted"></div>
          ) : currentUser ? (
            <>
              { (userRole !== 'Parent' && userRole !== 'SuperAdmin' && userRole !== 'Subscriber' && userRole !== 'Student_User') && (
                 <Link href="/more/settings" className="hidden md:flex items-center p-2 text-muted-foreground hover:text-primary" aria-label="Settings">
                    <Settings className="h-5 w-5" />
                 </Link>
              )}
              <div className={cn("md:hidden", (currentUser && userRole === 'Parent') && "md:block")}> {/* Show avatar on mobile, and on desktop for Parent */}
                  <Link href={(userRole === 'Parent' || !userRole) ? "/more/my-profile" : "/more/settings"} aria-label="My Profile or Settings">
                    <Avatar className="h-9 w-9 cursor-pointer">
                       {/* Using a generic avatar, update with user's actual avatar later */}
                      <AvatarImage src={`https://picsum.photos/seed/${currentUser.id}/40/40`} alt="User Profile" data-ai-hint="user avatar" />
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {currentUser.email ? currentUser.email.substring(0,1).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex">
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Link href="/auth" passHref legacyBehavior>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <LogIn className="mr-1 h-4 w-4" /> Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
