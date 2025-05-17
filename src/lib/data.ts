
import type { Student, FeedPost, Guardian, Milestone, SchoolEvent, ResourceItem, UserProfile, Comment, CommentAuthor, ReportItem } from './types';
import { FileText, Youtube, Link as LinkIcon, BookOpen, FileArchive, FileType2 } from 'lucide-react'; // Added FileArchive, FileType2

const guardiansData: Guardian[] = [
  { id: 'g1', name: 'Alice Smith', relation: 'Mother', phoneNumber: '555-0101', email: 'alice.smith@example.com', profilePhotoUrl: 'https://placehold.co/100x100.png' },
  { id: 'g2', name: 'Bob Smith', relation: 'Father', phoneNumber: '555-0102', email: 'bob.smith@example.com', profilePhotoUrl: 'https://placehold.co/100x100.png' },
  { id: 'g3', name: 'Carol White', relation: 'Mother', phoneNumber: '555-0103', email: 'carol.white@example.com', profilePhotoUrl: 'https://placehold.co/100x100.png' },
  { id: 'g4', name: 'David White', relation: 'Father', phoneNumber: '555-0104', email: 'david.white@example.com', profilePhotoUrl: 'https://placehold.co/100x100.png' },
  { id: 'g5', name: 'Eva Green', relation: 'Guardian', phoneNumber: '555-0105', email: 'eva.green@example.com', profilePhotoUrl: 'https://placehold.co/100x100.png' },
];

const milestonesData: Milestone[] = [
  { id: 'm1', date: '2024-05-10', title: 'Identified 5 Colors', description: 'Leo successfully identified red, blue, green, yellow, and black.', achieved: true, category: 'Academic' },
  { id: 'm2', date: '2024-05-15', title: 'Shared Toys', description: 'Shared toys with peers during playtime without prompting.', achieved: true, category: 'Social' },
  { id: 'm3', date: '2024-06-01', title: 'Hops on One Foot', description: 'Can hop on one foot for 3 seconds.', achieved: false, category: 'Motor Skills' },
  { id: 'm4', date: '2024-04-20', title: 'Counts to 10', description: 'Mia can count from 1 to 10.', achieved: true, category: 'Academic' },
  { id: 'm5', date: '2024-05-25', title: 'Painted a Picture', description: 'Completed a finger painting activity expressing creativity.', achieved: true, category: 'Creative' },
];

const sampleReportsLeo: ReportItem[] = [
  { id: 'lr1', title: '2024 Report - Leo Miller', termName: '2024 Term 2', year: 2024, type: 'folio', url: '#', dataAiHint: 'report document' },
  { id: 'lr2', title: '2023 Report - Leo Miller', termName: '2023 Term 4', year: 2023, type: 'pdf', url: '#', dataAiHint: 'report pdf' },
  { id: 'lr3', title: '2023 Report - Leo Miller', termName: '2023 Term 2', year: 2023, type: 'pdf', url: '#', dataAiHint: 'report pdf' },
];

const sampleReportsMia: ReportItem[] = [
  { id: 'mr1', title: '2024 Report - Mia Garcia', termName: '2024 Term 2', year: 2024, type: 'folio', url: '#', dataAiHint: 'report document' },
  { id: 'mr2', title: '2023 Report - Mia Garcia', termName: '2023 Term 4', year: 2023, type: 'pdf', url: '#', dataAiHint: 'report pdf' },
];


export const studentsData: Student[] = [
  {
    id: 's1',
    firstName: 'Leo',
    lastName: 'Miller',
    dateOfBirth: '2020-03-15',
    className: 'Butterflies',
    profilePhotoUrl: 'https://placehold.co/200x200.png',
    dataAiHint: 'child portrait',
    allergies: ['Peanuts'],
    notes: 'Loves dinosaurs and building blocks.',
    guardians: [guardiansData[0], guardiansData[1]],
    attendanceSummary: { present: 18, absent: 2, totalDays: 20 },
    recentAttendance: [
      { date: '2024-05-27', status: 'Present' },
      { date: '2024-05-28', status: 'Present' },
      { date: '2024-05-29', status: 'Absent' },
      { date: '2024-05-30', status: 'Present' },
      { date: '2024-05-31', status: 'Present' },
    ],
    milestones: [milestonesData[0], milestonesData[1], milestonesData[2]],
    reports: sampleReportsLeo,
  },
  {
    id: 's2',
    firstName: 'Mia',
    lastName: 'Garcia',
    dateOfBirth: '2020-07-22',
    className: 'Caterpillars',
    profilePhotoUrl: 'https://placehold.co/200x200.png',
    dataAiHint: 'child portrait',
    notes: 'Enjoys story time and drawing.',
    guardians: [guardiansData[2], guardiansData[3]],
    attendanceSummary: { present: 20, absent: 0, totalDays: 20 },
     recentAttendance: [
      { date: '2024-05-27', status: 'Present' },
      { date: '2024-05-28', status: 'Present' },
      { date: '2024-05-29', status: 'Present' },
      { date: '2024-05-30', status: 'Present' },
      { date: '2024-05-31', status: 'Present' },
    ],
    milestones: [milestonesData[3], milestonesData[4]],
    reports: sampleReportsMia,
  },
  {
    id: 's3',
    firstName: 'Noah',
    lastName: 'Davis',
    dateOfBirth: '2021-01-10',
    className: 'Butterflies',
    profilePhotoUrl: 'https://placehold.co/200x200.png',
    dataAiHint: 'child portrait',
    allergies: ['Dairy', 'Gluten'],
    guardians: [guardiansData[4]],
    attendanceSummary: { present: 15, absent: 5, totalDays: 20 },
     recentAttendance: [
      { date: '2024-05-27', status: 'Absent' },
      { date: '2024-05-28', status: 'Present' },
      { date: '2024-05-29', status: 'Absent' },
      { date: '2024-05-30', status: 'Present' },
      { date: '2024-05-31', status: 'Absent' },
    ],
    milestones: [],
    reports: [],
  },
   {
    id: 's4',
    firstName: 'Olivia',
    lastName: 'Chen',
    dateOfBirth: '2020-09-05',
    className: 'Caterpillars',
    profilePhotoUrl: 'https://placehold.co/200x200.png',
    dataAiHint: 'child portrait',
    guardians: [guardiansData[0]], // Re-using for example
    attendanceSummary: { present: 19, absent: 1, totalDays: 20 },
    recentAttendance: [],
    milestones: [milestonesData[0]],
    reports: [],
  },
];

const sampleCommentAuthors: CommentAuthor[] = [
    { id: 'user1', name: 'Sarah D. (Leo\'s Mom)', avatarUrl: 'https://placehold.co/40x40.png' },
    { id: 'user2', name: 'Mike B. (Mia\'s Dad)', avatarUrl: 'https://placehold.co/40x40.png' },
    { id: 'teacher1', name: 'Ms. Emily (Butterflies)', avatarUrl: 'https://placehold.co/40x40.png' },
];

export const feedPostsData: FeedPost[] = [
  {
    id: 'fp1',
    author: { name: 'Butterflies Class', avatarUrl: 'https://placehold.co/50x50.png' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    type: 'photo',
    mediaUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'children painting',
    description: 'Our little artists had a blast with finger painting today! So much creativity on display. 🎨 #ArtDay #PreschoolFun Great job @LeoMiller and @MiaGarcia!',
    likes: 15,
    comments: [
        { id: 'c1-1', author: sampleCommentAuthors[0], text: 'Leo came home so excited about this! Thanks for sharing.', timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(), likes: 2, isLikedByUser: false },
        { id: 'c1-2', author: sampleCommentAuthors[2], text: 'They all did wonderfully! Such talented artists.', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), likes: 3, isLikedByUser: true },
    ],
    commentsCount: 2,
  },
  {
    id: 'fp2',
    author: { name: 'Tiny Scholars Admin', avatarUrl: 'https://placehold.co/50x50.png' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    type: 'text',
    description: "Reminder: Parent-teacher meetings are next week! Please sign up for a slot if you haven't already. We look forward to chatting with you!",
    likes: 22,
    comments: [
        { id: 'c2-1', author: sampleCommentAuthors[1], text: 'Already booked! Looking forward to it.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), likes: 1, isLikedByUser: false },
    ],
    commentsCount: 1,
  },
  {
    id: 'fp3',
    author: { name: 'Caterpillars Class', avatarUrl: 'https://placehold.co/50x50.png' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    type: 'video',
    mediaUrl: 'https://placehold.co/600x400.png', 
    dataAiHint: 'kids singing',
    description: 'Sing-along time! 🎶 Our Caterpillars are learning new songs and having so much fun with music and movement. #MusicTime #EarlyLearning Special thanks to @SarahDavis for the song suggestion!',
    likes: 30,
    comments: [
        { id: 'c3-1', author: sampleCommentAuthors[0], text: 'So cute! Wish I could hear them sing.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(), likes: 5, isLikedByUser: true },
        { id: 'c3-2', author: sampleCommentAuthors[1], text: 'Mia loves music time!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 38).toISOString(), likes: 2, isLikedByUser: false },
    ],
    commentsCount: 2,
  },
  {
    id: 'fp4',
    author: { name: 'Butterflies Class', avatarUrl: 'https://placehold.co/50x50.png' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    type: 'photo',
    mediaUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'playground fun',
    description: 'Enjoying the sunny weather on the playground today! Lots of running, climbing, and laughter. ☀️ #OutdoorPlay #ActiveKids',
    likes: 18,
    comments: [],
    commentsCount: 0,
  },
];

export const sampleSchoolEvents: SchoolEvent[] = [
  {
    id: 'ev1',
    title: 'Annual Sports Day',
    date: '2024-07-15',
    time: '09:00 AM - 01:00 PM',
    location: 'School Playground',
    description: 'Join us for a fun-filled day of games and friendly competition. All families welcome!',
    status: 'upcoming',
    isBooked: false,
  },
  {
    id: 'ev2',
    title: 'Parent-Teacher Meeting (Butterflies)',
    date: '2024-06-20',
    time: '03:00 PM - 06:00 PM',
    location: 'Butterflies Classroom',
    description: 'Individual meetings to discuss your child\'s progress. Please book your slot.',
    status: 'upcoming',
    isBooked: true,
  },
  {
    id: 'ev3',
    title: 'Summer Art Camp Showcase',
    date: '2024-08-05',
    time: '11:00 AM',
    location: 'School Hall',
    description: 'See the amazing artwork created by our little artists during the summer camp.',
    status: 'upcoming',
    isBooked: false,
  },
  {
    id: 'ev4',
    title: 'Spring Fair',
    date: '2024-04-12',
    time: '10:00 AM - 02:00 PM',
    location: 'School Grounds',
    description: 'A wonderful day with stalls, games, and food. Thank you to everyone who attended!',
    status: 'past',
  },
   {
    id: 'ev5',
    title: 'Science Fair Workshop',
    date: '2024-09-10',
    time: '02:00 PM',
    location: 'School Library',
    description: 'Cancelled due to unforeseen circumstances. We apologize for any inconvenience.',
    status: 'cancelled',
  }
];

export const sampleResources: ResourceItem[] = [
  {
    id: 'res1',
    title: 'Healthy Eating Guide for Toddlers',
    description: 'A comprehensive guide to nutrition for young children, including meal ideas.',
    type: 'pdf',
    url: '#', 
    icon: FileText,
    category: 'Health & Nutrition',
  },
  {
    id: 'res2',
    title: 'The Importance of Play in Early Childhood',
    description: 'An insightful article on how play contributes to learning and development.',
    type: 'article',
    url: '#', 
    icon: BookOpen,
    category: 'Child Development',
  },
  {
    id: 'res3',
    title: 'DIY Craft Ideas for Kids',
    description: 'A fun video tutorial with easy craft projects you can do at home.',
    type: 'video',
    url: '#', 
    icon: Youtube,
    category: 'Activities & Crafts',
  },
  {
    id: 'res4',
    title: 'School Calendar 2024-2025',
    description: 'Download the official school academic calendar for the upcoming year.',
    type: 'pdf',
    url: '#',
    icon: FileText,
    category: 'School Information',
  },
  {
    id: 'res5',
    title: 'Local Library Resources',
    description: 'Link to the local public library website for children\'s programs and books.',
    type: 'link',
    url: '#',
    icon: LinkIcon,
    category: 'Community Resources',
  },
];

export const sampleUserProfile: UserProfile = {
  id: 'user123',
  name: 'Sarah Davis',
  email: 'sarah.davis@example.com',
  phoneNumber: '555-123-4567',
  address: '123 Main Street, Anytown, USA 12345',
  profilePhotoUrl: 'https://placehold.co/200x200.png',
  role: 'Parent',
};


export const getStudentById = (id: string): Student | undefined => studentsData.find(s => s.id === id);
