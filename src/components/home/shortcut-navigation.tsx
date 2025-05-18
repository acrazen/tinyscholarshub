// src/components/home/shortcut-navigation.tsx
"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ScanLine, GraduationCap, IndianRupee } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useAppCustomization, type AppModuleKey } from '@/context/app-customization-context';

interface ShortcutItem {
  label: string;
  icon: LucideIcon;
  href: string;
  isNew?: boolean;
  iconBgColor?: string;
  iconColor?: string;
  moduleKey: AppModuleKey; // Module key to check for visibility
}

const allShortcutItems: ShortcutItem[] = [
  {
    label: "Messaging",
    icon: MessageSquare,
    href: "/messages",
    iconBgColor: "bg-blue-500",
    iconColor: "text-white",
    moduleKey: 'messaging',
  },
  {
    label: "Check In/Out",
    icon: ScanLine,
    href: "#", 
    iconBgColor: "bg-yellow-500",
    iconColor: "text-white",
    moduleKey: 'portfolio', // Example: Tying to portfolio or a new specific module
  },
  {
    label: "My Learning",
    icon: GraduationCap,
    href: "/my-learning",
    isNew: true,
    iconBgColor: "bg-sky-500",
    iconColor: "text-white",
    moduleKey: 'myLearning',
  },
  {
    label: "Statement",
    icon: IndianRupee,
    href: "/more/statement-of-account",
    iconBgColor: "bg-orange-500",
    iconColor: "text-white",
    moduleKey: 'statementOfAccount',
  },
];

export function ShortcutNavigation() {
  const { moduleSettings } = useAppCustomization();

  useEffect(() => {
    console.log("ShortcutNavigation component rendered.");
  }, []);

  const visibleShortcutItems = allShortcutItems.filter(item => moduleSettings[item.moduleKey] !== false);

  if (visibleShortcutItems.length === 0) {
    return null; // Or a placeholder if no shortcuts are enabled
  }

  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {visibleShortcutItems.map((item) => (
          <Link href={item.href} key={item.label} legacyBehavior>
            <a className="block group">
              <Card className="shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200 overflow-hidden bg-card h-full flex flex-col items-center justify-center aspect-[4/5] sm:aspect-square">
                <CardContent className="flex flex-col items-center justify-center text-center p-2 sm:p-3 flex-grow w-full">
                  <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-2 ${item.iconBgColor || 'bg-primary/10'}`}>
                    <item.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${item.iconColor || 'text-primary'}`} strokeWidth={1.5} />
                    {item.isNew && (
                      <Badge className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] px-1 py-0.5">NEW</Badge>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-foreground leading-tight group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
