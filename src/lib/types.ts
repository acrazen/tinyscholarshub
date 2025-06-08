
import type { LucideIcon } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// Updated and expanded UserRole type
export type UserRole =
  | 'SuperAdmin'          // App provider, highest level
  | 'AppManager_Management'// App management team - Tenant/Module/App Creation
  | 'AppManager_Sales'    // App management team - Sales focus
  | 'AppManager_Finance'  // App management team - Finance focus (Client Payments)
  | 'AppManager_Support'  // App management team - Support focus
  | 'SchoolAdmin'         // Admin for a specific school
  | 'SchoolDataEditor'    // School staff for editing general school info/content
  | 'SchoolFinanceManager'// School staff for school-specific finance (Student Fees)
  | 'ClassTeacher'        // Teacher assigned to specific class(es), potentially more powers
  | 'Teacher'             // General teacher
  | 'Parent'              // Parent of a student
  | 'Student_User'        // If students themselves were to log in (less common for preschool)
  | 'Subscriber';         // User with limited access, e.g., newsletter

export interface AuthenticatedUser extends Partial<SupabaseUser> {
  id: string; // Overriding SupabaseUser's id to be non-optional
  email?: string | null; // Align with SupabaseUser
  role: UserRole; // Our custom role
  // You might add schoolId here if the user is tied to a specific school (for multi-tenancy)
  schoolId?: string;
  // Other user-specific details from Supabase auth or your users table
}

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
  iconName?: 'FileArchive' | 'FileText' | 'FileType2' | string;
  dataAiHint?: string;
}

export interface ChildAward {
  id: string;
  title: string;
  description: string;
  dateAwarded: string; // ISO date string
  category: 'Academic' | 'Sports' | 'Arts' | 'Citizenship' | 'Effort';
}

export interface StudentDocument {
  id: string;
  studentId: string;
  documentName: string;
  fileUrl: string; // Conceptual URL or path to the document
  fileName?: string; // Display name for the file
  category: 'Consent Form' | 'Medical Record' | 'Previous Report' | 'Identification' | 'Other';
  uploadDate: string; // ISO date string
  uploadedByUserId?: string; // ID of the user who uploaded it (conceptual)
  dataAiHint?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date string
  className: string;
  profilePhotoUrl: string;
  dataAiHint?: string;
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
  studentDocuments?: StudentDocument[];
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
  isLikedByUser?: boolean;
}

export interface FeedPost {
  id:string;
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
  roles?: UserRole[];
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

// UserProfile is for the current logged-in user's own profile management page
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  profilePhotoUrl?: string;
  dataAiHint?: string;
  role: UserRole; // User's own role for their profile display
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  text: string;
  timestamp: string; // ISO date string
  avatarUrl?: string;
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

export interface SchoolAward {
  id: string;
  title: string;
  awardingBody: string;
  year: string;
  description: string;
  iconName?: 'Trophy' | 'Star' | string;
  imageUrl?: string;
  dataAiHint?: string;
}

export interface SampleSchool {
  id: string;
  name: string;
  subdomain: string;
  status: 'Active' | 'Pending' | 'Suspended';
  adminEmail: string;
  package: 'Basic' | 'Standard' | 'Premium' | 'Premium Plus';
  studentLimit: number;
  teacherLimit: number;
  adminLimit: number;
}

// Assignment Management
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string (YYYY-MM-DD)
  className: string; // e.g., "Butterflies", "Caterpillars"
  teacherId: string; // ID of the teacher who created it (conceptual)
  fileUrl?: string; // Optional URL for an attached file
  fileName?: string; // Optional name for the attached file
  createdAt: string; // ISO date string
}

export interface StudentAssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionDate: string; // ISO date string
  textSubmission?: string;
  fileUrl?: string;
  grade?: string; // e.g., "A+", "Satisfactory", "85/100"
  teacherFeedback?: string;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Late';
}
