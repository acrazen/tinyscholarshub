
import { DailyFeedSection } from "@/components/feed/daily-feed-section";
import { ShortcutNavigation } from "@/components/home/shortcut-navigation"; // Added import

export default function DailyFeedPage() {
  return (
    <div>
      {/* Added ShortcutNavigation component */}
      <ShortcutNavigation /> 
      
      <h1 className="text-3xl font-bold tracking-tight mt-8 mb-6 text-center md:text-left">Daily Feed</h1>
      <DailyFeedSection />
    </div>
  );
}

