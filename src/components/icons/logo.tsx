import type { SVGProps } from 'react';
import { Building } from 'lucide-react'; // Changed from Home to Building

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="Tiny Scholars Hub">
      <Building className="h-7 w-7 text-primary" /> {/* Changed Icon */}
      <span className="text-xl font-bold tracking-tight text-foreground">
        Tiny Scholars <span className="text-primary">Hub</span>
      </span>
    </div>
  );
}
