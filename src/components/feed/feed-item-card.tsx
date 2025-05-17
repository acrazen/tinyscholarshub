
// src/components/feed/feed-item-card.tsx
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Video, Image as ImageIcon } from 'lucide-react';
import type { FeedPost } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FeedItemCardProps {
  post: FeedPost;
}

// Helper function to render description with bold hashtags
const renderDescriptionWithHashtags = (text: string): ReactNode[] => {
  const parts = text.split(/(#\w+)/g); // Split by hashtag, keeping the hashtag
  return parts.map((part, index) => {
    if (part.startsWith('#')) {
      return <strong key={index} className="font-semibold">{part}</strong>;
    }
    return part;
  });
};

export function FeedItemCard({ post }: FeedItemCardProps) {
  const [timeAgo, setTimeAgo] = useState('');
  const [currentLikes, setCurrentLikes] = useState(post.likes);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [currentCommentsCount, setCurrentCommentsCount] = useState(post.commentsCount);
  const { toast } = useToast();

  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(post.timestamp), { addSuffix: true }));
  }, [post.timestamp]);

  const handleLike = () => {
    if (isLikedByUser) {
      setCurrentLikes(prev => prev - 1);
    } else {
      setCurrentLikes(prev => prev + 1);
    }
    setIsLikedByUser(prev => !prev);
    // In a real app, you would also send an update to the backend here.
  };

  const handleCommentButtonClick = () => {
    setIsCommentDialogOpen(true);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() === '') {
      toast({ title: "Empty Comment", description: "Please enter a comment before submitting.", variant: "destructive" });
      return;
    }
    // Simulate adding comment
    setCurrentCommentsCount(prev => prev + 1);
    toast({
      title: "Comment Submitted!",
      description: `Your comment: "${commentText}" (This is a simulation and not saved).`,
    });
    setCommentText('');
    setIsCommentDialogOpen(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${post.description} - Check out this post!`)
      .then(() => {
        toast({
          title: "Shared! (Link Copied)",
          description: "Post content copied to clipboard.",
        });
      })
      .catch(() => {
         toast({
          title: "Share via Link",
          description: "Feature to share not fully implemented. Content available in console.",
        });
        console.log("Share content:", post.description);
      });
  };

  return (
    <>
      <Card className="overflow-hidden shadow-lg rounded-xl">
        <CardHeader className="flex flex-row items-center space-x-3 p-4">
          <Avatar>
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="teacher avatar" />
            <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-semibold">{post.author.name}</CardTitle>
            <CardDescription className="text-xs">{timeAgo || 'Calculating time...'}</CardDescription>
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
            <p className="text-sm text-foreground leading-relaxed">
              {renderDescriptionWithHashtags(post.description)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-muted-foreground hover:bg-primary/10", 
              isLikedByUser ? 'text-primary hover:text-primary' : 'hover:text-foreground'
            )} 
            onClick={handleLike}
          >
            <Heart className={cn("mr-2 h-4 w-4", isLikedByUser ? 'fill-primary text-primary' : '')} /> {currentLikes} Likes
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground hover:bg-primary/10" 
            onClick={handleCommentButtonClick}
          >
            <MessageCircle className="mr-2 h-4 w-4" /> {currentCommentsCount} Comments
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground hover:bg-primary/10" 
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmitComment}>
            <DialogHeader>
              <DialogTitle>Add a comment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-2">
                <Label htmlFor="comment-text" className="sr-only">
                  Your comment
                </Label>
                <Textarea
                  id="comment-text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment here..."
                  rows={4}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit Comment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

    