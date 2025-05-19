
// src/app/(main)/more/page.tsx
"use client"; 

import {
  Award, Megaphone, CalendarDays, FileSignature, CalendarPlus, LibraryBig,
  PlaneTakeoff, UserCircle2, ListChecks, IndianRupee, FilePenLine, Settings, SlidersHorizontal
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useAppCustomization, type AppModuleKey } from '@/context/app-customization-context';

interface MoreItem {
  label: string;
  icon: LucideIcon;
  color: string;
  href: string;
  moduleKey?: AppModuleKey | 'chatSettings'; // Allow 'chatSettings' as a special key
}

const chartColors = [
  "text-[hsl(var(--chart-1))]",
  "text-[hsl(var(--chart-2))]",
  "text-[hsl(var(--chart-3))]",
  "text-[hsl(var(--chart-4))]",
  "text-[hsl(var(--chart-5))]",
];

const allMoreItems: MoreItem[] = [
  { label: "Our Awards", icon: Award, color: chartColors[0], href: "#" },
  { label: "Announcements", icon: Megaphone, color: chartColors[1], href: "#" },
  { label: "Calendar", icon: CalendarDays, color: chartColors[2], href: "#" },
  { label: "eConsent", icon: FileSignature, color: chartColors[3], href: "#" },
  { label: "Event Booking", icon: CalendarPlus, color: chartColors[4], href: "/more/event-booking", moduleKey: 'eventBooking' },
  { label: "Resources", icon: LibraryBig, color: chartColors[0], href: "/more/resources", moduleKey: 'resources' },
  { label: "Travel Declaration", icon: PlaneTakeoff, color: chartColors[1], href: "#" },
  { label: "Kid's Profile", icon: UserCircle2, color: chartColors[2], href: "/portfolio", moduleKey: 'portfolio' }, 
  { label: "Survey", icon: ListChecks, color: chartColors[3], href: "#" },
  { label: "Statement of Account", icon: IndianRupee, color: chartColors[4], href: "/more/statement-of-account", moduleKey: 'statementOfAccount' },
  { label: "eService", icon: FilePenLine, color: chartColors[0], href: "/more/eservice", moduleKey: 'eService' },
  { label: "Chat Settings", icon: SlidersHorizontal, color: chartColors[3], href: "/messages/settings", moduleKey: 'messaging' }, // Or a new moduleKey: 'chatSettings' if desired
  { label: "App Settings", icon: Settings, color: chartColors[1], href: "/more/settings", moduleKey: 'settings' },
];

export default function MorePage() {
  const { moduleSettings } = useAppCustomization();

  const visibleMoreItems = allMoreItems.filter(item => {
    if (item.moduleKey) {
      // Handle AppModuleKey or the special 'chatSettings' string
      if (item.moduleKey === 'chatSettings') { 
        // Assuming chat settings are visible if general messaging is enabled
        return moduleSettings['messaging'] !== false;
      }
      // Cast to AppModuleKey for other cases if TS complains
      return moduleSettings[item.moduleKey as AppModuleKey] !== false;
    }
    return true; // Show if no moduleKey (like "Our Awards")
  });

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {visibleMoreItems.map((item) => (
          <Link href={item.href} key={item.label} legacyBehavior>
            <a className="block h-full">
              <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center justify-center p-1 sm:p-1.5 aspect-square bg-card hover:bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center text-center p-0.5">
                  <item.icon className={`h-9 w-9 sm:h-10 md:h-10 mb-1 sm:mb-1.5 ${item.color}`} strokeWidth={1.5} />
                  <p className="text-[10px] sm:text-xs font-medium text-foreground mt-1 sm:mt-1.5 leading-tight">
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
