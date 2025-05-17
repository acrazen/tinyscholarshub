
import { DailyFeedSection } from "@/components/feed/daily-feed-section";
import { ShortcutNavigation } from "@/components/home/shortcut-navigation"; 

export default function DailyFeedPage() {
  return (
    <div>
      {/* Ensure ShortcutNavigation is prominent */}
      <div className="my-6"> {/* Added wrapper div with margin */}
        <ShortcutNavigation /> 
      </div>
      
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-center md:text-left">Daily Feed</h1>
      <DailyFeedSection />
    </div>
  );
}
