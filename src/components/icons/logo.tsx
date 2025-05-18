
"use client"; // Required because we're using a hook (useAppCustomization)

import type { SVGProps } from 'react';
import Image from 'next/image';
import { Building } from 'lucide-react';
import { useAppCustomization } from '@/context/app-customization-context';

export function Logo(props: SVGProps<SVGSVGElement>) {
  const { appName, appIconUrl } = useAppCustomization();

  // Extract the main name and the highlighted part (if any)
  const nameParts = appName.split(' ');
  const mainName = nameParts.slice(0, -1).join(' ');
  const highlightedName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

  return (
    <div className="flex items-center gap-2" aria-label={appName}>
      {appIconUrl ? (
        <Image 
          src={appIconUrl} 
          alt={`${appName} logo`} 
          width={28} // Corresponds to h-7 w-7
          height={28} 
          className="h-7 w-7 object-contain" // Added object-contain
          unoptimized={true} // To allow arbitrary URLs without next.config.js changes for this demo
          onError={(e) => { 
            // Fallback if user-provided URL is invalid, show default icon
            const target = e.target as HTMLImageElement;
            target.style.display = 'none'; // Hide broken image
            // Optionally, could replace with a default icon or hide the image container
            // For now, relying on the Building icon below as fallback if this one is hidden
            // This will be tricky as we need to re-render or have a state.
            // A simpler approach is to just let it show broken image or rely on next/image default behavior.
            // For now, just log error and let the default <Building/> icon render if needed below in a more complex setup.
            console.error("Failed to load custom app icon:", appIconUrl);
          }}
          data-ai-hint="custom app logo"
        />
      ) : (
        <Building className="h-7 w-7 text-primary" {...props} />
      )}
      <span className="text-xl font-bold tracking-tight text-foreground">
        {mainName} {highlightedName && <span className="text-primary">{highlightedName}</span>}
        {nameParts.length === 1 && appName} {/* If appName is a single word */}
      </span>
    </div>
  );
}
