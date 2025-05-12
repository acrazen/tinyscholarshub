import { DailyFeedSection } from "@/components/feed/daily-feed-section";

export default function DailyFeedPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center md:text-left">Daily Feed</h1>
      <DailyFeedSection />
    </div>
  );
}
