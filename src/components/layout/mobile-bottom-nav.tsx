"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';

const navItems: NavItem[] = [
  { href: '/', label: 'Feed', icon: Newspaper },
  { href: '/students', label: 'Students', icon: Users },
  { href: '/smart-update', label: 'Update', icon: Sparkles },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  // Determine if the current path is a sub-path of a student detail page
  // to keep "Students" tab active.
  const isActive = (href: string) => {
    if (href === '/students' && pathname.startsWith('/students/')) {
      return true;
    }
    return pathname === href;
  };


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center rounded-md p-2 transition-colors w-1/3",
              isActive(item.href)
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
          >
            <item.icon className={cn("h-6 w-6", isActive(item.href) ? "text-primary" : "")} />
            <span className="mt-1 text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
