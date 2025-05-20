
import type { Student, FeedPost, Guardian, Milestone, SchoolEvent, ResourceItem, UserProfile, Comment, CommentAuthor, ReportItem, ChildAward, SchoolAward } from './types';
import { FileText, Youtube, Link as LinkIcon, BookOpen, FileArchive, Trophy, Star } from 'lucide-react';

const guardiansData: Guardian[] = [
  { id: 'g1', name: 'Alice Smith', relation: 'Mother', phoneNumber: '555-0101', email: 'alice.smith@example.com', profilePhotoUrl: 'https://picsum.photos/seed/guardian1/100/100' },
  { id: 'g2', name: 'Bob Smith', relation: 'Father', phoneNumber: '555-0102', email: 'bob.smith@example.com', profilePhotoUrl: 'https://picsum.photos/seed/guardian2/100/100' },
  { id: 'g3', name: 'Carol White', relation: 'Mother', phoneNumber: '555-0103', email: 'carol.white@example.com', profilePhotoUrl: 'https://picsum.photos/seed/guardian3/100/100' },
  { id: 'g4', name: 'David White', relation: 'Father', phoneNumber: '555-0104', email: 'david.white@example.com', profilePhotoUrl: 'https://picsum.photos/seed/guardian4/100/100' },
  { id: 'g5', name: 'Eva Green', relation: 'Guardian', phoneNumber: '555-0105', email: 'eva.green@example.com', profilePhotoUrl: 'https://picsum.photos/seed/guardian5/100/100' },
];

const milestonesData: Milestone[] = [
  { id: 'm1', date: '2024-05-10', title: 'Identified 5 Colors', description: 'Leo successfully identified red, blue, green, yellow, and black.', achieved: true, category: 'Academic' },
  { id: 'm2', date: '2024-05-15', title: 'Shared Toys', description: 'Shared toys with peers during playtime without prompting.', achieved: true, category: 'Social' },
  { id: 'm3', date: '2024-06-01', title: 'Hops on One Foot', description: 'Can hop on one foot for 3 seconds.', achieved: false, category: 'Motor Skills' },
  { id: 'm4', date: '2024-04-20', title: 'Counts to 10', description: 'Mia can count from 1 to 10.', achieved: true, category: 'Academic' },
  { id: 'm5', date: '2024-05-25', title: 'Painted a Picture', description: 'Completed a finger painting activity expressing creativity.', achieved: true, category: 'Creative' },
];

const sampleReportsLeo: ReportItem[] = [
  { id: 'lr1', title: 'Term 2 Folio - 2024', termName: '2024 Term 2', year: 2024, type: 'folio', url: '#', iconName: 'FileArchive', dataAiHint: 'report document' },
  { id: 'lr2', title: 'Term 4 Report Card - 2023', termName: '2023 Term 4', year: 2023, type: 'pdf', url: '#', iconName: 'FileText', dataAiHint: 'report pdf' },
  { id: 'lr3', title: 'Term 2 Report Card - 2023', termName: '2023 Term 2', year: 2023, type: 'pdf', url: '#', iconName: 'FileText', dataAiHint: 'report pdf' },
];

const sampleReportsMia: ReportItem[] = [
  { id: 'mr1', title: 'Term 2 Folio - 2024', termName: '2024 Term 2', year: 2024, type: 'folio', url: '#', iconName: 'FileArchive', dataAiHint: 'report document' },
  { id: 'mr2', title: 'Term 4 Report Card - 2023', termName: '2023 Term 4', year: 2023, type: 'pdf', url: '#', iconName: 'FileText', dataAiHint: 'report pdf' },
];

const sampleChildAwardsLeo: ChildAward[] = [
    { id: 'ca1', title: 'Star Painter of the Week', description: 'For exceptional creativity in art class.', dateAwarded: '2024-05-20', category: 'Arts' },
    { id: 'ca2', title: 'Super Speller Certificate', description: 'Correctly spelled all words in the weekly challenge.', dateAwarded: '2024-04-15', category: 'Academic' },
    { id: 'ca3', title: 'Kindness Award', description: 'For helping a classmate during playground time.', dateAwarded: '2024-03-10', category: 'Citizenship' },
];

const sampleChildAwardsMia: ChildAward[] = [
    { id: 'ca4', title: 'Math Whiz', description: 'Excellent performance in number recognition and counting.', dateAwarded: '2024-05-01', category: 'Academic' },
];


export const studentsData: Student[] = [
  {
    id: 's1',
    firstName: 'Leo',
    lastName: 'Miller',
    dateOfBirth: '2020-03-15',
    className: 'Butterflies',
    profilePhotoUrl: 'https://picsum.photos/seed/leo/200/200',
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
    childAwards: sampleChildAwardsLeo,
  },
  {
    id: 's2',
    firstName: 'Mia',
    lastName: 'Garcia',
    dateOfBirth: '2020-07-22',
    className: 'Caterpillars',
    profilePhotoUrl: 'https://picsum.photos/seed/mia/200/200',
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
    childAwards: sampleChildAwardsMia,
  },
  {
    id: 's3',
    firstName: 'Noah',
    lastName: 'Davis',
    dateOfBirth: '2021-01-10',
    className: 'Butterflies',
    profilePhotoUrl: 'https://picsum.photos/seed/noah/200/200',
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
    childAwards: [],
  },
   {
    id: 's4',
    firstName: 'Olivia',
    lastName: 'Chen',
    dateOfBirth: '2020-09-05',
    className: 'Caterpillars',
    profilePhotoUrl: 'https://picsum.photos/seed/olivia/200/200',
    dataAiHint: 'child portrait',
    guardians: [guardiansData[0]], // Re-using for example
    attendanceSummary: { present: 19, absent: 1, totalDays: 20 },
    recentAttendance: [],
    milestones: [milestonesData[0]],
    reports: [],
    childAwards: [],
  },
];

// Function to get a student by ID from the mock data
export const getStudentById = (id: string): Student | undefined => {
  return studentsData.find(student => student.id === id);
};

const sampleCommentAuthors: CommentAuthor[] = [
    { id: 'user1', name: 'Sarah D. (Leo\'s Mom)', avatarUrl: 'https://picsum.photos/seed/sarah/40/40' },
    { id: 'user2', name: 'Mike B. (Mia\'s Dad)', avatarUrl: 'https://picsum.photos/seed/mike/40/40' },
    { id: 'teacher1', name: 'Ms. Emily (Butterflies)', avatarUrl: 'https://picsum.photos/seed/emily/40/40' },
];

export const feedPostsData: FeedPost[] = [
  {
    id: 'fp1',
    author: { name: 'Butterflies Class', avatarUrl: 'https://picsum.photos/seed/butterfliesclass/50/50' },
    timestamp: '2024-07-21T10:00:00.000Z',
    type: 'photo',
    mediaUrl: 'https://picsum.photos/seed/artday/600/400',
    dataAiHint: 'children painting',
    description: 'Our little artists had a blast with finger painting today! So much creativity on display. 🎨 #ArtDay #PreschoolFun Great job @LeoMiller and @MiaGarcia!',
    likes: 15,
    comments: [
        { id: 'c1-1', author: sampleCommentAuthors[0], text: 'Leo came home so excited about this! Thanks for sharing.', timestamp: '2024-07-21T11:10:00.000Z', likes: 2, isLikedByUser: false },
        { id: 'c1-2', author: sampleCommentAuthors[2], text: 'They all did wonderfully! Such talented artists.', timestamp: '2024-07-21T11:15:00.000Z', likes: 3, isLikedByUser: true },
    ],
    commentsCount: 2,
  },
  {
    id: 'fp2',
    author: { name: 'Tiny Scholars Admin', avatarUrl: 'https://picsum.photos/seed/admin/50/50' },
    timestamp: '2024-07-20T12:00:00.000Z',
    type: 'text',
    description: "Reminder: Parent-teacher meetings are next week! Please sign up for a slot if you haven't already. We look forward to chatting with you!",
    likes: 22,
    comments: [
        { id: 'c2-1', author: sampleCommentAuthors[1], text: 'Already booked! Looking forward to it.', timestamp: '2024-07-20T16:00:00.000Z', likes: 1, isLikedByUser: false },
    ],
    commentsCount: 1,
  },
  {
    id: 'fp3',
    author: { name: 'Caterpillars Class', avatarUrl: 'https://picsum.photos/seed/caterpillarsclass/50/50' },
    timestamp: '2024-07-19T12:00:00.000Z',
    type: 'video',
    mediaUrl: 'https://picsum.photos/seed/singalong/600/400',
    dataAiHint: 'kids singing',
    description: 'Sing-along time! 🎶 Our Caterpillars are learning new songs and having so much fun with music and movement. #MusicTime #EarlyLearning Special thanks to @SarahDavis for the song suggestion!',
    likes: 30,
    comments: [
        { id: 'c3-1', author: sampleCommentAuthors[0], text: 'So cute! Wish I could hear them sing.', timestamp: '2024-07-19T20:00:00.000Z', likes: 5, isLikedByUser: true },
        { id: 'c3-2', author: sampleCommentAuthors[1], text: 'Mia loves music time!', timestamp: '2024-07-19T20:20:00.000Z', likes: 2, isLikedByUser: false },
    ],
    commentsCount: 2,
  },
  {
    id: 'fp4',
    author: { name: 'Butterflies Class', avatarUrl: 'https://picsum.photos/seed/butterfliesclass2/50/50' },
    timestamp: '2024-07-18T12:00:00.000Z',
    type: 'photo',
    mediaUrl: 'https://picsum.photos/seed/playground/600/400',
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
  id: 'userParent123', // Default parent user
  name: 'Sarah Davis',
  email: 'sarah.davis@example.com',
  phoneNumber: '555-123-4567',
  address: '123 Main Street, Anytown, USA 12345',
  profilePhotoUrl: 'https://picsum.photos/seed/currentUser/100/100',
  dataAiHint: 'user avatar',
  role: 'Parent',
};

// Additional sample user profiles for role simulation
export const sampleAdminProfile: UserProfile = {
  id: 'userAdmin456',
  name: 'Mr. Admin Principal',
  email: 'admin@tinyscholarshub.com',
  phoneNumber: '555-987-6543',
  profilePhotoUrl: 'https://picsum.photos/seed/adminUser/100/100',
  dataAiHint: 'admin avatar',
  role: 'Admin',
};

export const sampleTeacherProfile: UserProfile = {
  id: 'userTeacher789',
  name: 'Ms. Emily Teacher',
  email: 'emily.teacher@tinyscholarshub.com',
  phoneNumber: '555-555-5555',
  profilePhotoUrl: 'https://picsum.photos/seed/teacherUser/100/100',
  dataAiHint: 'teacher avatar',
  role: 'Teacher',
};

export const sampleSuperAdminProfile: UserProfile = {
  id: 'userSuperAdmin001',
  name: 'Super User',
  email: 'super@tinyscholars.app',
  phoneNumber: '555-000-0001',
  profilePhotoUrl: 'https://picsum.photos/seed/superadminUser/100/100',
  dataAiHint: 'superadmin avatar',
  role: 'SuperAdmin',
};


export const sampleConversations: Conversation[] = [
  {
    id: 'convo1',
    participantName: 'Ms. Emily (Butterflies)',
    participantRole: 'Teacher',
    lastMessage: "Don't forget the field trip form for Leo!",
    lastMessageTimestamp: '2024-07-21T11:30:00.000Z',
    avatarUrl: 'https://picsum.photos/seed/teacher1/100/100',
    unreadCount: 2,
  },
  {
    id: 'convo2',
    participantName: 'Mr. John (Caterpillars)',
    participantRole: 'Teacher',
    lastMessage: "Mia had a great day today, she really enjoyed the story time.",
    lastMessageTimestamp: '2024-07-21T10:00:00.000Z',
    avatarUrl: 'https://picsum.photos/seed/teacher2/100/100',
  },
  {
    id: 'convo3',
    participantName: 'School Admin',
    participantRole: 'Administration',
    lastMessage: "Reminder: School fees are due next Friday.",
    lastMessageTimestamp: '2024-07-20T12:00:00.000Z',
    avatarUrl: 'https://picsum.photos/seed/adminmsg/100/100',
    unreadCount: 1,
  },
];

export const sampleMessages: Record<string, ChatMessage[]> = {
  convo1: [
    { id: 'msg1-1', sender: 'other', text: "Hi Sarah, just a reminder about Leo's field trip form. Please send it by tomorrow if possible!", timestamp: '2024-07-21T11:25:00.000Z', avatarUrl: 'https://picsum.photos/seed/teacher1/100/100' },
    { id: 'msg1-2', sender: 'user', text: "Oh, thanks for the reminder Ms. Emily! I'll get that in today.", timestamp: '2024-07-21T11:28:00.000Z' },
    { id: 'msg1-3', sender: 'other', text: "Great, thank you!", timestamp: '2024-07-21T11:30:00.000Z', avatarUrl: 'https://picsum.photos/seed/teacher1/100/100' },
  ],
  convo2: [
    { id: 'msg2-1', sender: 'other', text: "Mia had a great day today, she really enjoyed the story time about the little blue truck.", timestamp: '2024-07-21T10:00:00.000Z', avatarUrl: 'https://picsum.photos/seed/teacher2/100/100' },
  ],
  convo3: [
     { id: 'msg3-1', sender: 'other', text: "Dear Parents, a friendly reminder: School fees are due next Friday. Please ensure payments are made on time. Thank you!", timestamp: '2024-07-20T12:00:00.000Z', avatarUrl: 'https://picsum.photos/seed/adminmsg/100/100' },
  ]
};


export const sampleSchoolAwards: SchoolAward[] = [
  {
    id: 'award1',
    title: 'Best Early Learning Center 2023',
    awardingBody: 'National Education Excellence',
    year: '2023',
    description: 'Recognized for innovative teaching methodologies and nurturing environment. This award highlights our commitment to providing a top-tier educational experience for young learners. We focus on a play-based curriculum that encourages curiosity and development in all key areas. Our teachers are dedicated professionals who create a supportive and stimulating atmosphere for every child.',
    iconName: 'Trophy', 
    imageUrl: 'https://picsum.photos/seed/award1/600/400',
    dataAiHint: "award trophy",
  },
  {
    id: 'award2',
    title: 'Child Safety Excellence Award',
    awardingBody: 'SafeKids Foundation',
    year: '2022',
    description: 'Awarded for maintaining the highest standards of child safety and security. We prioritize the well-being of our students above all else. Our facilities are regularly inspected, and our staff undergoes rigorous safety training. This award is a testament to our unwavering dedication to creating a safe and secure learning environment where children can thrive without worry.',
    imageUrl: 'https://picsum.photos/seed/award2/600/400',
    dataAiHint: "safety shield",
  },
  {
    id: 'award3',
    title: 'Green School Initiative Award',
    awardingBody: 'Environmental Education Board',
    year: '2023',
    description: 'For outstanding efforts in promoting environmental awareness and sustainability among young children. We believe in teaching our students the importance of caring for our planet from an early age. Our green initiatives include recycling programs, a school garden, and lessons on nature and conservation. This award inspires us to continue fostering a love for the environment.',
    iconName: 'Star', 
    imageUrl: 'https://picsum.photos/seed/award3/600/400',
    dataAiHint: "green award",
  },
  {
    id: 'award4',
    title: 'Community Engagement Award',
    awardingBody: 'Local Community Council',
    year: '2021',
    description: 'Acknowledged for fostering strong relationships with local families and community members. We see ourselves as an integral part of the community and strive to build open and supportive connections. This includes regular parent involvement activities, community events, and partnerships with local organizations. This award reflects our commitment to being a true community hub.',
    imageUrl: 'https://picsum.photos/seed/award4/600/400',
    dataAiHint: "community hands",
  },
];

export const getSchoolAwardById = async (id: string): Promise<SchoolAward | undefined> => {
  return Promise.resolve(sampleSchoolAwards.find(award => award.id === id));
};


    