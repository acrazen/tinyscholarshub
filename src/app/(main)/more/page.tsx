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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface MoreItem {
  label: string;
  icon: LucideIcon;
  color: string;
  href: string; // Placeholder href
}

const moreItems: MoreItem[] = [
  { label: "Our Awards", icon: Award, color: "text-yellow-500", href: "#" },
  { label: "Announcements", icon: Megaphone, color: "text-orange-500", href: "#" },
  { label: "Calendar", icon: CalendarDays, color: "text-green-500", href: "#" },
  { label: "eConsent", icon: FileSignature, color: "text-purple-500", href: "#" },
  { label: "Event Booking", icon: CalendarPlus, color: "text-sky-500", href: "#" },
  { label: "Resources", icon: LibraryBig, color: "text-rose-500", href: "#" },
  { label: "Travel", icon: PlaneTakeoff, color: "text-blue-500", href: "#" },
  { label: "My Profile", icon: UserCircle2, color: "text-teal-500", href: "#" },
  { label: "Survey", icon: ListChecks, color: "text-indigo-500", href: "#" },
];

export default function MorePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center md:text-left">More Options</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {moreItems.map((item) => (
          <Link href={item.href} key={item.label}>
            <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center justify-center p-4 aspect-square bg-card hover:bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center text-center p-2">
                <item.icon className={`h-12 w-12 mb-3 ${item.color}`} strokeWidth={1.5} />
                <p className="text-sm font-medium text-foreground">{item.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
