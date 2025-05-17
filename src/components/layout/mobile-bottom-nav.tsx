// src/components/layout/mobile-bottom-nav.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderKanban, GraduationCap, LayoutGrid, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/portfolio', label: 'Portfolio', icon: FolderKanban },
  { href: '/my-learning', label: 'My Learning', icon: GraduationCap },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/more', label: 'More', icon: LayoutGrid },
];

// Filter nav items based on current path context (e.g. if in /teacher or /admin)
// For now, this navigation is primarily for the (main) parent layout.
const currentNavItems = navItems;

export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    // For messages and more, check exact path, otherwise startsWith
    if (href === '/messages' || href === '/more' || href === '/my-learning') return pathname === href;
    return pathname.startsWith(href);
  };

  // Determine number of items for grid layout
  const itemCount = currentNavItems.length;
  // Tailwind JIT needs full class names, so we might need to map this explicitly
  // For now, using flex justify-around will work better for dynamic item counts

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 p-1 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex justify-around">
        {currentNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center rounded-md p-1.5 transition-colors flex-1 max-w-[20%]", // Use flex-1 and max-w for equal distribution
              isActive(item.href)
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
          >
            <item.icon className={cn("h-7 w-7 mb-0.5", isActive(item.href) ? "text-primary" : "")} />
            <span className="text-sm font-medium leading-tight text-center">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
