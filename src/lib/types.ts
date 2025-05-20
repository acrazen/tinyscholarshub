
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
  iconName?: 'FileArchive' | 'FileText' | 'FileType2'; // Store icon name as string
  dataAiHint?: string;
}

export interface ChildAward {
  id: string;
  title: string;
  description: string;
  dateAwarded: string; // ISO date string
  category: 'Academic' | 'Sports' | 'Arts' | 'Citizenship' | 'Effort';
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
  reports?: ReportItem[];
  childAwards?: ChildAward[];
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
  dataAiHint?: string;
  role: 'Parent' | 'Teacher' | 'Admin';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'other'; // 'user' is the current logged-in user
  text: string;
  timestamp: string; // ISO date string
  avatarUrl?: string; // Typically for 'other' sender
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole?: string;
  lastMessage: string;
  lastMessageTimestamp: string; // ISO date string
  avatarUrl?: string;
  unreadCount?: number;
}

// Added for school awards section
export interface SchoolAward {
  id: string;
  title: string;
  awardingBody: string;
  year: string;
  description: string;
  iconName?: 'Trophy' | 'Star' | string; // Changed from JSX.Element to string
  imageUrl?: string;
  dataAiHint?: string;
}

