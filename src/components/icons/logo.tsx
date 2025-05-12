import type { SVGProps } from 'react';
import { Home } from 'lucide-react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="Tiny Scholars Hub">
      <Home className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tight text-foreground">
        Tiny Scholars <span className="text-primary">Hub</span>
      </span>
    </div>
  );
}
