import { feedPostsData } from '@/lib/data';
import { FeedItemCard } from './feed-item-card';

export function DailyFeedSection() {
  const posts = feedPostsData; // In a real app, this would be fetched

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
