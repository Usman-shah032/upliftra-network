import {
  User,
  Opportunity,
  Mentor,
  MentorshipRequest,
  Course,
  EventItem,
  CommunityPost,
  StartupItem,
  NotificationItem,
  DirectMessage,
  PlatformStats,
  AuditLogItem,
  ReportedItem
} from '../types';

export const INITIAL_STATS: PlatformStats = {
  totalUsers: 48920,
  activeStudents: 28400,
  verifiedMentors: 850,
  verifiedOpportunities: 1240,
  totalStartups: 310,
  partnerUniversities: 42,
  mentorshipSessionsCompleted: 6780,
  activeApplications: 14200
};

// 15 Role Pre-Configured Users for Instant Testing & Testing Switcher
export const PRESET_USERS: Record<string, User> = {
  student: {
    id: 'user_student_1',
    name: 'Hamza Tariq',
    email: 'hamza.tariq@nust.edu.pk',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    headline: 'BS Computer Science Final Year @ NUST Islamabad | Aspiring AI Engineer',
    location: 'Islamabad, Pakistan',
    isVerified: true,
    profileCompletion: 85,
    joinedDate: 'Oct 2024',
    bio: 'Passionate about deep learning, full-stack development, and open source. Looking for cloud mentorship and global scholarship opportunities.',
    universityName: 'National University of Sciences and Technology (NUST)',
    skills: ['Python', 'PyTorch', 'React', 'TypeScript', 'Docker', 'FastAPI', 'Data Structures', 'SQL'],
    interests: ['Artificial Intelligence', 'Cloud Native', 'Higher Studies in US/Europe', 'FinTech Startups'],
    preferredMenteeType: 'Seeking guidance for Master’s Scholarship & High-Growth Tech Roles',
    education: [
      {
        id: 'edu_1',
        institution: 'NUST SEECS, Islamabad',
        degree: 'Bachelor of Science (BS)',
        fieldOfStudy: 'Computer Science',
        startYear: '2021',
        endYear: '2025',
        grade: 'CGPA 3.82 / 4.0'
      }
    ],
    experience: [
      {
        id: 'exp_1',
        title: 'Machine Learning Intern',
        company: 'Systems Limited',
        location: 'Islamabad, Pakistan',
        startDate: 'Jun 2024',
        endDate: 'Aug 2024',
        isCurrent: false,
        description: 'Engineered NLP pipeline for Urdu-English code-switched sentiment classification with 91% accuracy.'
      }
    ],
    certifications: ['AWS Certified Cloud Practitioner', 'DeepLearning.AI Deep Learning Specialization'],
    projects: [
      {
        id: 'proj_1',
        title: 'UrduVoice AI - Speech to Text for Low Resource Dialects',
        description: 'Fine-tuned Whisper model for regional Pakistani accents and Urdu idioms.',
        technologies: ['PyTorch', 'HuggingFace', 'FastAPI', 'Next.js']
      }
    ]
  },
  professional: {
    id: 'user_prof_1',
    name: 'Ayesha Siddiqui',
    email: 'ayesha.siddiqui@techcorp.com',
    role: 'professional',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    headline: 'Senior Product Manager @ Careem | Ex-Daraz | Tech Ecosystem Advocate',
    location: 'Karachi, Pakistan',
    isVerified: true,
    profileCompletion: 95,
    joinedDate: 'Jan 2024',
    bio: 'Leading marketplace growth and customer retention products. 6+ years driving cross-functional tech teams across Pakistan and MENA.',
    companyName: 'Careem',
    skills: ['Product Strategy', 'Growth Marketing', 'Agile Product Management', 'SQL & Product Analytics', 'User Research'],
    interests: ['FinTech', 'Super Apps', 'Mentoring Women in Tech', 'Angel Investing']
  },
  mentor: {
    id: 'user_mentor_1',
    name: 'Dr. Shahbaz Alam',
    email: 'shahbaz.alam@fulbrightalumni.org',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    headline: 'Principal AI Architect @ 10Pearls | Fulbright Scholar @ CMU',
    location: 'Lahore, Pakistan',
    isVerified: true,
    profileCompletion: 100,
    joinedDate: 'Nov 2023',
    bio: '12+ years in Artificial Intelligence & Distributed Systems. Mentored 150+ students for Fulbright, Erasmus Mundus, and FAANG tech careers.',
    companyName: '10Pearls',
    expertise: ['AI / Machine Learning', 'Cloud Architecture', 'Fulbright & Graduate Admissions', 'Tech Leadership'],
    skills: ['Distributed Systems', 'LLM Fine-Tuning', 'Career Strategy', 'System Design', 'Academic Publishing'],
    mentoringTopics: ['MS/PhD Scholarship Applications', 'Career Transition into AI', 'System Design Interviews', 'Startup Tech Architecture'],
    hourlyRate: 0,
    availableHoursPerWeek: 4,
    preferredMenteeType: 'Students & Early Professionals seeking deep tech and scholarship guidance',
    languages: ['English', 'Urdu', 'Punjabi'],
    sessionPreferences: ['1-on-1 Video Calls', 'Resume & Statement of Purpose Review', 'Mock Technical Interviews']
  },
  recruiter: {
    id: 'user_recruiter_1',
    name: 'Bilal Khan',
    email: 'bilal.k@arbisoft.com',
    role: 'recruiter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    headline: 'Lead Technical Recruiter @ Arbisoft | Hiring top 1% Software Engineers in Pakistan',
    location: 'Lahore, Pakistan',
    isVerified: true,
    profileCompletion: 90,
    joinedDate: 'Mar 2024',
    bio: 'Connecting Pakistan’s finest software engineers, QA leads, and engineering managers with tier-1 international engineering teams.',
    companyName: 'Arbisoft',
    hiringAreas: ['Full Stack (React/Node/Python)', 'DevOps & SRE', 'QA Automation', 'Data Engineers'],
    openPositionsCount: 14
  },
  company: {
    id: 'user_company_1',
    name: 'Systems Limited',
    email: 'careers@systemsltd.com',
    role: 'company',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
    headline: 'Pakistan’s Leading IT Exporter & Global Tech Consultancy (5000+ Employees)',
    location: 'Lahore / Karachi / Islamabad',
    isVerified: true,
    profileCompletion: 95,
    joinedDate: 'Jan 2023',
    companyName: 'Systems Limited',
    website: 'https://systemsltd.com',
    bio: 'Systems Limited is a globally recognized leader in digital transformation, cloud, and AI engineering services operating in 16+ countries.',
    hiringAreas: ['Enterprise Cloud', 'Banking Tech', 'AI/Data Science', 'SAP', 'Full-Stack'],
    openPositionsCount: 38
  },
  startup: {
    id: 'user_startup_1',
    name: 'KisanConnect Technologies',
    email: 'founders@kisanconnect.pk',
    role: 'startup',
    avatar: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&auto=format&fit=crop&q=80',
    headline: 'AI-Powered Precision AgriTech Platform for Pakistani Smallholder Farmers (Pre-Seed)',
    location: 'Faisalabad & Lahore, Pakistan',
    isVerified: true,
    profileCompletion: 92,
    joinedDate: 'May 2024',
    startupName: 'KisanConnect',
    startupStage: 'MVP / Early Traction',
    coFounders: ['Zainab Akhtar (CEO - LUMS)', 'Daniyal Farooq (CTO - FAST)'],
    bio: 'Solving supply chain inefficiencies and crop disease detection using mobile computer vision for 20,000+ registered farmers across Punjab and Sindh.',
    skills: ['AgriTech', 'Mobile Vision', 'Micro-financing', 'B2B Logistics']
  },
  university: {
    id: 'user_univ_1',
    name: 'FAST-NUCES Career & Placement Center',
    email: 'placements@nu.edu.pk',
    role: 'university',
    avatar: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&auto=format&fit=crop&q=80',
    headline: 'Official Career Services Office | FAST National University of Computer & Emerging Sciences',
    location: 'All Campuses (Islamabad, Lahore, Karachi, Peshawar, CFD)',
    isVerified: true,
    profileCompletion: 90,
    joinedDate: 'Dec 2023',
    universityName: 'FAST-NUCES',
    website: 'https://nu.edu.pk'
  },
  organization: {
    id: 'user_org_1',
    name: 'IGNITE National Technology Fund',
    email: 'partnerships@ignite.org.pk',
    role: 'organization',
    avatar: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&auto=format&fit=crop&q=80',
    headline: 'Ministry of IT & Telecom, Government of Pakistan',
    location: 'Islamabad, Pakistan',
    isVerified: true,
    profileCompletion: 96,
    joinedDate: 'Nov 2023',
    organizationName: 'IGNITE Pakistan',
    website: 'https://ignite.org.pk',
    bio: 'Funding start-ups and innovative projects that utilize 4th industrial wave technologies to solve indigenous problems.'
  },
  volunteer: {
    id: 'user_vol_1',
    name: 'Mahnoor Baloch',
    email: 'mahnoor.baloch@gmail.com',
    role: 'volunteer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    headline: 'Community Volunteer & STEM Educator in Quetta | Upliftra Outreach',
    location: 'Quetta, Balochistan',
    isVerified: true,
    profileCompletion: 80,
    joinedDate: 'Feb 2024',
    bio: 'Organizing digital literacy and coding bootcamps for underprivileged youth in Balochistan.'
  },
  campus_ambassador: {
    id: 'user_ca_1',
    name: 'Usman Ali Mir',
    email: 'usman.mir@giki.edu.pk',
    role: 'campus_ambassador',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    headline: 'Lead Campus Ambassador @ GIKI Topi | President ACM Student Chapter',
    location: 'Topi, KPK, Pakistan',
    isVerified: true,
    profileCompletion: 85,
    joinedDate: 'Jan 2024',
    universityName: 'GIK Institute of Engineering Sciences and Technology',
    bio: 'Driving Upliftra career sessions, hackathons, and mentor office hours across KPK universities.'
  },
  partner: {
    id: 'user_partner_1',
    name: 'British Council Pakistan',
    email: 'scholarships@britishcouncil.org.pk',
    role: 'partner',
    avatar: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&auto=format&fit=crop&q=80',
    headline: 'Strategic International Education & Cultural Partner',
    location: 'Islamabad, Pakistan',
    isVerified: true,
    profileCompletion: 100,
    joinedDate: 'Oct 2023',
    organizationName: 'British Council Pakistan',
    website: 'https://britishcouncil.pk'
  },
  moderator: {
    id: 'user_mod_1',
    name: 'Sara Farooq',
    email: 'sara.moderator@upliftra.pk',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    headline: 'Community Quality & Trust Specialist @ Upliftra Network',
    location: 'Islamabad, Pakistan',
    isVerified: true,
    profileCompletion: 100,
    joinedDate: 'Sep 2023',
    bio: 'Ensuring safe, credible opportunities and high-standard professional conduct across Upliftra.'
  },
  trainer: {
    id: 'user_trainer_1',
    name: 'Kashif Rasheed',
    email: 'kashif.trainer@cloudguru.pk',
    role: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    headline: 'Certified AWS Solutions Architect & DevOps Trainer | 10k+ Engineers Trained',
    location: 'Lahore, Pakistan',
    isVerified: true,
    profileCompletion: 95,
    joinedDate: 'Dec 2023',
    bio: 'Specializing in Kubernetes, Terraform, AWS Cloud migrations, and DevOps certification bootcamps.'
  },
  admin: {
    id: 'user_admin_1',
    name: 'Zia-ur-Rehman',
    email: 'zia.admin@upliftra.pk',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    headline: 'Operations & Platform Verification Manager @ Upliftra Network',
    location: 'Islamabad, Pakistan',
    isVerified: true,
    profileCompletion: 100,
    joinedDate: 'Aug 2023'
  },
  super_admin: {
    id: 'user_superadmin_1',
    name: 'Syed Usman Ali Shah',
    email: 'usmanalishah.bmj@gmail.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&auto=format&fit=crop&q=80',
    headline: 'Founder & Chief Architect @ Upliftra Network | Pakistan Career Ecosystem',
    location: 'Pakistan',
    isVerified: true,
    profileCompletion: 100,
    joinedDate: 'Jan 2023'
  }
};

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp_1',
    title: 'Associate Cloud Engineer (Graduate Trainee 2025)',
    organization: 'Systems Limited',
    organizationLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    category: 'job',
    description: 'We are looking for fresh graduates in Computer Science, Software Engineering, or IT to join our high-impact Cloud & DevOps practice working on multi-cloud enterprise modernization.',
    eligibility: 'Fresh graduates of 2024-2025 with CS/SE/IT degree. Minimum CGPA 3.0. Strong fundamentals in Linux, Networking, and Python or Go.',
    location: 'Lahore / Islamabad / Karachi',
    city: 'Lahore',
    isRemote: false,
    deadline: '2026-09-30',
    salaryOrStipend: 'PKR 120,000 - 150,000 / month + Benefits',
    requiredSkills: ['Linux', 'Python', 'AWS or Azure Basics', 'Git', 'Docker'],
    applicationMethod: 'external_link',
    applyUrl: 'https://careers.systemsltd.com/jobs/cloud-associate-2025',
    officialSource: 'Systems Limited Official Careers Portal & LinkedIn Verified',
    verificationStatus: 'verified',
    postedDate: '2026-08-15',
    postedBy: 'Systems Limited HR',
    views: 1420,
    applicantCount: 218,
    isFeatured: true
  },
  {
    id: 'opp_2',
    title: 'Fulbright Foreign Student Scholarship Program 2026-2027',
    organization: 'USEFP (United States Educational Foundation in Pakistan)',
    organizationLogo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80',
    category: 'scholarship',
    description: 'Prestigious fully funded scholarship covering tuition, textbooks, airfare, a living stipend, and health insurance for Master’s or PhD degree programs in the United States.',
    eligibility: 'Pakistani citizens residing in Pakistan. 16 years of formal education (for Master’s) or 18 years (for PhD). GRE general test required.',
    location: 'United States (Nationwide Universities)',
    city: 'Islamabad (Office)',
    isRemote: true,
    deadline: '2026-10-15',
    salaryOrStipend: '100% Fully Funded (Tuition, Stipend, Airfare, Health)',
    requiredSkills: ['Academic Excellence', 'Leadership Potential', 'Statement of Purpose', 'Research Proposal'],
    applicationMethod: 'external_link',
    applyUrl: 'https://usefp.org/fulbright-program',
    officialSource: 'USEFP Official Website',
    verificationStatus: 'verified',
    postedDate: '2026-08-01',
    postedBy: 'Upliftra Academic Outreach',
    views: 4890,
    applicantCount: 730,
    isFeatured: true
  },
  {
    id: 'opp_3',
    title: 'Software Engineering Summer Internship (FinTech Core)',
    organization: 'SadaPay',
    organizationLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80',
    category: 'internship',
    description: 'Work alongside world-class engineers building seamless digital banking rails for Pakistan. Hands-on experience with microservices, event-driven architecture, and zero-trust security.',
    eligibility: '3rd or 4th year Bachelor’s students in Computer Science / Software Engineering. Strong grasp of OOP, APIs, and databases.',
    location: 'Islamabad / Hybrid',
    city: 'Islamabad',
    isRemote: true,
    deadline: '2026-09-20',
    salaryOrStipend: 'PKR 60,000 / month Stipend',
    requiredSkills: ['TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Unit Testing'],
    applicationMethod: 'internal',
    applyUrl: 'https://sadapay.pk/careers',
    officialSource: 'SadaPay Verified Talent Team',
    verificationStatus: 'verified',
    postedDate: '2026-08-18',
    postedBy: 'SadaPay HR',
    views: 2950,
    applicantCount: 412,
    isFeatured: true
  },
  {
    id: 'opp_4',
    title: 'Ignite National Incubation Cohort 14 - AgriTech & HealthTech Grants',
    organization: 'National Incubation Center (NIC) Pakistan',
    organizationLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&auto=format&fit=crop&q=80',
    category: 'fellowship',
    description: '6-month intensive incubation program providing equity-free seed grants, mentorship from international founders, workspace, and investor demo day access.',
    eligibility: 'Pakistani startups with at least an MVP or validated prototype. Minimum 2 co-founders.',
    location: 'Lahore, Islamabad, Karachi, Peshawar, Quetta',
    city: 'Islamabad',
    isRemote: false,
    deadline: '2026-10-05',
    salaryOrStipend: 'Up to PKR 2.5 Million Equity-Free Grant',
    requiredSkills: ['Pitch Deck', 'Product Prototype', 'Market Validation'],
    applicationMethod: 'external_link',
    applyUrl: 'https://nicpakistan.pk/apply',
    officialSource: 'Ministry of IT & Telecom Verified',
    verificationStatus: 'verified',
    postedDate: '2026-08-10',
    postedBy: 'NIC Official',
    views: 1820,
    applicantCount: 94
  },
  {
    id: 'opp_5',
    title: 'Teach For Pakistan 2-Year Leadership Fellowship 2026',
    organization: 'Teach For Pakistan',
    organizationLogo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&auto=format&fit=crop&q=80',
    category: 'fellowship',
    description: 'A prestigious nationwide fellowship where Pakistan’s top graduates teach in high-need government schools, developing core leadership, problem-solving, and civic impact skills.',
    eligibility: 'Graduates with a minimum 4-year Bachelor’s degree in any discipline. Passion for educational equity.',
    location: 'Islamabad & Rural Punjab',
    city: 'Islamabad',
    isRemote: false,
    deadline: '2026-11-01',
    salaryOrStipend: 'PKR 85,000 / month + Medical & Executive Coaching',
    requiredSkills: ['Communication', 'Leadership', 'Empathy', 'Problem Solving'],
    applicationMethod: 'external_link',
    applyUrl: 'https://iteachforpakistan.org/fellowship',
    officialSource: 'Teach For Pakistan Foundation',
    verificationStatus: 'verified',
    postedDate: '2026-08-12',
    postedBy: 'TFP Recruitment',
    views: 1540,
    applicantCount: 160
  },
  {
    id: 'opp_6',
    title: 'Chevening UK Government Master’s Scholarships 2026',
    organization: 'Foreign, Commonwealth & Development Office (UK)',
    organizationLogo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=100&auto=format&fit=crop&q=80',
    category: 'scholarship',
    description: 'Fully funded 1-year Master’s degree at any accredited UK university. Aimed at emerging leaders from Pakistan with a vision for community and economic development.',
    eligibility: 'Pakistani citizen, minimum 2 years of work experience (2,800 hours), undergraduate degree equivalent to an upper second-class 2:1 honours.',
    location: 'United Kingdom',
    city: 'London (UK Universities)',
    isRemote: true,
    deadline: '2026-11-05',
    salaryOrStipend: '100% Fully Funded (Tuition, Monthly Living Allowance, Flights)',
    requiredSkills: ['Leadership', 'Networking', 'Career Plan', 'Academic Standing'],
    applicationMethod: 'external_link',
    applyUrl: 'https://www.chevening.org/scholarship/pakistan/',
    officialSource: 'UK High Commission Islamabad',
    verificationStatus: 'verified',
    postedDate: '2026-08-05',
    postedBy: 'British Council Outreach',
    views: 6200,
    applicantCount: 940,
    isFeatured: true
  },
  {
    id: 'opp_7',
    title: 'Full Stack MERN Developer (Urgent Hiring)',
    organization: '10Pearls',
    organizationLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    category: 'job',
    description: 'Building high-scale customer portals for North American clients. Must have solid experience in Node.js, Express, React, and MongoDB.',
    eligibility: '1-3 years professional experience in React and Node.js.',
    location: 'Karachi / Hybrid',
    city: 'Karachi',
    isRemote: true,
    deadline: '2026-09-15',
    salaryOrStipend: 'PKR 160,000 - 220,000 / month',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'AWS'],
    applicationMethod: 'internal',
    applyUrl: 'https://10pearls.com/careers',
    officialSource: '10Pearls Official Careers Portal',
    verificationStatus: 'verified',
    postedDate: '2026-08-16',
    postedBy: '10Pearls Talent Acquisition',
    views: 1980,
    applicantCount: 145
  },
  {
    id: 'opp_8',
    title: 'AI & Data Science Apprenticeship (Govt of Pakistan NAVTTC)',
    organization: 'NAVTTC & Prime Minister Youth Skill Development',
    organizationLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&auto=format&fit=crop&q=80',
    category: 'training',
    description: 'Free 3-month government-backed specialized training in Python, Machine Learning, PowerBI, and generative AI tools with job placement support.',
    eligibility: 'Pakistani youth aged 18-35 with intermediate/bachelor degree.',
    location: 'Islamabad, Lahore, Karachi, Peshawar, Quetta, Multan',
    city: 'Nationwide',
    isRemote: true,
    deadline: '2026-09-25',
    salaryOrStipend: 'Free Training + Certificate + PKR 10,000 Monthly Stipend',
    requiredSkills: ['Basic Computer Literacy', 'Analytical Thinking'],
    applicationMethod: 'external_link',
    applyUrl: 'https://nsis.navttc.gov.pk',
    officialSource: 'Government of Pakistan Official NAVTTC portal',
    verificationStatus: 'verified',
    postedDate: '2026-08-14',
    postedBy: 'NAVTTC Officer',
    views: 3100,
    applicantCount: 520
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'mentor_1',
    name: 'Dr. Shahbaz Alam',
    email: 'shahbaz.alam@10pearls.com',
    title: 'Principal AI Architect & Fulbright Scholar',
    company: '10Pearls / CMU Alumni',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    expertise: ['AI / Machine Learning', 'Cloud Systems', 'Fulbright Scholarships', 'Graduate Admissions'],
    skills: ['PyTorch', 'Distributed Systems', 'LLMs', 'Research Papers', 'SoP Review'],
    industry: 'Artificial Intelligence & Academia',
    experienceYears: 12,
    education: 'PhD in Machine Learning (Carnegie Mellon University)',
    mentoringTopics: ['US & European Scholarship Applications', 'Transition into AI Engineering', 'System Design & High Performance Computing'],
    availability: 'Open for Mentees',
    preferredMenteeType: 'Motivated students & early engineers looking for global career growth',
    languages: ['English', 'Urdu', 'Punjabi'],
    sessionPreferences: ['1-on-1 Video Session', 'SOP / Resume Deep Review', 'Technical Architecture Mock'],
    bio: 'Guided over 150 Pakistani engineers to Fulbright, Erasmus Mundus, and top remote Silicon Valley jobs. Passionate about empowering Pakistan’s next-gen tech leadership.',
    rating: 4.96,
    reviewCount: 84,
    totalMenteesHelped: 142,
    isVerified: true,
    location: 'Lahore, Pakistan (Remote Worldwide)',
    matchScore: 95,
    matchReasons: ['Specializes in AI and Cloud Architecture', 'Proven track record with US scholarships and NUST students']
  },
  {
    id: 'mentor_2',
    name: 'Sarah Mansoor',
    email: 'sarah.m@stripe.com',
    title: 'Senior Staff Software Engineer @ Stripe (Remote)',
    company: 'Stripe | Ex-Careem',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    expertise: ['Full-Stack Engineering', 'FinTech Architecture', 'Remote Work Strategy', 'Coding Interviews'],
    skills: ['TypeScript', 'Ruby', 'Distributed Databases', 'System Design', 'LeetCode Prep'],
    industry: 'Financial Technology & Global Remote',
    experienceYears: 9,
    education: 'BS CS from FAST-NUCES Karachi',
    mentoringTopics: ['Cracking Global Remote Engineering Roles ($80k+)', 'Senior Engineering Career Ladder', 'Clean Architecture & Scalability'],
    availability: 'Open for Mentees',
    preferredMenteeType: 'Mid-level & Senior developers aiming for US/EU remote salaries',
    languages: ['English', 'Urdu'],
    sessionPreferences: ['1-on-1 Video Session', 'System Design Mock', 'Resume Review'],
    bio: 'From FAST Karachi to leading payment infrastructure at Stripe. I teach practical strategies to pass international remote interviews and negotiate top compensation.',
    rating: 4.98,
    reviewCount: 62,
    totalMenteesHelped: 98,
    isVerified: true,
    location: 'Karachi, Pakistan',
    matchScore: 92,
    matchReasons: ['Expert in high-scale full-stack systems and international remote recruitment']
  },
  {
    id: 'mentor_3',
    name: 'Farhan Qureshi',
    email: 'farhan@careem.com',
    title: 'Director of Product Management',
    company: 'Careem / Uber',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    expertise: ['Product Management', 'Product Growth', 'Startup Scaling', 'Leadership'],
    skills: ['Product Roadmapping', 'User Research', 'A/B Testing', 'Metrics & OKRs', 'Cross-functional Leadership'],
    industry: 'Mobility, Logistics & Super Apps',
    experienceYears: 11,
    education: 'BSc Economics from LUMS | MBA INSEAD',
    mentoringTopics: ['Transitioning from Engineering/Marketing to Product Management', 'Product Execution in Emerging Markets', 'Building 0-to-1 Startups'],
    availability: 'Limited Slots',
    preferredMenteeType: 'Aspiring PMs and Startup Founders',
    languages: ['English', 'Urdu'],
    sessionPreferences: ['1-on-1 Strategy Session', 'Product Teardown & Case Study Prep'],
    bio: 'Scaled products from 10k to 10M+ monthly rides across 12 countries. Helping product thinkers navigate complex metrics and build customer-obsessed products.',
    rating: 4.92,
    reviewCount: 45,
    totalMenteesHelped: 76,
    isVerified: true,
    location: 'Lahore, Pakistan',
    matchScore: 88,
    matchReasons: ['Extensive experience in product management, growth, and startup leadership']
  },
  {
    id: 'mentor_4',
    name: 'Zainab Binte Tariq',
    email: 'zainab.t@oxfordalumni.org',
    title: 'Chevening Scholar & International Policy Consultant',
    company: 'Oxford Alumna / British Council Advisory',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    expertise: ['Chevening & Commonwealth Scholarships', 'Public Policy', 'Development Sector', 'Essay Writing'],
    skills: ['Proposal Drafting', 'Interview Prep', 'International Relations', 'Career Storytelling'],
    industry: 'International Development & Public Policy',
    experienceYears: 7,
    education: 'Master of Public Policy (University of Oxford)',
    mentoringTopics: ['Chevening 4-Essay Mastery', 'Securing UK University Admissions', 'Impact Careers in Pakistan & Global NGOs'],
    availability: 'Open for Mentees',
    preferredMenteeType: 'Applicants for UK, European, and development sector fellowships',
    languages: ['English', 'Urdu'],
    sessionPreferences: ['Comprehensive Essay Review', 'Mock Panel Interview'],
    bio: 'Assisted 80+ scholars in securing fully funded UK and European government awards. Mentoring with structured rubrics and genuine feedback.',
    rating: 5.0,
    reviewCount: 71,
    totalMenteesHelped: 115,
    isVerified: true,
    location: 'Islamabad, Pakistan',
    matchScore: 90,
    matchReasons: ['Specialist in European & UK fully-funded scholarships with Oxford background']
  }
];

export const INITIAL_MENTOR_REQUESTS: MentorshipRequest[] = [
  {
    id: 'req_1',
    menteeId: 'user_student_1',
    menteeName: 'Hamza Tariq',
    menteeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    menteeRole: 'Student (CS @ NUST)',
    mentorId: 'mentor_1',
    mentorName: 'Dr. Shahbaz Alam',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'accepted',
    message: 'Respected Dr. Shahbaz, I am preparing for Fulbright 2026 Master’s application in AI/ML and have developed an Urdu speech model. Would appreciate your review on my Statement of Purpose and research plan.',
    goals: 'Refine SOP, select target US universities, and discuss AI engineering trajectory.',
    requestedDate: '2026-08-16',
    scheduledTime: '2026-08-25T15:00:00Z',
    meetingLink: 'https://upliftra.pk/meet/room-shahbaz-hamza-912',
    sessionNotes: 'Prepared draft SOP and research paper outline on speech transformers.'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course_1',
    title: 'Full-Stack Modern Cloud Engineering (TypeScript, Docker, AWS)',
    instructor: 'Kashif Rasheed',
    instructorTitle: 'Principal Cloud Architect @ TechScale PK',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    organization: 'Upliftra Cloud Academy',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    category: 'Software Engineering',
    level: 'Intermediate',
    duration: '8 Weeks (32 Hours)',
    modulesCount: 4,
    rating: 4.92,
    enrolledCount: 3420,
    certificateAvailable: true,
    prerequisites: ['Basic JavaScript / TypeScript', 'Fundamentals of HTML & CSS', 'Basic Git Knowledge'],
    description: 'Master industry-standard production web services from monolithic to cloud-native microservices with hands-on Pakistani & international project case studies.',
    skillsEarned: ['React 19', 'Express / Node.js', 'Docker', 'AWS ECS', 'PostgreSQL', 'CI/CD Pipelines'],
    isEnrolled: true,
    progressPercentage: 50,
    completedLessonIds: ['c1_l1', 'c1_l2'],
    modules: [
      {
        id: 'mod_1',
        title: 'Module 1: Enterprise TypeScript Architecture & Clean Code',
        duration: '4 Lessons • 6 Hours',
        lessonsCount: 4,
        lessons: [
          { id: 'c1_l1', title: 'TypeScript Strict Mode & Generics in Production', duration: '45m', isCompleted: true, type: 'video' },
          { id: 'c1_l2', title: 'Domain Driven Design & Clean Folder Structures', duration: '50m', isCompleted: true, type: 'video' },
          { id: 'c1_l3', title: 'Building Type-Safe REST & GraphQL APIs with Express', duration: '60m', isCompleted: false, type: 'video' },
          { id: 'c1_l4', title: 'Hands-on Assignment: Multi-tenant SaaS API Boilerplate', duration: '90m', isCompleted: false, type: 'assignment' }
        ]
      },
      {
        id: 'mod_2',
        title: 'Module 2: Containerization with Docker & Local Orchestration',
        duration: '3 Lessons • 5 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c1_l5', title: 'Multi-stage Docker Builds for Frontend & Backend', duration: '40m', isCompleted: false, type: 'video' },
          { id: 'c1_l6', title: 'Docker Compose for PostgreSQL, Redis, & Node Microservices', duration: '55m', isCompleted: false, type: 'video' },
          { id: 'c1_l7', title: 'Container Security & Vulnerability Scanning', duration: '35m', isCompleted: false, type: 'video' }
        ]
      },
      {
        id: 'mod_3',
        title: 'Module 3: AWS Deployment, ECS Fargate & Cloud Databases',
        duration: '3 Lessons • 6 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c1_l8', title: 'Provisioning VPC, RDS PostgreSQL & IAM Roles securely', duration: '50m', isCompleted: false, type: 'video' },
          { id: 'c1_l9', title: 'Deploying Docker Containers to AWS ECS Fargate', duration: '65m', isCompleted: false, type: 'video' },
          { id: 'c1_l10', title: 'SSL Certificates, Route 53 & Application Load Balancers', duration: '45m', isCompleted: false, type: 'video' }
        ]
      },
      {
        id: 'mod_4',
        title: 'Module 4: Automated CI/CD & Production Observability',
        duration: '3 Lessons • 5 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c1_l11', title: 'GitHub Actions Workflows for Automated Testing & Deployment', duration: '50m', isCompleted: false, type: 'video' },
          { id: 'c1_l12', title: 'Structured Logging, Prometheus Metrics & Sentry Alerts', duration: '45m', isCompleted: false, type: 'video' },
          { id: 'c1_l13', title: 'Final Capstone Project & Certificate Assessment', duration: '120m', isCompleted: false, type: 'assignment' }
        ]
      }
    ]
  },
  {
    id: 'course_2',
    title: 'Mastering the Fulbright & International Scholarship Application',
    instructor: 'Dr. Shahbaz Alam & Panel of Scholars',
    instructorTitle: 'Fulbright Scholar @ CMU & Academic Advisor',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    organization: 'Upliftra Global Scholars Hub',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    category: 'Higher Studies & Scholarships',
    level: 'Beginner',
    duration: '4 Weeks (16 Hours)',
    modulesCount: 4,
    rating: 4.98,
    enrolledCount: 5200,
    certificateAvailable: true,
    prerequisites: ['Undergraduate Degree or Final Year Standing in Pakistan'],
    description: 'Step-by-step masterclass on formulating high-impact Statements of Purpose, Study Objectives, GRE strategies, Professor outreach emails, and winning interview techniques.',
    skillsEarned: ['Statement of Purpose Writing', 'Research Proposals', 'Academic CV Structuring', 'Panel Interview Mastery'],
    isEnrolled: false,
    progressPercentage: 0,
    completedLessonIds: [],
    modules: [
      {
        id: 'mod_f1',
        title: 'Module 1: Demystifying the Fulbright, Chevening & Erasmus Frameworks',
        duration: '3 Lessons • 4 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c2_l1', title: 'Understanding Selection Criteria, Rubrics & Impact Criteria', duration: '45m', isCompleted: false, type: 'video' },
          { id: 'c2_l2', title: 'Eligibility Check, Timelines & Preparing your 12-Month Plan', duration: '40m', isCompleted: false, type: 'video' },
          { id: 'c2_l3', title: 'Academic CV vs. Industry Resume: The Fundamental Differences', duration: '35m', isCompleted: false, type: 'reading' }
        ]
      },
      {
        id: 'mod_f2',
        title: 'Module 2: Crafting the Statement of Purpose (SOP) & Study Objectives',
        duration: '3 Lessons • 5 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c2_l4', title: 'The 5-Paragraph Narrative Arc: Hook, Problem, Past Work, Goals & Vision', duration: '60m', isCompleted: false, type: 'video' },
          { id: 'c2_l5', title: 'Writing Compelling Study Objectives Tailored to Pakistan’s Development', duration: '55m', isCompleted: false, type: 'video' },
          { id: 'c2_l6', title: 'Live Essay Teardowns: Good vs. Bad Pakistani Applicant Essays', duration: '60m', isCompleted: false, type: 'reading' }
        ]
      },
      {
        id: 'mod_f3',
        title: 'Module 3: Recommendation Letters & Strategic Professor Outreach',
        duration: '2 Lessons • 3 Hours',
        lessonsCount: 2,
        lessons: [
          { id: 'c2_l7', title: 'Selecting the Right Academic & Professional Recommenders', duration: '40m', isCompleted: false, type: 'video' },
          { id: 'c2_l8', title: 'Cold-Emailing International Lab PIs and Securing Research Backing', duration: '45m', isCompleted: false, type: 'video' }
        ]
      },
      {
        id: 'mod_f4',
        title: 'Module 4: Fulbright Interview Simulation & Presentation Skills',
        duration: '2 Lessons • 4 Hours',
        lessonsCount: 2,
        lessons: [
          { id: 'c2_l9', title: 'The Top 10 Most Common USEFP Panel Interview Questions & Frameworks', duration: '50m', isCompleted: false, type: 'video' },
          { id: 'c2_l10', title: 'Mock Panel Interview Video Analysis & Final Checklist', duration: '60m', isCompleted: false, type: 'assignment' }
        ]
      }
    ]
  },
  {
    id: 'course_3',
    title: 'Cracking US/EU Remote Software Engineering Roles ($50k-$120k)',
    instructor: 'Sarah Mansoor',
    instructorTitle: 'Senior Staff Engineer @ Stripe (Remote from Pakistan)',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    organization: 'Upliftra Remote Career Track',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    category: 'Software Engineering',
    level: 'Advanced',
    duration: '6 Weeks (20 Hours)',
    modulesCount: 4,
    rating: 4.96,
    enrolledCount: 2840,
    certificateAvailable: true,
    prerequisites: ['2+ years programming experience', 'Data Structures & Algorithms foundations'],
    description: 'Learn the exact strategies used by top Pakistani engineers to bypass recruiter filters, pass live coding rounds, master System Design interviews, and negotiate USD remote compensation.',
    skillsEarned: ['Remote Work Negotiation', 'System Design', 'LeetCode Medium/Hard Patterns', 'Async Communication', 'Contractor Invoicing & Taxes'],
    isEnrolled: false,
    progressPercentage: 0,
    completedLessonIds: [],
    modules: [
      {
        id: 'mod_r1',
        title: 'Module 1: Positioning Your Profile for Global Recruiters',
        duration: '3 Lessons • 4 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c3_l1', title: 'ATS-Proof Tech Resume Structuring & Quantification Formulas', duration: '45m', isCompleted: false, type: 'video' },
          { id: 'c3_l2', title: 'LinkedIn Optimization & Inbound Recruiter Funnels for Pakistan', duration: '40m', isCompleted: false, type: 'video' },
          { id: 'c3_l3', title: 'Top Remote Job Boards: Wellfound, Otta, Remotive, Turing, Toptal', duration: '35m', isCompleted: false, type: 'reading' }
        ]
      },
      {
        id: 'mod_r2',
        title: 'Module 2: Live Coding & Algorithm Mastery',
        duration: '3 Lessons • 6 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c3_l4', title: 'The Top 14 LeetCode Patterns You Must Know', duration: '60m', isCompleted: false, type: 'video' },
          { id: 'c3_l5', title: 'Communicating Thought Process Under Pressure in Live Coderpad', duration: '50m', isCompleted: false, type: 'video' },
          { id: 'c3_l6', title: 'Take-Home Project Architecture & Best Practices', duration: '60m', isCompleted: false, type: 'assignment' }
        ]
      },
      {
        id: 'mod_r3',
        title: 'Module 3: Scalable System Design Interviews',
        duration: '3 Lessons • 6 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c3_l7', title: 'High-Level Architecture: Load Balancing, Caching, DB Sharding', duration: '55m', isCompleted: false, type: 'video' },
          { id: 'c3_l8', title: 'Designing a Global Distributed URL Shortener & Payment Gateway', duration: '65m', isCompleted: false, type: 'video' },
          { id: 'c3_l9', title: 'Microservices vs. Event-Driven Systems (Kafka / SQS)', duration: '50m', isCompleted: false, type: 'video' }
        ]
      },
      {
        id: 'mod_r4',
        title: 'Module 4: Offer Negotiation, Remote Banking & PSEB IT Exemptions',
        duration: '2 Lessons • 4 Hours',
        lessonsCount: 2,
        lessons: [
          { id: 'c3_l10', title: 'Negotiating Base Salary, Equity (RSUs/Options) and Stipends', duration: '45m', isCompleted: false, type: 'video' },
          { id: 'c3_l11', title: 'Remote Contractor Invoicing (Deel, Wise, Payoneer) & Tax Registration', duration: '50m', isCompleted: false, type: 'reading' }
        ]
      }
    ]
  },
  {
    id: 'course_4',
    title: 'Generative AI & LLM Application Engineering',
    instructor: 'Dr. Shahbaz Alam & Team',
    instructorTitle: 'Principal AI Architect @ 10Pearls',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    organization: 'Upliftra AI Institute',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '6 Weeks (24 Hours)',
    modulesCount: 4,
    rating: 4.95,
    enrolledCount: 2190,
    certificateAvailable: true,
    prerequisites: ['Python intermediate proficiency', 'Basic understanding of APIs & linear algebra'],
    description: 'Learn to build production-ready AI applications using Google Gemini 2.5/3, LangChain, LlamaIndex, Vector Databases, and local fine-tuning.',
    skillsEarned: ['Gemini API SDK', 'RAG Architecture', 'Pinecone / Qdrant', 'LangChain', 'Prompt Engineering', 'Evaluation & Guardrails'],
    isEnrolled: false,
    progressPercentage: 0,
    completedLessonIds: [],
    modules: [
      {
        id: 'mod_ai1',
        title: 'Module 1: Prompt Engineering & Modern LLM Paradigms',
        duration: '3 Lessons • 5 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c4_l1', title: 'Zero-shot, Few-shot, Chain-of-Thought & ReAct Prompting', duration: '45m', isCompleted: false, type: 'video' },
          { id: 'c4_l2', title: 'Structured Output Generation with JSON Schemas & Function Calling', duration: '50m', isCompleted: false, type: 'video' },
          { id: 'c4_l3', title: 'Hands-on: Building a Multilingual Urdu-English Assistant with Gemini', duration: '60m', isCompleted: false, type: 'assignment' }
        ]
      },
      {
        id: 'mod_ai2',
        title: 'Module 2: Retrieval-Augmented Generation (RAG) Systems',
        duration: '3 Lessons • 6 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c4_l4', title: 'Document Chunking Strategies, Embedding Models & Vector Math', duration: '55m', isCompleted: false, type: 'video' },
          { id: 'c4_l5', title: 'Vector DBs in Action: Pinecone, Qdrant, and pgvector', duration: '60m', isCompleted: false, type: 'video' },
          { id: 'c4_l6', title: 'Hybrid Search, Re-ranking & Context Compression', duration: '50m', isCompleted: false, type: 'video' }
        ]
      },
      {
        id: 'mod_ai3',
        title: 'Module 3: Autonomous AI Agents & Tool Calling',
        duration: '3 Lessons • 7 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c4_l7', title: 'Agent Loops, Memory Management & Planning Frameworks', duration: '60m', isCompleted: false, type: 'video' },
          { id: 'c4_l8', title: 'Building Multi-Agent Workflows with LangGraph', duration: '75m', isCompleted: false, type: 'video' },
          { id: 'c4_l9', title: 'Production Guardrails, Safety Filters & Cost Optimization', duration: '45m', isCompleted: false, type: 'video' }
        ]
      },
      {
        id: 'mod_ai4',
        title: 'Module 4: Deployment & Final Capstone Project',
        duration: '2 Lessons • 6 Hours',
        lessonsCount: 2,
        lessons: [
          { id: 'c4_l10', title: 'Deploying LLM Apps on Cloud Run & FastAPI with Streaming', duration: '55m', isCompleted: false, type: 'video' },
          { id: 'c4_l11', title: 'Capstone: End-to-End Enterprise Knowledge Engine', duration: '120m', isCompleted: false, type: 'assignment' }
        ]
      }
    ]
  },
  {
    id: 'course_5',
    title: 'Agile Product Management & Growth for Emerging Markets',
    instructor: 'Farhan Qureshi',
    instructorTitle: 'Director of Product @ Careem / Uber (INSEAD MBA)',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    organization: 'Upliftra Product Leadership',
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
    category: 'Product & Business',
    level: 'Intermediate',
    duration: '6 Weeks (24 Hours)',
    modulesCount: 4,
    rating: 4.88,
    enrolledCount: 1890,
    certificateAvailable: true,
    prerequisites: ['Basic business or technology fundamentals'],
    description: 'Learn how modern product teams at Careem, Daraz, and SadaPay design user journeys, test hypotheses, prioritize features, and optimize unit economics.',
    skillsEarned: ['PRD Writing', 'Product Analytics', 'User Research', 'A/B Testing', 'Unit Economics', 'Product Roadmapping'],
    isEnrolled: false,
    progressPercentage: 0,
    completedLessonIds: [],
    modules: [
      {
        id: 'mod_pm1',
        title: 'Module 1: User Discovery & Solving Emerging Market Pains',
        duration: '3 Lessons • 5 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c5_l1', title: 'Conducting User Interviews Across Tier-1 and Tier-2 Cities', duration: '45m', isCompleted: false, type: 'video' },
          { id: 'c5_l2', title: 'Jobs-to-be-Done (JTBD) Framework & Customer Persona Mapping', duration: '50m', isCompleted: false, type: 'video' },
          { id: 'c5_l3', title: 'Writing Clear, Actionable Product Requirement Documents (PRDs)', duration: '60m', isCompleted: false, type: 'assignment' }
        ]
      },
      {
        id: 'mod_pm2',
        title: 'Module 2: Feature Prioritization & Sprint Execution',
        duration: '3 Lessons • 6 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c5_l4', title: 'RICE and MoSCoW Prioritization Frameworks in Practice', duration: '45m', isCompleted: false, type: 'video' },
          { id: 'c5_l5', title: 'Collaborating with Engineering & Design in Agile Sprints', duration: '50m', isCompleted: false, type: 'video' },
          { id: 'c5_l6', title: 'Managing Technical Debt vs. Business Deliverables', duration: '40m', isCompleted: false, type: 'reading' }
        ]
      },
      {
        id: 'mod_pm3',
        title: 'Module 3: Growth Loops, Metrics & Unit Economics',
        duration: '3 Lessons • 7 Hours',
        lessonsCount: 3,
        lessons: [
          { id: 'c5_l7', title: 'Defining North Star Metric, CAC, LTV, and Churn', duration: '55m', isCompleted: false, type: 'video' },
          { id: 'c5_l8', title: 'Designing and Analyzing A/B Tests with Statistical Rigor', duration: '60m', isCompleted: false, type: 'video' },
          { id: 'c5_l9', title: 'Cash-on-Delivery (COD) vs. Digital Wallet Conversion Funnels', duration: '45m', isCompleted: false, type: 'reading' }
        ]
      },
      {
        id: 'mod_pm4',
        title: 'Module 4: Product Case Studies & Interview Prep',
        duration: '2 Lessons • 6 Hours',
        lessonsCount: 2,
        lessons: [
          { id: 'c5_l10', title: 'Deconstructing Top Super Apps: Careem, SadaPay, Nayapay', duration: '60m', isCompleted: false, type: 'video' },
          { id: 'c5_l11', title: 'Product Sense & Execution Mock Interview Workshop', duration: '90m', isCompleted: false, type: 'assignment' }
        ]
      }
    ]
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event_1',
    title: 'Pakistan Tech Career Summit 2026: Cracking International Remote Roles',
    type: 'webinar',
    organizer: 'Upliftra Network & Tech Leaders PK',
    organizerLogo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&auto=format&fit=crop&q=80',
    dateTime: '2026-08-30T14:00:00Z',
    duration: '2 Hours',
    isOnline: true,
    locationOrPlatform: 'Upliftra Live Stage / Zoom',
    description: 'Exclusive panel discussion with Pakistani engineering directors and staff engineers working remotely for Stripe, Automattic, and Deel on resume screening, coding assessments, and USD compensation contracts.',
    speakers: [
      { name: 'Sarah Mansoor', title: 'Senior Staff Engineer @ Stripe', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
      { name: 'Bilal Khan', title: 'Lead Tech Recruiter @ Arbisoft', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
    ],
    registeredCount: 1420,
    capacity: 2000,
    isRegistered: true,
    tags: ['Remote Tech', 'Career Growth', 'Software Engineering', 'Recruitment']
  },
  {
    id: 'event_2',
    title: 'Fulbright 2027 Strategy Workshop & Live SOP Review Clinic',
    type: 'workshop',
    organizer: 'Upliftra Scholar Guild & USEFP Alumni',
    organizerLogo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80',
    dateTime: '2026-09-06T11:00:00Z',
    duration: '3 Hours',
    isOnline: true,
    locationOrPlatform: 'Upliftra Interactive Workshop Room',
    description: 'Bring your draft Personal Statements and Study Objectives! Former Fulbright selection reviewers will provide live on-screen critiques and guidance on highlighting community impact.',
    speakers: [
      { name: 'Dr. Shahbaz Alam', title: 'Fulbright Scholar @ CMU', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      { name: 'Zainab Binte Tariq', title: 'Oxford Alumna', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
    ],
    registeredCount: 890,
    capacity: 1000,
    isRegistered: false,
    tags: ['Scholarships', 'Fulbright', 'Higher Studies', 'SOP Writing']
  },
  {
    id: 'event_3',
    title: 'National Startup Pitch & Co-Founder Speed Networking',
    type: 'networking',
    organizer: 'National Incubation Center & Upliftra Ventures',
    organizerLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&auto=format&fit=crop&q=80',
    dateTime: '2026-09-12T10:00:00Z',
    duration: '4 Hours',
    isOnline: false,
    locationOrPlatform: 'NIC Islamabad Auditorium & Virtual Broadcast',
    description: 'Connect with technical co-founders, early-stage investors, and growth marketers. Over 40 pre-vetted Pakistani startup teams looking for talent and collaboration.',
    speakers: [
      { name: 'Farhan Qureshi', title: 'Director @ Careem', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
    ],
    registeredCount: 650,
    capacity: 700,
    isRegistered: false,
    tags: ['Startups', 'Co-Founders', 'Venture Capital', 'Networking']
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    authorId: 'user_student_1',
    authorName: 'Hamza Tariq',
    authorRole: 'Student @ NUST',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    authorHeadline: 'BS CS Final Year | AI Researcher',
    title: 'How I open-sourced Urdu speech datasets and prepared my FYP for international conferences',
    content: 'A few months ago, our team noticed how poorly global speech models handle localized Pakistani conversational styles. We collected 150+ hours of open public domain audio with native consent and benchmarked Whisper-v3. Here are our 4 major takeaways for Pakistani CS students wanting their Final Year Project to stand out for graduate admissions!',
    tags: ['Artificial Intelligence', 'FYP Advice', 'Research', 'NUST'],
    upvotes: 142,
    commentCount: 28,
    createdAt: '2 days ago',
    isUpvoted: true,
    comments: [
      {
        id: 'comm_1',
        authorName: 'Dr. Shahbaz Alam',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        authorRole: 'Principal AI Architect',
        content: 'Commendable initiative Hamza! Building datasets tailored for under-represented languages is exactly what top research labs look for in PhD candidates.',
        createdAt: '1 day ago',
        upvotes: 34
      }
    ]
  },
  {
    id: 'post_2',
    authorId: 'user_prof_1',
    authorName: 'Ayesha Siddiqui',
    authorRole: 'Senior PM @ Careem',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    authorHeadline: 'Senior PM @ Careem | Women in Tech Lead',
    title: 'Transitioning from Software Engineering to Product Management in Pakistan: A Practical Guide',
    content: 'Many junior developers ask me: "Do I need an MBA to break into Product Management?" The short answer is NO. What matters is commercial empathy, understanding unit economics, and leading engineers through influence rather than authority. Here is the 6-month roadmap I recommend...',
    tags: ['Product Management', 'Career Transition', 'Tech in Pakistan', 'Leadership'],
    upvotes: 218,
    commentCount: 42,
    createdAt: '4 days ago',
    isUpvoted: false,
    comments: []
  }
];

export const INITIAL_STARTUPS: StartupItem[] = [
  {
    id: 'startup_1',
    name: 'KisanConnect Technologies',
    logo: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=150&auto=format&fit=crop&q=80',
    tagline: 'Precision AgriTech for smallholder farmers across Punjab & Sindh',
    founderName: 'Zainab Akhtar & Daniyal Farooq',
    founderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    founders: [
      { name: 'Zainab Akhtar', role: 'CEO & Co-Founder (LUMS BS / Agri Operations)' },
      { name: 'Daniyal Farooq', role: 'CTO & Co-Founder (FAST-NUCES CS / Computer Vision)' }
    ],
    coFounders: ['Zainab Akhtar (CEO - LUMS)', 'Daniyal Farooq (CTO - FAST)'],
    industry: 'AgriTech & Supply Chain',
    stage: 'MVP',
    incubationPartner: 'NIC Islamabad & LUMS Center for Entrepreneurship (LCE)',
    problem: 'Pakistani farmers lose 30% of harvest value to undetected crop diseases and suffer opaque price exploitation by intermediary mandi commission agents.',
    solution: 'An offline-capable Urdu AI mobile app diagnosing crop diseases via camera under 2 seconds, paired with a transparent digital mandi auction connecting farmers straight to commercial bulk buyers.',
    teamSize: 7,
    fundingStatus: 'Pre-Seed Grant ($35k Ignite / NIC Grant)',
    isHiring: true,
    openRolesCount: 2,
    openRoles: [
      {
        id: 'role_1_1',
        title: 'Senior Mobile Engineer (React Native / Offline First)',
        type: 'Full-time',
        location: 'Lahore / Hybrid',
        compensation: 'PKR 220,000 - 320,000/mo + 1.5% Equity',
        description: 'Build fast, offline-first mobile sync pipelines for rural cellular conditions (Edge ML inference + SQLite sync).',
        skills: ['React Native', 'TypeScript', 'SQLite', 'PyTorch Mobile / ONNX']
      },
      {
        id: 'role_1_2',
        title: 'Agri Operations & Mandi Partner Lead',
        type: 'Full-time',
        location: 'Multan / Faisalabad',
        compensation: 'PKR 140,000 - 190,000/mo + Travel Allowance',
        description: 'Onboard commercial grain distributors, lead farmer awareness workshops, and coordinate mandi logistics.',
        skills: ['Field Operations', 'Bilingual (Urdu / Punjabi / Saraiki)', 'Supply Chain Logistics']
      }
    ],
    requiredSkills: ['Computer Vision (YOLOv8)', 'React Native Mobile', 'Field Operations Lead Multan'],
    collaborationRequirements: 'Looking for a Senior Mobile Engineer (Equity + Stipend) and Agricultural University researchers for cotton disease dataset expansion.',
    website: 'https://kisanconnect.pk',
    location: 'Lahore & Faisalabad, Pakistan',
    foundedYear: '2024'
  },
  {
    id: 'startup_2',
    name: 'SehatPass Health AI',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
    tagline: 'Interoperable digital health records and bilingual telemedicine for secondary cities',
    founderName: 'Dr. Bilal Qureshi & Omer Khalid',
    founderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    founders: [
      { name: 'Dr. Bilal Qureshi', role: 'Chief Medical Officer (King Edward Medical Univ / Aga Khan Fellow)' },
      { name: 'Omer Khalid', role: 'Chief Executive Officer (Ex-Careem Senior Staff Engineer)' }
    ],
    coFounders: ['Dr. Bilal Qureshi (King Edward / Aga Khan)', 'Omer Khalid (Ex-Careem Engineer)'],
    industry: 'HealthTech & AI',
    stage: 'Early Traction',
    incubationPartner: 'The Nest I/O & AKU Innovation Center',
    problem: '92% of medical prescriptions and lab diagnostics in Pakistan remain handwritten on paper slips, leading to dangerous drug-drug interactions and zero longitudinal patient history.',
    solution: 'Doctor-facing AI dictation software generating FHIR-standard electronic health records, with automated bilingual WhatsApp audio summaries for patients in Urdu, Pashto, and Sindhi.',
    teamSize: 11,
    fundingStatus: 'Seed ($120k Angel Round + Draper Associates Syndicate)',
    isHiring: true,
    openRolesCount: 2,
    openRoles: [
      {
        id: 'role_2_1',
        title: 'Backend Systems Engineer (FastAPI / PostgreSQL)',
        type: 'Full-time',
        location: 'Karachi & Remote',
        compensation: 'PKR 250,000 - 350,000/mo',
        description: 'Design HIPAA/FHIR-compliant health data microservices, end-to-end encryption layers, and real-time appointment websockets.',
        skills: ['Python / FastAPI', 'PostgreSQL', 'Redis', 'Docker / AWS', 'FHIR Health Data']
      },
      {
        id: 'role_2_2',
        title: 'Urdu NLP / Speech AI Intern',
        type: 'Internship',
        location: 'Islamabad / Remote',
        compensation: 'PKR 65,000/mo + Full-time conversion opportunity',
        description: 'Fine-tune Whisper models for Pakistani English-Urdu clinical code-switching vocabulary.',
        skills: ['Python', 'HuggingFace', 'Whisper ASR', 'PyTorch']
      }
    ],
    requiredSkills: ['FastAPI Backend', 'HL7/FHIR Health Standards', 'Urdu Voice AI'],
    collaborationRequirements: 'Seeking partnerships with tertiary hospitals and passionate junior backend interns.',
    website: 'https://sehatpass.pk',
    location: 'Karachi & Islamabad, Pakistan',
    foundedYear: '2023'
  },
  {
    id: 'startup_3',
    name: 'DukaanPay FinTech',
    logo: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=150&auto=format&fit=crop&q=80',
    tagline: 'Embedded working capital & digital ledger for 2M+ Pakistani Kiryana stores',
    founderName: 'Moiz Rauf & Hamza Alvi',
    founderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    founders: [
      { name: 'Moiz Rauf', role: 'CEO (Ex-SadaPay Growth Lead)' },
      { name: 'Hamza Alvi', role: 'VP Engineering (Ex-Finja / NUST)' }
    ],
    coFounders: ['Moiz Rauf (CEO)', 'Hamza Alvi (VP Eng)'],
    industry: 'FinTech & Embedded Banking',
    stage: 'Early Traction',
    incubationPartner: 'Y Combinator W24 Alumni Track & NIC Lahore',
    problem: 'Micro-retailers lack formal credit scores to secure bank loans, forcing them into high-interest 60% APR informal predatory borrowing for inventory restocking.',
    solution: 'Digital khata ledger providing instant micro-working-capital loans based on cash flow telemetry with Raast instant settlement and 1-click supplier payouts.',
    teamSize: 14,
    fundingStatus: 'Seed ($450k Seed Round lead by Fatima Gobi Ventures)',
    isHiring: true,
    openRolesCount: 2,
    openRoles: [
      {
        id: 'role_3_1',
        title: 'Staff Risk & Credit Scoring Data Scientist',
        type: 'Full-time',
        location: 'Lahore (Gulberg) / Hybrid',
        compensation: 'PKR 350,000 - 450,000/mo + Stock Options',
        description: 'Build predictive default risk models based on transaction velocities and telecommunication data.',
        skills: ['Python', 'XGBoost', 'Credit Risk Modeling', 'SQL', 'MLOps']
      },
      {
        id: 'role_3_2',
        title: 'Raast API & Payment Gateway Engineer',
        type: 'Full-time',
        location: 'Lahore / Remote',
        compensation: 'PKR 280,000 - 380,000/mo',
        description: 'Integrate State Bank of Pakistan Raast P2P/P2M rails with sub-second idempotency and fraud guards.',
        skills: ['Go / Golang', 'Event Sourcing (Kafka)', 'PostgreSQL', 'Banking Protocols']
      }
    ],
    requiredSkills: ['Golang', 'Credit Scoring Algorithms', 'Raast Instant Payments', 'PostgreSQL'],
    collaborationRequirements: 'Inviting FMCG distributor partners and fintech risk analysts.',
    website: 'https://dukaanpay.pk',
    location: 'Lahore & Karachi, Pakistan',
    foundedYear: '2023'
  },
  {
    id: 'startup_4',
    name: 'TaleemAI Adaptive Learning',
    logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150&auto=format&fit=crop&q=80',
    tagline: 'AI-guided matric & FSc exam tutor personalized to Federal and Punjab Boards',
    founderName: 'Ayesha Mehmood & Taimoor Hassan',
    founderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    founders: [
      { name: 'Ayesha Mehmood', role: 'CEO (LUMS Education Policy / Harvard EdM)' },
      { name: 'Taimoor Hassan', role: 'CTO (GIKI CS / Ex-Aventier)' }
    ],
    coFounders: ['Ayesha Mehmood (CEO)', 'Taimoor Hassan (CTO)'],
    industry: 'EdTech & Generative AI',
    stage: 'Early Stage',
    incubationPartner: 'Telenor Velocity & NIC Peshawar',
    problem: 'Over 5 million high school students in Pakistan cannot afford private tuition academies costing PKR 15,000+/month.',
    solution: 'A 24/7 AI tutor on WhatsApp and mobile app aligned with FBISE, BISE Lahore, and Sindh board curricula with interactive past paper step-by-step solving.',
    teamSize: 8,
    fundingStatus: 'Pre-Seed ($80k National Incubation Grant + Angel)',
    isHiring: true,
    openRolesCount: 1,
    openRoles: [
      {
        id: 'role_4_1',
        title: 'Senior Frontend Developer (Next.js / Tailwind / Canvas)',
        type: 'Full-time',
        location: 'Islamabad / Remote',
        compensation: 'PKR 180,000 - 260,000/mo',
        description: 'Build interactive student dashboards, gamified streak mechanics, and responsive math formula renderers.',
        skills: ['React / Next.js', 'Tailwind CSS', 'KaTeX / MathJax', 'TypeScript']
      }
    ],
    requiredSkills: ['Next.js', 'WhatsApp Cloud API', 'Urdu OCR / Mathematical Parsing'],
    collaborationRequirements: 'Connecting with private schools and government education departments.',
    website: 'https://taleemai.pk',
    location: 'Islamabad & Peshawar, Pakistan',
    foundedYear: '2024'
  },
  {
    id: 'startup_5',
    name: 'EcoGrid Solar PK',
    logo: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=150&auto=format&fit=crop&q=80',
    tagline: 'IoT net-metering optimization and predictive solar inverter maintenance',
    founderName: 'Engr. Haris Tariq',
    founderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    founders: [
      { name: 'Engr. Haris Tariq', role: 'Founder & CEO (UET Lahore / German Energy Fellow)' }
    ],
    coFounders: ['Engr. Haris Tariq (CEO)'],
    industry: 'CleanTech & Renewable Energy',
    stage: 'Seed',
    incubationPartner: 'NUST Technology Incubation Centre (TIC)',
    problem: 'Industrial and residential solar owners in Pakistan suffer up to 25% energy loss due to dust accumulation, uncalibrated inverters, and DISCO grid tripping.',
    solution: 'Plug-and-play IoT telemetry dongle with real-time mobile app alerting users to panel degradation, DISCO export tariffs, and battery lifecycle optimization.',
    teamSize: 9,
    fundingStatus: 'Seed ($200k Climate Tech Venture Grant)',
    isHiring: true,
    openRolesCount: 1,
    openRoles: [
      {
        id: 'role_5_1',
        title: 'Embedded Systems & IoT Firmware Engineer',
        type: 'Full-time',
        location: 'Islamabad (NUST Tech Park)',
        compensation: 'PKR 190,000 - 270,000/mo',
        description: 'Develop ESP32 / STM32 RS485 Modbus telemetry readers communicating via MQTT over 4G/GSM.',
        skills: ['C/C++', 'FreeRTOS', 'ESP-IDF', 'MQTT', 'Modbus RTU']
      }
    ],
    requiredSkills: ['Embedded C/C++', 'Modbus RS485', 'MQTT Cloud Telemetry'],
    collaborationRequirements: 'Partnering with commercial solar EPC contractors and industrial unit owners in Gujranwala, Sialkot, and Faisalabad.',
    website: 'https://ecogrid.pk',
    location: 'Islamabad & Rawalpindi, Pakistan',
    foundedYear: '2023'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'mentorship',
    title: 'Mentorship Session Confirmed!',
    description: 'Dr. Shahbaz Alam accepted your mentorship request for Aug 25 at 3:00 PM PKT.',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/dashboard/mentorship'
  },
  {
    id: 'notif_2',
    type: 'opportunity',
    title: 'New Verified Opportunity Match',
    description: 'Systems Limited posted "Associate Cloud Engineer" matching your skills (Python, Docker).',
    timestamp: '5 hours ago',
    isRead: false,
    actionUrl: '/opportunities'
  },
  {
    id: 'notif_3',
    type: 'event',
    title: 'Event Reminder: Pakistan Tech Career Summit',
    description: 'The webinar starts in 48 hours. Make sure to download the conference agenda.',
    timestamp: '1 day ago',
    isRead: true,
    actionUrl: '/events'
  }
];

export const INITIAL_MESSAGES: DirectMessage[] = [
  {
    id: 'msg_1',
    senderId: 'mentor_1',
    senderName: 'Dr. Shahbaz Alam',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    receiverId: 'user_student_1',
    content: 'Salam Hamza! I reviewed your speech transformer abstract. It looks quite solid. Let us review the university shortlisting during our session on the 25th.',
    timestamp: '10:45 AM',
    isRead: true
  },
  {
    id: 'msg_2',
    senderId: 'user_student_1',
    senderName: 'Hamza Tariq',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    receiverId: 'mentor_1',
    content: 'Walaikum Assalam Dr. Shahbaz, thank you so much! I have also uploaded my revised GRE scorecard to my profile. Looking forward to our call.',
    timestamp: '11:02 AM',
    isRead: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log_1',
    adminName: 'Zia-ur-Rehman (Admin)',
    action: 'VERIFIED_OPPORTUNITY',
    target: 'Systems Limited - Associate Cloud Engineer 2025',
    timestamp: '2026-08-18 14:32:10',
    ipAddress: '182.180.142.12 (Islamabad)',
    status: 'SUCCESS'
  },
  {
    id: 'log_2',
    adminName: 'Sara Farooq (Moderator)',
    action: 'APPROVED_MENTOR_BADGE',
    target: 'Sarah Mansoor (Senior Staff @ Stripe)',
    timestamp: '2026-08-17 11:20:44',
    ipAddress: '39.40.88.94 (Karachi)',
    status: 'SUCCESS'
  },
  {
    id: 'log_3',
    adminName: 'Syed Usman Ali Shah (Super Admin)',
    action: 'UPDATED_SECURITY_POLICY',
    target: 'Enforced Multi-Role Authorization & Rate Limiting',
    timestamp: '2026-08-16 09:15:00',
    ipAddress: '111.119.187.2 (Rawalpindi)',
    status: 'SUCCESS'
  }
];

export const INITIAL_REPORTS: ReportedItem[] = [
  {
    id: 'rep_1',
    type: 'opportunity',
    targetId: 'opp_fake_test',
    targetTitle: 'Suspicious Data Entry Job asking for registration fee',
    reportedBy: 'Muhammad Bilal (Student @ UET)',
    reason: 'Asks applicants to deposit PKR 2,000 for verification. Violates anti-scam policy.',
    timestamp: '2026-08-19 16:12:00',
    status: 'resolved'
  }
];
