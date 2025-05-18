// src/lib/services/feedService.ts
'use server';

import { feedPostsData } from '@/lib/data';
import type { FeedPost, Comment } from '@/lib/types';
// import { API_ENDPOINTS } from '@/lib/api/endpoints';

/**
 * Fetches all feed posts.
 * Currently returns mock data.
 */
export const getFeedPosts = async (): Promise<FeedPost[]> => {
  // TODO: Replace with actual API call
  // const response = await fetch(API_ENDPOINTS.feedPosts);
  // ...
  return Promise.resolve(feedPostsData);
};

// Examples for future API integration:
/*
export const addCommentToPost = async (postId: string, commentText: string, authorId: string): Promise<Comment> => {
  // const response = await fetch(API_ENDPOINTS.postComments(postId), {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ text: commentText, authorId }),
  // });
  // ...
  // This is a placeholder - a real API would return the created comment.
  const tempAuthor = { id: authorId, name: 'User', avatarUrl: 'https://placehold.co/40x40.png' };
  const newComment: Comment = {
    id: `temp-${Date.now()}`,
    author: tempAuthor,
    text: commentText,
    timestamp: new Date().toISOString(),
    likes: 0,
  };
  return Promise.resolve(newComment);
};

export const likePost = async (postId: string, userId: string): Promise<{ likes: number }> => {
  // const response = await fetch(`${API_ENDPOINTS.feedPosts}/${postId}/like`, { method: 'POST' });
  // ...
  // Placeholder: find post in mock data, increment like, return new count
  const post = feedPostsData.find(p => p.id === postId);
  if (post) {
    post.likes += 1; // This mutation is for demo only, data.ts is not persistent
    return Promise.resolve({ likes: post.likes });
  }
  return Promise.resolve({ likes: 0 });
};
*/
