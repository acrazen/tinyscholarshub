// src/components/layout/app-header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderKanban, GraduationCap, LayoutGrid, Menu, MessageSquare, Settings } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import type { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/portfolio', label: 'Portfolio', icon: FolderKanban },
  { href: '/my-learning', label: 'My Learning', icon: GraduationCap },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/more', label: 'More', icon: LayoutGrid },
];


export function AppHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter nav items based on current path context (e.g. if in /teacher or /admin)
  // For now, this header is primarily for the (main) parent layout.
  // Teacher/Admin layouts might have their own headers or customize these items.
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
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 pt-6">
              <div className="px-6 mb-4">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Logo />
                </Link>
              </div>
              <nav className="flex flex-col space-y-1 px-4">
                {currentNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
