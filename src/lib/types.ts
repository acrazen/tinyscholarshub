
import type { LucideIcon } from 'lucide-react';

export interface Guardian {
  id: string;
  name: string;
  relation: string; // e.g., 'Mother', 'Father'
  phoneNumber: string;
  email: string;
  profilePhotoUrl?: string;
}

export interface Milestone {
  id: string;
  date: string; // ISO date string
  title: string;
  description: string;
  achieved: boolean;
  category: 'Academic' | 'Social' | 'Motor Skills' | 'Creative';
}

export interface AttendanceRecord {
  date: string; // ISO date string
  status: 'Present' | 'Absent' | 'Late';
}

export interface ReportItem {
  id: string;
  title: string;
  termName: string; // e.g., "2024 Term 4", "2023 Term 2"
  year: number;
  type: 'folio' | 'pdf';
  url: string; // URL to the report file or view
  icon?: LucideIcon; // Optional: if we want to specify icons directly in data
  dataAiHint?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date string
  className: string;
  profilePhotoUrl: string;
  dataAiHint?: string; // Added for student profile photo
  allergies?: string[];
  notes?: string;
  guardians: Guardian[];
  attendanceSummary: {
    present: number;
    absent: number;
    totalDays: number;
  };
  recentAttendance: AttendanceRecord[];
  milestones: Milestone[];
  reports?: ReportItem[]; // Added reports
}

export interface CommentAuthor {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  text: string;
  timestamp: string; // ISO date string
  likes: number;
  isLikedByUser?: boolean; // For UI state
}

export interface FeedPost {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string; // ISO date string
  type: 'photo' | 'video' | 'text';
  mediaUrl?: string;
  dataAiHint?: string;
  description: string;
  likes: number;
  comments: Comment[];
  commentsCount: number;
}

export interface NavItem {
  href: string;
  label:string;
  icon: LucideIcon;
  active?: boolean;
  roles?: ('parent' | 'teacher' | 'admin')[];
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  time?: string;
  location: string;
  description: string;
  status: 'upcoming' | 'past' | 'cancelled';
  isBooked?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'article' | 'video' | 'link';
  url: string;
  icon: LucideIcon;
  category: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  profilePhotoUrl?: string;
  role: 'Parent' | 'Teacher' | 'Admin';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  text: string;
  timestamp: string;
  avatarUrl?: string;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  avatarUrl?: string;
  unreadCount?: number;
}
