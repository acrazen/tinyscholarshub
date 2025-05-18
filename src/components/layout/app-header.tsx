
// src/components/layout/app-header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderKanban, GraduationCap, LayoutGrid, MessageSquare, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import type { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/portfolio', label: 'Portfolio', icon: FolderKanban },
  { href: '/my-learning', label: 'My Learning', icon: GraduationCap },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/more', label: 'More', icon: LayoutGrid },
];


export function AppHeader() {
  const pathname = usePathname();

  const currentNavItems = navItems;


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-wrap">
          {currentNavItems.map((item) => (
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
           {/* Super Admin Link - Desktop Only */}
           <Link
              href="/superadmin/dashboard"
              className={cn(
                "px-2 py-1 text-sm font-medium transition-colors hover:text-primary rounded-md text-muted-foreground hidden md:flex items-center",
                pathname.startsWith('/superadmin') && "text-primary bg-primary/10"
              )}
            >
              <ShieldCheck className="mr-1 h-4 w-4" /> Super Admin
            </Link>
        </nav>

        {/* Mobile Profile Avatar Link */}
        <div className="md:hidden">
          <Link href="/more/my-profile" aria-label="My Profile">
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src="https://picsum.photos/seed/headeravatar/40/40" alt="My Profile" data-ai-hint="user avatar" />
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
    
