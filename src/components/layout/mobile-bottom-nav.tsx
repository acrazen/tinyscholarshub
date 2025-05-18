// src/components/layout/mobile-bottom-nav.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderKanban, GraduationCap, LayoutGrid, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';
import { useAppCustomization, type AppModuleKey } from '@/context/app-customization-context';

// Map module keys to their primary navigation paths and labels for bottom nav
// This ensures we have icons and correct labels for dynamic filtering.
const bottomNavModuleMap: Record<AppModuleKey, NavItem | null > = {
  messaging: { href: '/messages', label: 'Messages', icon: MessageSquare },
  myLearning: { href: '/my-learning', label: 'My Learning', icon: GraduationCap },
  portfolio: { href: '/portfolio', label: 'Portfolio', icon: FolderKanban },
  // Modules typically found in "More" section are not primary bottom nav items
  eventBooking: null,
  resources: null,
  statementOfAccount: null,
  eService: null,
  settings: null,
  adminManageStudents: null,
  teacherSmartUpdate: null,
};


export function MobileBottomNav() {
  const pathname = usePathname();
  const { moduleSettings } = useAppCustomization();

  const baseNavItems: NavItem[] = [
    { href: '/', label: 'Home', icon: Home },
    // Dynamically filter and add module-based nav items
    ...(Object.keys(moduleSettings) as AppModuleKey[]).reduce((acc, key) => {
      if (moduleSettings[key] && bottomNavModuleMap[key]) {
        acc.push(bottomNavModuleMap[key]!);
      }
      return acc;
    }, [] as NavItem[]),
    { href: '/more', label: 'More', icon: LayoutGrid }, // "More" is always present
  ];


  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/messages' || href === '/more' || href === '/my-learning' || href === '/portfolio') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 p-1 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex justify-around">
        {baseNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center rounded-md p-1.5 transition-colors flex-1 max-w-[20%]",
              isActive(item.href)
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
          >
            <item.icon className={cn("h-7 w-7 mb-1", isActive(item.href) ? "text-primary" : "")} />
            <span className="text-sm font-medium leading-tight text-center">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
