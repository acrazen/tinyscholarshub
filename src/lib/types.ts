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

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date string
  className: string;
  profilePhotoUrl: string;
  allergies?: string[];
  notes?: string;
  guardians: Guardian[];
  attendanceSummary: { // Simplified for now
    present: number;
    absent: number;
    totalDays: number;
  };
  recentAttendance: AttendanceRecord[];
  milestones: Milestone[];
}

export interface FeedPost {
  id: string;
  author: {
    name: string; // e.g., 'Sunshine Class Teacher' or 'Tiny Scholars Admin'
    avatarUrl: string;
  };
  timestamp: string; // ISO date string
  type: 'photo' | 'video' | 'text';
  mediaUrl?: string; // URL for photo/video, required if type is photo/video
  dataAiHint?: string; // For placeholder images
  description: string;
  likes: number;
  commentsCount: number;
}

// For navigation
export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  time?: string;
  location: string;
  description: string;
  status: 'upcoming' | 'past' | 'cancelled';
  isBooked?: boolean; // For UI state to show if the user has booked this event
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'article' | 'video' | 'link';
  url: string; // Link to the resource or a placeholder for download
  icon: React.ElementType; // Specific lucide icon component
  category: string; // E.g., "Parenting Tips", "Curriculum", "School Policies"
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string; // Optional
  profilePhotoUrl?: string;
  role: 'Parent' | 'Teacher' | 'Admin'; // Example roles
}
