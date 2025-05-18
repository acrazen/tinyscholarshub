// src/lib/api/endpoints.ts

// In a real setup, this would come from an environment variable
// For example: process.env.NEXT_PUBLIC_API_BASE_URL
const API_BASE_URL = '/api/mock'; // Using a mock prefix for now

export const API_ENDPOINTS = {
  // Student related
  students: `${API_BASE_URL}/students`,
  studentById: (id: string) => `${API_BASE_URL}/students/${id}`,

  // Feed related
  feedPosts: `${API_BASE_URL}/feed/posts`,
  // In a real app, you'd have endpoints for likes, comments etc.
  // postComments: (postId: string) => `${API_BASE_URL}/feed/posts/${postId}/comments`,

  // Event related
  schoolEvents: `${API_BASE_URL}/events`,

  // Resource related
  resources: `${API_BASE_URL}/resources`,

  // User Profile related
  userProfile: `${API_BASE_URL}/users/me/profile`, // For the current logged-in user's profile

  // Other potential endpoints
  // announcements: `${API_BASE_URL}/announcements`,
  // messages: `${API_BASE_URL}/messages`,
};
