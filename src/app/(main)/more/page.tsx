
// src/app/(main)/more/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Megaphone,
  CalendarDays,
  FileSignature, // For eConsent
  CalendarPlus, // For Event Booking
  LibraryBig, // For Resources
  PlaneTakeoff, // For Travel Declaration
  UserCircle2, // For Kid's Profile (was UserCog for My Profile)
  ListChecks, // For Survey
  Receipt, // For Statement of Account
  FilePenLine, // For eService
  Settings, // For Settings
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface MoreItem {
  label: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

const chartColors = [
  "text-[hsl(var(--chart-1))]",
  "text-[hsl(var(--chart-2))]",
  "text-[hsl(var(--chart-3))]",
  "text-[hsl(var(--chart-4))]",
  "text-[hsl(var(--chart-5))]",
];

const moreItems: MoreItem[] = [
  { label: "Our Awards", icon: Award, color: chartColors[0], href: "#" },
  { label: "Announcements", icon: Megaphone, color: chartColors[1], href: "#" },
  { label: "Calendar", icon: CalendarDays, color: chartColors[2], href: "#" },
  { label: "eConsent", icon: FileSignature, color: chartColors[3], href: "#" },
  { label: "Event Booking", icon: CalendarPlus, color: chartColors[4], href: "/more/event-booking" },
  { label: "Resources", icon: LibraryBig, color: chartColors[0], href: "/more/resources" },
  { label: "Travel Declaration", icon: PlaneTakeoff, color: chartColors[1], href: "#" },
  { label: "Kid's Profile", icon: UserCircle2, color: chartColors[2], href: "/portfolio" }, 
  { label: "Survey", icon: ListChecks, color: chartColors[3], href: "#" },
  { label: "Statement of Account", icon: Receipt, color: chartColors[4], href: "/more/statement-of-account" },
  { label: "eService", icon: FilePenLine, color: chartColors[0], href: "/more/eservice" },
  { label: "Settings", icon: Settings, color: chartColors[1], href: "/more/settings" }, // New item
];

export default function MorePage() {
  return (
    <div>
      {/* The h1 "More Options" title has been removed */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
        {moreItems.map((item, index) => (
          <Link href={item.href} key={item.label} legacyBehavior>
            <a className="block h-full">
              {/* Reduced padding on Card from p-1.5 sm:p-2 to p-1 sm:p-1.5 */}
              <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center justify-center p-1 sm:p-1.5 aspect-square bg-card hover:bg-muted/50">
                {/* Reduced padding on CardContent from p-1 to p-0.5 */}
                <CardContent className="flex flex-col items-center justify-center text-center p-0.5">
                  {/* Increased icon size from h-8 w-8 sm:h-9 to h-9 w-9 sm:h-10 sm:w-10, and mb-1 */}
                  <item.icon className={`h-9 w-9 sm:h-10 sm:w-10 mb-1 ${item.color}`} strokeWidth={1.5} />
                  {/* Increased text size from text-[9px] sm:text-[11px] to text-[10px] sm:text-xs */}
                  <p className="text-[13px] sm:text-xs font-medium text-foreground mt-0.5 sm:mt-1 leading-tight">
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
