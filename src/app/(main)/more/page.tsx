// src/app/(main)/more/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Megaphone,
  CalendarDays,
  FileSignature,
  CalendarPlus,
  LibraryBig,
  PlaneTakeoff,
  UserCircle2,
  ListChecks,
  UserCog, // Added for My Profile
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
  { label: "Travel", icon: PlaneTakeoff, color: chartColors[1], href: "#" },
  { label: "Kid's Profiles", icon: UserCircle2, color: chartColors[2], href: "/more/kids-profile" },
  { label: "My Profile", icon: UserCog, color: chartColors[4], href: "/more/my-profile" }, // New Item
  { label: "Survey", icon: ListChecks, color: chartColors[3], href: "#" },
  // Add two more dummy items to make it a 3x4 or adjust grid
  { label: "Placeholder 1", icon: Award, color: chartColors[0], href: "#" },
  { label: "Placeholder 2", icon: Megaphone, color: chartColors[1], href: "#" },


];

export default function MorePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-center md:text-left">More Options</h1>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {moreItems.map((item) => (
          <Link href={item.href} key={item.label} legacyBehavior>
            <a className="block h-full">
              <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center justify-center p-2 sm:p-3 aspect-square bg-card hover:bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center text-center p-1">
                  <item.icon className={`h-8 w-8 sm:h-10 sm:mb-2 ${item.color}`} strokeWidth={1.5} />
                  <p className="text-[10px] sm:text-xs font-medium text-foreground mt-1 sm:mt-0">{item.label}</p>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
