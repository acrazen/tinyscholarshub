
import { DailyFeedSection } from "@/components/feed/daily-feed-section";
import { ShortcutNavigation } from "@/components/home/shortcut-navigation"; 

export default function DailyFeedPage() {
  return (
    <div>
      {/* Ensure ShortcutNavigation is prominent */}
      <div> {/* Added wrapper div with margin */}
        <ShortcutNavigation /> 
      </div>
      <DailyFeedSection />
    </div>
  );
}
