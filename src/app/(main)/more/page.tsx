
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
  IndianRupee, // Changed from Receipt for Statement of Account
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
  { label: "Statement of Account", icon: IndianRupee, color: chartColors[4], href: "/more/statement-of-account" },
  { label: "eService", icon: FilePenLine, color: chartColors[0], href: "/more/eservice" },
  { label: "Settings", icon: Settings, color: chartColors[1], href: "/more/settings" }, // New item
];

export default function MorePage() {
  return (
    <div>
      {/* The h1 "More Options" title has been removed */}
      {/* Adjusted grid columns for responsiveness and gap */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {moreItems.map((item, index) => (
          <Link href={item.href} key={item.label} legacyBehavior>
            <a className="block h-full">
              <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center justify-center p-1 sm:p-1.5 aspect-square bg-card hover:bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center text-center p-0.5">
                  {/* Adjusted icon sizes for better scaling */}
                  <item.icon className={`h-8 w-8 sm:h-9 md:h-10 mb-1 sm:mb-1.5 ${item.color}`} strokeWidth={1.5} />
                  {/* Adjusted text sizes for better readability */}
                  <p className="text-xs sm:text-sm font-medium text-foreground mt-1 sm:mt-1.5 leading-tight">
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
