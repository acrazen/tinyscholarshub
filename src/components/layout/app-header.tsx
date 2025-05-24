// src/components/layout/app-header.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, FolderKanban, GraduationCap, LayoutGrid, MessageSquare,
  ShieldCheck, UserCog, Briefcase, Settings, LogIn, LogOut,
  Users, DollarSign, BuildingIcon as AppManagerIcon, FileText, Edit, SlidersHorizontal, UserCheck as AppSupportIcon,
  Building as SchoolIcon, Settings2
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import type { NavItem, UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppCustomization, type AppModuleKey } from '@/context/app-customization-context';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

const platformManagementRoles: UserRole[] = [
  'SuperAdmin', 'AppManager_Management', 'AppManager_Sales',
  'AppManager_Finance', 'AppManager_Support'
];

const schoolSpecificAdminRoles: UserRole[] = [
  'SchoolAdmin', 'SchoolDataEditor', 'SchoolFinanceManager'
];

const teacherRoles: UserRole[] = ['ClassTeacher', 'Teacher'];
const parentRoles: UserRole[] = ['Parent', 'Subscriber'];

const mainAppNavModuleMap: Record<AppModuleKey, { href: string; label: string; icon: NavItem['icon'] } | null> = {
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
  paymentGateway: null,
};


export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { moduleSettings, currentUser, isLoadingAuth } = useAppCustomization();
  const userRole = currentUser?.role;
  const { toast } = useToast();

  const getDashboardLink = (role: UserRole | undefined): NavItem | null => {
    switch (role) {
      case 'SuperAdmin':
        return { href: '/superadmin/dashboard', label: 'Super Admin', icon: ShieldCheck };
      case 'AppManager_Management':
        return { href: '/app-manager/management/dashboard', label: 'App Mgmt', icon: AppManagerIcon };
      case 'AppManager_Finance':
        return { href: '/app-manager/finance/dashboard', label: 'App Finance', icon: DollarSign };
      case 'AppManager_Sales':
        return { href: '/app-manager/finance/dashboard', label: 'App Sales & Finance', icon: Users };
      case 'AppManager_Support':
        return { href: '/app-manager/management/dashboard', label: 'App Support', icon: AppSupportIcon };
      case 'SchoolAdmin':
        return { href: '/admin/dashboard', label: 'School Admin', icon: UserCog };
      case 'SchoolDataEditor':
        return { href: '/school-data-editor/dashboard', label: 'Content Editor', icon: Edit };
      case 'SchoolFinanceManager':
        return { href: '/school-finance-manager/dashboard', label: 'School Finance', icon: FileText };
      case 'ClassTeacher':
      case 'Teacher':
        return { href: '/teacher/dashboard', label: 'Teacher Tools', icon: Briefcase };
      default:
        return null;
    }
  };

  const handleLogout = async () => {
    if (!supabase) {
        toast({ title: "Supabase Not Configured", description: "Cannot log out.", variant: "destructive"});
        return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push('/auth');
    }
  };

  const isPlatformManagementUser = userRole && platformManagementRoles.includes(userRole);
  const isTenantAppUser = userRole && !isPlatformManagementUser; // Any role that is not a platform management role

  const dashboardLink = getDashboardLink(userRole);

  const mainNavItems: NavItem[] = [
    { href: '/', label: 'Home', icon: Home },
    ...(Object.keys(moduleSettings) as AppModuleKey[]).reduce((acc, key) => {
      const moduleConfig = mainAppNavModuleMap[key];
      if (moduleSettings[key] !== false && moduleConfig) {
        acc.push(moduleConfig);
      }
      return acc;
    }, [] as NavItem[]),
    { href: '/more', label: 'More', icon: LayoutGrid },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={isPlatformManagementUser && dashboardLink ? dashboardLink.href : "/"} className="flex items-center space-x-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-wrap">
          {isPlatformManagementUser && dashboardLink && (
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

          {isTenantAppUser && (
            <>
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-2 py-1 text-sm font-medium transition-colors hover:text-primary rounded-md text-muted-foreground",
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      ? "text-primary bg-primary/10"
                      : ""
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {/* Specific dashboard link for tenant app admins/teachers if not covered by main nav */}
              {dashboardLink && (schoolSpecificAdminRoles.includes(userRole!) || teacherRoles.includes(userRole!)) && (
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
            </>
          )}
        </nav>

        <div className="flex items-center space-x-3">
          {isLoadingAuth ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted"></div>
          ) : currentUser ? (
            <>
              {isTenantAppUser && (
                 <Link href="/more/settings" className="hidden md:flex items-center p-2 text-muted-foreground hover:text-primary" aria-label="App Settings">
                    <Settings className="h-5 w-5" />
                 </Link>
              )}
              <div className={cn("md:hidden", isTenantAppUser && "md:block")}>
                  <Link href={(parentRoles.includes(userRole!) || !userRole) ? "/more/my-profile" : "/more/settings"} aria-label="My Profile or App Settings">
                    <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
                      <AvatarImage src={currentUser.user_metadata?.avatar_url || `https://picsum.photos/seed/${currentUser.id}/40/40`} alt={currentUser.user_metadata?.full_name || currentUser.email || "User"} data-ai-hint="user avatar" />
                      <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                        {(currentUser.email ? currentUser.email.substring(0,1) : (currentUser.user_metadata?.full_name ? currentUser.user_metadata?.full_name.substring(0,1) : 'U')).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex">
                <LogOut className="mr-1.5 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Link href="/auth" passHref legacyBehavior>
              <Button variant="default" size="sm" className="flex">
                <LogIn className="mr-1.5 h-4 w-4" /> Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
