// src/components/feed/daily-feed-section.tsx
import { getFeedPosts } from '@/lib/services/feedService';
import { FeedItemCard } from './feed-item-card';

export async function DailyFeedSection() {
  const posts = await getFeedPosts(); // In a real app, this would be fetched

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {posts.map((post) => (
        <FeedItemCard key={post.id} post={post} />
      ))}
       {posts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No feed items yet. Check back later!</p>
        </div>
      )}
    </div>
  );
}
