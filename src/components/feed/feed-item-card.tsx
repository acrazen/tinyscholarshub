import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Video, Image as ImageIcon } from 'lucide-react';
import type { FeedPost } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface FeedItemCardProps {
  post: FeedPost;
}

export function FeedItemCard({ post }: FeedItemCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <Card className="overflow-hidden shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="teacher avatar" />
          <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base font-semibold">{post.author.name}</CardTitle>
          <CardDescription className="text-xs">{timeAgo}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {post.type === 'photo' && post.mediaUrl && (
          <div className="aspect-video w-full relative bg-muted">
            <Image
              src={post.mediaUrl}
              alt={post.description.substring(0, 50)}
              layout="fill"
              objectFit="cover"
              data-ai-hint={post.dataAiHint || "classroom activity"}
            />
          </div>
        )}
        {post.type === 'video' && post.mediaUrl && (
          <div className="aspect-video w-full relative bg-muted flex items-center justify-center">
            <Image
              src={post.mediaUrl} // Using image placeholder for video too
              alt={post.description.substring(0, 50)}
              layout="fill"
              objectFit="cover"
              data-ai-hint={post.dataAiHint || "classroom video"}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Video className="h-16 w-16 text-white/80" />
            </div>
          </div>
        )}
         {(post.type === 'photo' || post.type === 'video') && !post.mediaUrl && (
          <div className="aspect-video w-full bg-muted flex items-center justify-center">
            {post.type === 'photo' ? <ImageIcon className="h-16 w-16 text-muted-foreground" /> : <Video className="h-16 w-16 text-muted-foreground" />}
          </div>
        )}
        <div className="p-4">
          <p className="text-sm text-foreground leading-relaxed">{post.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <Heart className="mr-2 h-4 w-4" /> {post.likes} Likes
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <MessageCircle className="mr-2 h-4 w-4" /> {post.commentsCount} Comments
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
