
// src/components/feed/feed-item-card.tsx
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Video, Image as ImageIcon, Send } from 'lucide-react';
import type { FeedPost, Comment, CommentAuthor, Student } from '@/lib/types'; // Added Student
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect, type ReactNode, useRef } from 'react'; // Added useRef
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { studentsData } from '@/lib/data'; // Import studentsData

interface FeedItemCardProps {
  post: FeedPost;
}

// Helper function to render text with bold hashtags and @mentions
const renderFormattedText = (text: string): ReactNode[] => {
  const parts = text.split(/(#\w+|@\w+)/g); // Split by hashtag or @mention, keeping the delimiter
  return parts.map((part, index) => {
    if (part.startsWith('#') || part.startsWith('@')) {
      return <strong key={index} className="font-semibold text-primary">{part}</strong>;
    }
    return part;
  });
};


export function FeedItemCard({ post }: FeedItemCardProps) {
  const [timeAgo, setTimeAgo] = useState('');
  const [currentLikes, setCurrentLikes] = useState(post.likes);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  
  const { toast } = useToast();

  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [displayedComments, setDisplayedComments] = useState<Comment[]>(post.comments || []);
  const [currentCommentsCount, setCurrentCommentsCount] = useState(post.commentsCount);

  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionSuggestions, setMentionSuggestions] = useState<Student[]>([]);
  const [showMentionPopover, setShowMentionPopover] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(post.timestamp), { addSuffix: true }));
    setDisplayedComments(post.comments || []);
    setCurrentCommentsCount(post.comments?.length || 0);
  }, [post.timestamp, post.comments, post.commentsCount]);

  const handleLikePost = () => {
    if (isLikedByUser) {
      setCurrentLikes(prev => prev - 1);
    } else {
      setCurrentLikes(prev => prev + 1);
    }
    setIsLikedByUser(prev => !prev);
  };

  const handleLikeComment = (commentId: string) => {
    setDisplayedComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLikedByUser ? comment.likes - 1 : comment.likes + 1,
            isLikedByUser: !comment.isLikedByUser,
          };
        }
        return comment;
      })
    );
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
    
    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random()}`,
      author: { id: 'currentUser', name: 'You (Sarah D.)', avatarUrl: 'https://picsum.photos/seed/currentusercomment/40/40' }, // Updated placeholder
      text: commentText,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLikedByUser: false,
    };

    setDisplayedComments(prevComments => [newComment, ...prevComments]);
    setCurrentCommentsCount(prev => prev + 1);
    
    toast({
      title: "Comment Submitted!",
      description: `Your comment has been added (simulation).`,
    });
    setCommentText('');
    setShowMentionPopover(false); 
  };

  const handleShare = async () => {
    const shareData = {
      title: `Post from ${post.author.name}`,
      text: post.description,
      url: window.location.href, 
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: 'Shared successfully!',
          description: 'The post has been shared.',
        });
      } catch (error) {
        if ((error as DOMException).name !== 'AbortError') {
            toast({
            variant: 'destructive',
            title: 'Share failed',
            description: 'Could not share the post at this time.',
            });
        }
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`${post.description} - Check out this post from ${post.author.name} at ${shareData.url}`)
        .then(() => {
          toast({
            title: 'Link Copied!',
            description: 'Post content and link copied to clipboard.',
          });
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            title: 'Copy Failed',
            description: 'Could not copy content to clipboard.',
          });
        });
    }
  };


  const handleCommentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCommentText(text);
  
    const mentionRegex = /@(\w*)$/; 
    const currentTextUpToCursor = text.substring(0, e.target.selectionStart);
    const mentionMatch = currentTextUpToCursor.match(mentionRegex);
  
    if (mentionMatch && mentionMatch[1] !== undefined) {
      const query = mentionMatch[1].toLowerCase();
      setMentionQuery(query);
  
      let classFilterName: string | undefined = undefined;
      const authorNameLower = post.author.name.toLowerCase();
      if (authorNameLower.includes('butterflies')) {
          classFilterName = 'Butterflies';
      } else if (authorNameLower.includes('caterpillars')) {
          classFilterName = 'Caterpillars';
      } 
  
      const suggestions = studentsData.filter(student => {
        const inClass = classFilterName ? student.className === classFilterName : true; 
        
        const nameMatchesQuery = query === '' || 
                                 student.firstName.toLowerCase().startsWith(query) ||
                                 student.lastName.toLowerCase().startsWith(query) ||
                                 `${student.firstName}${student.lastName}`.toLowerCase().startsWith(query);
        return inClass && nameMatchesQuery;
      });
  
      setMentionSuggestions(suggestions.slice(0, 5));
      setShowMentionPopover(suggestions.length > 0);
    } else {
      setShowMentionPopover(false);
      setMentionSuggestions([]);
      setMentionQuery('');
    }
  };
  
  const handleSelectMention = (student: Student) => {
    const mentionHandle = `@${student.firstName}${student.lastName}`;
    
    const currentText = commentText;
    const cursorPos = commentInputRef.current?.selectionStart || currentText.length;
    const textBeforeCursor = currentText.substring(0, cursorPos);
    
    const atSymbolIndex = textBeforeCursor.lastIndexOf('@');
    
    if (atSymbolIndex !== -1) {
        const potentialQuery = textBeforeCursor.substring(atSymbolIndex + 1);
        if (potentialQuery.match(/^\w*$/)) { 
            const newText = currentText.substring(0, atSymbolIndex) + mentionHandle + ' ' + currentText.substring(cursorPos);
            setCommentText(newText);

            const newCursorPos = atSymbolIndex + mentionHandle.length + 1;
            setTimeout(() => {
                commentInputRef.current?.focus();
                commentInputRef.current?.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        } else { 
             setCommentText(currentText + mentionHandle + ' ');
        }
    } else { 
        setCommentText(currentText + mentionHandle + ' ');
    }
  
    setShowMentionPopover(false);
    setMentionSuggestions([]);
    setMentionQuery('');
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
                src={post.mediaUrl} 
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
              {renderFormattedText(post.description)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-muted-foreground hover:bg-primary/10 hover:text-primary-foreground", 
              isLikedByUser ? 'text-primary bg-primary/10 hover:text-primary-foreground' : ''
            )} 
            onClick={handleLikePost}
          >
            <Heart className={cn("mr-2 h-4 w-4", isLikedByUser ? 'fill-primary text-primary' : '')} /> {currentLikes} Likes
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-primary-foreground hover:bg-primary/10" 
            onClick={handleCommentButtonClick}
          >
            <MessageCircle className="mr-2 h-4 w-4" /> {currentCommentsCount} Comments
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-primary-foreground hover:bg-primary/10" 
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Comments on "{post.description.substring(0,30)}..."</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              {displayedComments.length > 0 ? displayedComments.map(comment => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint="user avatar"/>
                    <AvatarFallback>{comment.author.name.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold">{comment.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    <p className="text-sm mt-1">{renderFormattedText(comment.text)}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        className={cn(
                          "text-xs p-1 h-auto text-muted-foreground hover:bg-primary/10 hover:text-primary-foreground",
                          comment.isLikedByUser && "text-primary bg-primary/10 hover:text-primary-foreground"
                        )}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <Heart className={cn("mr-1 h-3 w-3", comment.isLikedByUser && "fill-primary text-primary")} />
                        {comment.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmitComment} className="p-4 border-t bg-background sticky bottom-0">
            {showMentionPopover && mentionSuggestions.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-1 p-2 bg-card border border-border rounded-md shadow-lg max-h-36 overflow-y-auto z-20 mx-4">
                <ul className="space-y-1">
                  {mentionSuggestions.map(student => (
                    <li key={student.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectMention(student)}
                        className="w-full text-left p-2 hover:bg-muted rounded-md text-sm text-foreground"
                      >
                        {student.firstName} {student.lastName} 
                        <span className="text-xs text-muted-foreground ml-1">({student.className})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Textarea
                id="comment-text"
                ref={commentInputRef}
                value={commentText}
                onChange={handleCommentInputChange}
                placeholder="Write your comment here... Use @ to mention."
                rows={1}
                className="flex-1 resize-none min-h-[40px]"
              />
              <Button type="submit" size="icon" disabled={commentText.trim() === ''}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send comment</span>
              </Button>
            </div>
             <DialogFooter className="sm:justify-start mt-2"> 
                <DialogClose asChild>
                    <Button type="button" variant="outline" size="sm">Close</Button>
                </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

    