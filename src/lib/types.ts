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
