import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] Starting database seed...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 15 Role Preset Accounts
  const users = [
    {
      id: 'user_student_1',
      name: 'Hamza Tariq',
      email: 'hamza.tariq@nust.edu.pk',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      headline: 'BS Computer Science Final Year @ NUST Islamabad | Aspiring AI Engineer',
      location: 'Islamabad, Pakistan',
      universityName: 'National University of Sciences and Technology (NUST)',
      degree: 'BS Computer Science',
      skills: JSON.stringify(['Python', 'PyTorch', 'React', 'TypeScript', 'Docker', 'FastAPI', 'Data Structures', 'SQL']),
      isVerified: true,
      profileCompletion: 85,
      bio: 'Passionate about deep learning, full-stack development, and open source. Looking for cloud mentorship and global scholarship opportunities.'
    },
    {
      id: 'user_prof_1',
      name: 'Ayesha Siddiqui',
      email: 'ayesha.siddiqui@techcorp.com',
      role: 'professional',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      headline: 'Senior Product Manager @ Careem | Ex-Daraz | Tech Ecosystem Advocate',
      location: 'Karachi, Pakistan',
      companyName: 'Careem',
      skills: JSON.stringify(['Product Strategy', 'Growth Marketing', 'Agile Product Management', 'SQL & Product Analytics']),
      isVerified: true,
      profileCompletion: 95,
      bio: 'Leading marketplace growth and customer retention products. 6+ years driving cross-functional tech teams across Pakistan and MENA.'
    },
    {
      id: 'user_mentor_1',
      name: 'Dr. Shahbaz Alam',
      email: 'shahbaz.alam@fulbrightalumni.org',
      role: 'mentor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      headline: 'Principal AI Architect @ 10Pearls | Fulbright Scholar @ CMU',
      location: 'Lahore, Pakistan',
      companyName: '10Pearls',
      skills: JSON.stringify(['Distributed Systems', 'LLM Fine-Tuning', 'Career Strategy', 'System Design']),
      isVerified: true,
      profileCompletion: 100,
      bio: '12+ years in Artificial Intelligence & Distributed Systems. Mentored 150+ students for Fulbright, Erasmus Mundus, and FAANG tech careers.'
    },
    {
      id: 'user_recruiter_1',
      name: 'Bilal Khan',
      email: 'bilal.k@arbisoft.com',
      role: 'recruiter',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      headline: 'Talent Acquisition Lead @ Arbisoft | Tech Hiring in Pakistan',
      location: 'Lahore, Pakistan',
      companyName: 'Arbisoft',
      skills: JSON.stringify(['Technical Recruiting', 'Employer Branding', 'Talent Pipeline', 'Screening']),
      isVerified: true,
      profileCompletion: 90,
      bio: 'Hiring top 1% engineering and product talent for enterprise solutions.'
    },
    {
      id: 'user_company_1',
      name: 'Systems Limited Enterprise Talent',
      email: 'talent@systemsltd.com',
      role: 'company',
      avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
      headline: 'Global Technology Innovator & Forbes Asia Top 200 Enterprise',
      location: 'Lahore, Karachi, Islamabad, Pakistan',
      companyName: 'Systems Limited',
      skills: JSON.stringify(['Cloud Engineering', 'Enterprise Software', 'Data & AI', 'Fintech']),
      isVerified: true,
      profileCompletion: 100,
      bio: 'Premier digital transformation company operating across Pakistan, US, Europe, and the Middle East.'
    },
    {
      id: 'user_startup_1',
      name: 'Taimur Ali (Founder)',
      email: 'taimur@retailpe.pk',
      role: 'startup',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80',
      headline: 'Founder & CEO @ RetailPe | Y-Combinator Applicant | B2B Commerce',
      location: 'Lahore, Pakistan',
      companyName: 'RetailPe Technologies',
      skills: JSON.stringify(['Venture Strategy', 'B2B Commerce', 'Seed Fundraising', 'Product Led Growth']),
      isVerified: true,
      profileCompletion: 95,
      bio: 'Digitizing Pakistan’s $150B retail khata and supply chain network.'
    },
    {
      id: 'user_uni_1',
      name: 'NUST Career Placement Directorate',
      email: 'placements@nust.edu.pk',
      role: 'university',
      avatar: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&auto=format&fit=crop&q=80',
      headline: 'Office of Career Services & Corporate Partnerships @ NUST',
      location: 'Islamabad, Pakistan',
      universityName: 'National University of Sciences and Technology (NUST)',
      skills: JSON.stringify(['Campus Recruitment', 'Alumni Relations', 'MOU Partnerships', 'Internship Management']),
      isVerified: true,
      profileCompletion: 100,
      bio: 'Ranked #1 Engineering & Technology institution in Pakistan.'
    },
    {
      id: 'user_admin_1',
      name: 'Upliftra Core Administrator',
      email: 'admin@upliftra.pk',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
      headline: 'Platform Operations & System Architecture Lead',
      location: 'Islamabad, Pakistan',
      skills: JSON.stringify(['Ecosystem Operations', 'Verification Governance', 'Security Audit']),
      isVerified: true,
      profileCompletion: 100,
      bio: 'Ensuring trust, transparency, and data integrity across the nationwide network.'
    },
    {
      id: 'user_superadmin_1',
      name: 'Syed Usman Ali Shah',
      email: 'usmanalishah.bmj@gmail.com',
      role: 'super_admin',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&auto=format&fit=crop&q=80',
      headline: 'Founder & Chief Architect @ Upliftra Network | Pakistan Career Ecosystem',
      location: 'Pakistan',
      skills: JSON.stringify(['Executive Leadership', 'Ecosystem Strategy', 'Full-Stack Architecture']),
      isVerified: true,
      profileCompletion: 100,
      bio: 'Leading the mission to unify Pakistan’s career, mentorship, and opportunity ecosystem.'
    }
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { ...u, passwordHash },
      create: { ...u, passwordHash }
    });
  }

  // Opportunities
  const opportunities = [
    {
      id: 'opp_1',
      title: 'Associate Cloud Engineer (Graduate Trainee 2025)',
      organization: 'Systems Limited',
      organizationLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
      category: 'job',
      type: 'full_time',
      location: 'Lahore / Karachi / Islamabad',
      city: 'Lahore',
      isRemote: false,
      deadline: '2026-09-30',
      salaryOrStipend: 'PKR 120,000 - 150,000 / month + Benefits',
      description: 'Systems Limited is seeking high-potential fresh engineering and computing graduates for its intensive Cloud Engineering Associate Trainee Program.',
      requirements: JSON.stringify(['BS in Computer Science / SE / EE', 'Strong problem solving skills', 'Basic cloud & Linux understanding']),
      responsibilities: JSON.stringify(['Implement CI/CD pipelines', 'Deploy microservices to AWS/Azure', 'Automate cloud provisioning']),
      requiredSkills: JSON.stringify(['Linux', 'Python', 'AWS or Azure Basics', 'Git', 'Docker']),
      applyUrl: 'https://careers.systemsltd.com',
      verificationStatus: 'verified',
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
      type: 'fellowship',
      location: 'United States (Nationwide Universities)',
      city: 'Islamabad',
      isRemote: true,
      deadline: '2026-10-15',
      salaryOrStipend: '100% Fully Funded (Tuition, Stipend, Airfare, Health)',
      description: 'Prestigious fully funded scholarship covering tuition, textbooks, airfare, a living stipend, and health insurance for Master’s or PhD degree programs in the United States.',
      requirements: JSON.stringify(['16 years formal education for Masters', 'Strong academic track record', 'GRE General Test']),
      responsibilities: JSON.stringify(['Complete degree program with high academic standing', 'Represent Pakistani culture']),
      requiredSkills: JSON.stringify(['Academic Excellence', 'Leadership Potential', 'Statement of Purpose', 'Research Proposal']),
      applyUrl: 'https://usefp.org/fulbright-program',
      verificationStatus: 'verified',
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
      type: 'internship',
      location: 'Islamabad / Hybrid',
      city: 'Islamabad',
      isRemote: true,
      deadline: '2026-09-20',
      salaryOrStipend: 'PKR 60,000 / month Stipend',
      description: 'Work alongside world-class engineers building seamless digital banking rails for Pakistan.',
      requirements: JSON.stringify(['3rd/4th year undergraduate CS student', 'Sound grasp of OOP and data structures', 'Curiosity for FinTech']),
      responsibilities: JSON.stringify(['Write unit and integration tests', 'Contribute to backend microservices', 'Participate in agile sprints']),
      requiredSkills: JSON.stringify(['Go', 'Kotlin', 'PostgreSQL', 'Docker', 'REST APIs']),
      applyUrl: 'https://careers.sadapay.pk',
      verificationStatus: 'verified',
      views: 2950,
      applicantCount: 412,
      isFeatured: true
    },
    {
      id: 'opp_4',
      title: 'Chevening Postgraduate Scholarship Award (UK)',
      organization: 'Foreign, Commonwealth & Development Office (UK)',
      organizationLogo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80',
      category: 'scholarship',
      type: 'fellowship',
      location: 'United Kingdom (Any UK Accredited University)',
      city: 'Nationwide',
      isRemote: false,
      deadline: '2026-11-05',
      salaryOrStipend: '100% Fully Funded (Tuition, Stipend, Flights, Visa)',
      description: 'Full UK government scholarship for 1-year master’s degree in the UK for individuals with demonstrable leadership potential and 2+ years work experience.',
      requirements: JSON.stringify(['Undergraduate degree', 'At least 2 years work experience', 'Return to Pakistan for 2 years']),
      responsibilities: JSON.stringify(['Complete 1-year master course', 'Participate in Chevening scholar events']),
      requiredSkills: JSON.stringify(['Leadership', 'Networking', 'Career Impact Plan', 'Academic Reference']),
      applyUrl: 'https://www.chevening.org/scholarship/pakistan/',
      verificationStatus: 'verified',
      views: 3820,
      applicantCount: 540,
      isFeatured: true
    }
  ];

  for (const o of opportunities) {
    await prisma.opportunity.upsert({
      where: { id: o.id },
      update: o,
      create: o
    });
  }

  // Mentors
  const mentors = [
    {
      id: 'mentor_1',
      name: 'Dr. Shahbaz Alam',
      email: 'shahbaz.alam@fulbrightalumni.org',
      title: 'Principal AI Architect @ 10Pearls | Fulbright Scholar @ CMU',
      company: '10Pearls',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      expertise: JSON.stringify(['AI / Machine Learning', 'Cloud Architecture', 'Fulbright & Graduate Admissions', 'Tech Leadership']),
      skills: JSON.stringify(['Distributed Systems', 'LLM Fine-Tuning', 'System Design', 'Academic Publishing']),
      industry: 'Artificial Intelligence & Enterprise Cloud',
      experienceYears: 12,
      education: 'PhD in Machine Learning (CMU) | MS CS (LUMS)',
      mentoringTopics: JSON.stringify(['MS/PhD Scholarship Applications', 'Career Transition into AI', 'System Design Interviews', 'Startup Tech Architecture']),
      availability: 'Open for Mentees',
      preferredMenteeType: 'Students & Early Professionals seeking deep tech and scholarship guidance',
      languages: JSON.stringify(['English', 'Urdu', 'Punjabi']),
      sessionPreferences: JSON.stringify(['1-on-1 Video Calls', 'Resume & Statement of Purpose Review', 'Mock Technical Interviews']),
      bio: '12+ years in Artificial Intelligence & Distributed Systems. Mentored 150+ students for Fulbright, Erasmus Mundus, and FAANG tech careers.',
      rating: 4.96,
      reviewCount: 84,
      totalMenteesHelped: 156,
      isVerified: true,
      location: 'Lahore, Pakistan'
    },
    {
      id: 'mentor_2',
      name: 'Maha Hashmi',
      email: 'maha.hashmi@stripe.com',
      title: 'Staff Software Engineer @ Stripe | Ex-Careem Staff Engineer',
      company: 'Stripe (Remote Global)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      expertise: JSON.stringify(['Global Remote Careers', 'Distributed Systems', 'FinTech Architecture', 'Negotiating US Salaries']),
      skills: JSON.stringify(['Go', 'Ruby', 'Kafka', 'High-Availability Systems', 'System Design']),
      industry: 'Financial Technology & Global Remote Work',
      experienceYears: 9,
      education: 'BS Computer Science (FAST-NUCES Karachi)',
      mentoringTopics: JSON.stringify(['Breaking into High-Paying USD Remote Engineering Roles', 'Coding & System Design Interview Preparation', 'Women in Tech Leadership']),
      availability: 'Open for Mentees',
      preferredMenteeType: 'Mid-level & Senior developers aiming for US/EU remote salaries',
      languages: JSON.stringify(['English', 'Urdu']),
      sessionPreferences: JSON.stringify(['1-on-1 Video Session', 'System Design Mock', 'Resume Review']),
      bio: 'From FAST Karachi to leading payment infrastructure at Stripe. I teach practical strategies to pass international remote interviews and negotiate top compensation.',
      rating: 4.98,
      reviewCount: 62,
      totalMenteesHelped: 98,
      isVerified: true,
      location: 'Karachi, Pakistan'
    }
  ];

  for (const m of mentors) {
    await prisma.mentorProfile.upsert({
      where: { id: m.id },
      update: m,
      create: m
    });
  }

  // Courses
  const courses = [
    {
      id: 'course_1',
      title: 'Full-Stack Modern Web & Cloud Architecture (React 19, TypeScript, Node, Docker)',
      category: 'Software Engineering',
      level: 'Intermediate to Advanced',
      duration: '8 Weeks (Self-paced + Live Clinics)',
      instructor: 'Maha Hashmi',
      instructorTitle: 'Staff Software Engineer @ Stripe',
      organization: 'Upliftra Tech Academy',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      description: 'Master full-stack modern architecture used by tier-1 global tech companies. Build distributed microservices, CI/CD pipelines, and high-performance frontend interfaces.',
      rating: 4.95,
      enrolledCount: 1420,
      skillsEarned: JSON.stringify(['React 19', 'TypeScript', 'Node.js', 'Docker', 'PostgreSQL', 'Microservices']),
      modules: JSON.stringify([
        { id: 'mod_1', title: 'Modern React 19 & High Performance State Architecture', lessons: ['Server Actions vs Client State', 'Concurrent Mode & Transitions'] },
        { id: 'mod_2', title: 'Enterprise Backend Engineering & Scalable APIs', lessons: ['RESTful Design Principles', 'Database Indexing & Prisma ORM'] }
      ])
    },
    {
      id: 'course_2',
      title: 'Fulbright & International Scholarship SOP Mastery',
      category: 'Higher Education & Scholarships',
      level: 'All Academic Levels',
      duration: '4 Weeks Intensive Workshop',
      instructor: 'Dr. Shahbaz Alam',
      instructorTitle: 'Fulbright Scholar (CMU) & 10Pearls Architect',
      organization: 'Upliftra Global Scholars Fellowship',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
      description: 'Deconstruct award-winning Statements of Purpose for Fulbright, Chevening, DAAD, and Erasmus Mundus. Learn structured storytelling, impact framing, and faculty outreach.',
      rating: 4.98,
      enrolledCount: 2180,
      skillsEarned: JSON.stringify(['Academic Writing', 'Statement of Purpose', 'Research Proposal', 'Interview Readiness']),
      modules: JSON.stringify([
        { id: 'mod_1', title: 'The Anatomy of a Winning Statement of Purpose', lessons: ['Core Narrative Archetypes', 'Addressing Gaps & Setbacks'] },
        { id: 'mod_2', title: 'Securing High-Impact Letters of Recommendation', lessons: ['Drafting Reference Packages', 'Academic vs Professional Referees'] }
      ])
    }
  ];

  for (const c of courses) {
    await prisma.course.upsert({
      where: { id: c.id },
      update: c,
      create: c
    });
  }

  // Events
  const events = [
    {
      id: 'event_1',
      title: 'National Tech Career & Mentorship Summit 2026',
      category: 'Flagship Conference',
      format: 'hybrid',
      date: 'October 25, 2026',
      time: '10:00 AM - 6:00 PM PKT',
      location: 'Pak-China Friendship Centre, Islamabad & Live Streamed',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
      description: 'Pakistan’s largest annual gathering of tech founders, Silicon Valley diaspora mentors, university rectors, and 2,000+ ambitious students and engineers.',
      registeredCount: 1840,
      organizer: 'Upliftra Network Executive Committee'
    },
    {
      id: 'event_2',
      title: 'Fulbright 2027 Masterclass: Live SOP Teardown & Review',
      category: 'Scholarship Clinic',
      format: 'virtual',
      date: 'September 28, 2026',
      time: '7:00 PM - 9:30 PM PKT',
      location: 'Virtual Broadcast via Google Meet',
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
      description: 'Watch live statement of purpose evaluations conducted by 3 CMU & Oxford Fulbright alumni.',
      registeredCount: 890,
      organizer: 'Upliftra Global Scholars Fellowship'
    }
  ];

  for (const ev of events) {
    await prisma.eventItem.upsert({
      where: { id: ev.id },
      update: ev,
      create: ev
    });
  }

  // Startups
  const startups = [
    {
      id: 'startup_1',
      name: 'RetailPe Technologies',
      logo: 'https://images.unsplash.com/photo-1556742049-0a67e557224f?w=100&auto=format&fit=crop&q=80',
      tagline: 'Digitizing Pakistan’s $150B informal retail and khata ecosystem',
      description: 'Building mobile-first POS, credit assessment, and inventory management for micro-merchants across secondary cities in Punjab and Sindh.',
      industry: 'FinTech & B2B Commerce',
      stage: 'Pre-Seed ($250k Raised)',
      founderName: 'Taimur Ali',
      founderRole: 'Co-Founder & CEO',
      website: 'https://retailpe.pk',
      location: 'Lahore, Pakistan',
      isHiring: true,
      openRoles: JSON.stringify([
        { id: 'role_1', title: 'Lead Flutter Developer', type: 'Full-time', equity: '1.0% - 2.5%' },
        { id: 'role_2', title: 'Growth Operations Specialist', type: 'Full-time', equity: '0.5%' }
      ])
    }
  ];

  for (const s of startups) {
    await prisma.startup.upsert({
      where: { id: s.id },
      update: s,
      create: s
    });
  }

  // Community Posts
  const post = await prisma.post.upsert({
    where: { id: 'post_1' },
    update: {},
    create: {
      id: 'post_1',
      title: 'How I secured the Fulbright Scholarship from a non-elite university (Tips & Rubrics)',
      content: 'I graduated from a regional university in Multan with a 3.6 CGPA. Many students believe Fulbright is reserved exclusively for LUMS or NUST graduates. Here is how I structured my essays, leadership narrative, and GRE prep...',
      authorId: 'user_mentor_1',
      authorName: 'Dr. Shahbaz Alam',
      authorRole: 'Fulbright CMU Alum',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      tags: JSON.stringify(['Fulbright', 'Scholarships', 'HigherStudies', 'SOPGuide']),
      upvotes: 245
    }
  });

  await prisma.comment.create({
    data: {
      postId: post.id,
      authorId: 'user_student_1',
      authorName: 'Hamza Tariq',
      authorRole: 'Student @ NUST',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      content: 'Extremely helpful breakdown sir! Did you reach out to professors before submitting your application?'
    }
  }).catch(() => {});

  console.log('[Seed] Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('[Seed Error]', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
