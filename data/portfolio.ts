export const personalInfo = {
  name: 'Asit Prakash',
  title: 'Senior Full-Stack Engineer',
  tagline: 'Turning Complex Problems into Scalable Products',
  heroLine:
    'I architect and ship full-stack products that scale — from AI platforms to enterprise systems. Clean code, measurable impact, and a knack for leading teams across time zones.',
  location: 'Bangalore, India',
  email: 'asit.prakash@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/asitprakash/',
  github: 'https://github.com/asit-prakash',
  twitter: 'https://twitter.com/asitprksh',
  about:
    'Senior Full-stack Engineer with 6+ years of experience in architecting scalable solutions and optimizing full-stack systems. Proficient in JavaScript, TypeScript, Node.js, React, NestJS, MySQL, Redis, CI/CD, and cloud platforms. Strong in technical leadership, mentoring, and project management, ensuring efficient development and seamless collaboration across global time zones with remote, distributed teams.',
};

// ---------------------------------------------------------------------------
// Impact metrics — shown as a bold strip below the hero
// ---------------------------------------------------------------------------

export const impactMetrics = [
  { value: '6+', label: 'Years of Experience', detail: 'Full-Stack' },
  { value: '17%', label: 'Assessment Accuracy', detail: 'Boost at Turing' },
  { value: '4', label: 'Products Shipped', detail: 'End-to-End' },
  { value: '3', label: 'Countries Served', detail: 'India · US · Brazil' },
];

// ---------------------------------------------------------------------------
// Expertise pillars — the "What I Do" section
// ---------------------------------------------------------------------------

export const expertiseAreas = [
  {
    title: 'Full-Stack Architecture',
    description:
      'End-to-end systems from React frontends to NestJS microservices, with databases, caching, and message queues.',
    highlights: ['React / Next.js', 'NestJS / Node.js', 'MySQL / Redis / Kafka'],
    icon: 'layers',
  },
  {
    title: 'AI / ML Platforms',
    description:
      'Building tools that power AI model training — labeling interfaces, data pipelines, and evaluation engines at scale.',
    highlights: ['Annotation Tools', 'Data Pipelines', 'Model Evaluation'],
    icon: 'brain',
  },
  {
    title: 'Technical Leadership',
    description:
      'Mentoring engineers, driving architecture decisions, owning delivery across distributed teams in multiple time zones.',
    highlights: ['Code Reviews', 'System Design', 'Cross-Timezone Collaboration'],
    icon: 'users',
  },
];

// ---------------------------------------------------------------------------
// Experiences — grouped by company
// ---------------------------------------------------------------------------

export interface Project {
  name: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface Role {
  title: string;
  period: string;
  promoted?: boolean;
  keyMetric: string;
  projects: Project[];
}

export interface CompanyExperience {
  company: string;
  location: string;
  totalPeriod: string;
  url?: string;
  roles: Role[];
}

export const companyExperiences: CompanyExperience[] = [
  {
    company: 'Turing',
    location: 'Bangalore, India',
    totalPeriod: 'April 2022 — Present',
    url: 'https://www.turing.com/',
    roles: [
      {
        title: 'Senior Software Engineer — Full Stack',
        period: 'July 2023 — Present',
        promoted: true,
        keyMetric: 'Built AI labeling tool that automated annotation workflows at scale',
        projects: [
          {
            name: 'AI Labeling Tool',
            description:
              'Advanced AI-powered labeling tool for video & PDF annotation, streamlining AI model training data pipelines.',
            achievements: [
              'Automated repetitive annotation tasks, reducing manual effort and significantly improving speed and accuracy',
              'Enhanced PDF annotation capabilities, enabling structured data extraction for AI model training',
              'Optimized workflows so AI models train on higher-quality labeled data at scale',
              'Built a robust, scalable architecture for seamless integration and efficient large-dataset processing',
            ],
            tech: ['React', 'TypeScript', 'NestJS', 'Node.js', 'MySQL', 'BigQuery', 'Redis', 'Jest'],
          },
        ],
      },
      {
        title: 'Software Engineer — Full Stack',
        period: 'April 2022 — July 2023',
        keyMetric: 'Boosted developer assessment accuracy by 17%',
        projects: [
          {
            name: 'Vetting Engine',
            description:
              'Technical vetting portal with MCQs, coding challenges, and AI-driven assessments for developer evaluation.',
            achievements: [
              'Increased developer assessment accuracy by 17%, leading to better hiring decisions',
              'Refined challenge structures, improving signal quality and performance insights',
              'Proactively addressed bugs and pain points through real-time monitoring and alerts',
              'Strengthened portal scalability and efficiency for large-scale assessments',
            ],
            tech: ['React', 'TypeScript', 'NestJS', 'Node.js', 'MySQL', 'BigQuery', 'Redis', 'Jest'],
          },
        ],
      },
    ],
  },
  {
    company: 'Impelsys',
    location: 'Bangalore, India',
    totalPeriod: 'September 2021 — March 2022',
    url: 'https://impelsys.com/',
    roles: [
      {
        title: 'Software Engineer',
        period: 'September 2021 — March 2022',
        keyMetric: 'Shipped student management system with high stakeholder approval',
        projects: [
          {
            name: 'NCUK Enterprise',
            description:
              'Student Management System with role-based access and virtual learning platform.',
            achievements: [
              'Optimized educational workflows, enhancing user experience across the platform',
              'Built a centralized, scalable platform earning high stakeholder approval',
            ],
            tech: ['React', 'TypeScript', 'Redux Toolkit', 'React Query', 'Storybook', 'Jest'],
          },
        ],
      },
    ],
  },
  {
    company: 'Innoraft Solutions',
    location: 'Kolkata, India',
    totalPeriod: 'January 2020 — August 2021',
    url: 'https://www.innoraft.ai/',
    roles: [
      {
        title: 'Software Engineer',
        period: 'January 2020 — August 2021',
        keyMetric: 'Built broker portal serving users across Brazil',
        projects: [
          {
            name: 'Liberty Seguros Broker Portal',
            description:
              'CMS-driven broker portal with campaigns, news feeds, and personalized dashboards.',
            achievements: [
              'Improved broker efficiency and customer service through centralized resource access',
              'Personalized dashboards received positive feedback, strengthening broker relationships',
            ],
            tech: ['React', 'JavaScript', 'Drupal'],
          },
        ],
      },
    ],
  },
  {
    company: 'Freelance',
    location: 'Kolkata, India',
    totalPeriod: 'March 2018 — December 2019',
    roles: [
      {
        title: 'Web Developer',
        period: 'March 2018 — December 2019',
        keyMetric: 'Built web apps for multiple clients, honing full-stack foundations',
        projects: [],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Projects — tagline-first
// ---------------------------------------------------------------------------

export const featuredProjects = [
  {
    title: 'AI Labeling Tool',
    tagline: 'Automated annotation at scale',
    description:
      'Advanced AI-powered labeling tool for video & PDF annotation, streamlining AI model training data pipelines.',
    tech: ['React', 'TypeScript', 'NestJS', 'MySQL', 'Redis', 'BigQuery'],
    outcomes: ['Automated annotation tasks', 'Structured data extraction', 'Scalable architecture'],
  },
  {
    title: 'Vetting Engine',
    tagline: '17% accuracy improvement',
    description:
      'Technical vetting portal with MCQs, coding challenges, and AI-driven assessments for developer evaluation.',
    tech: ['React', 'TypeScript', 'NestJS', 'MySQL', 'Redis'],
    outcomes: ['17% accuracy boost', 'Real-time monitoring', 'Large-scale assessments'],
  },
  {
    title: 'NCUK Enterprise',
    tagline: 'Student management reimagined',
    description:
      'Student Management System with role-based access and virtual learning platform for global institutions.',
    tech: ['React', 'TypeScript', 'Redux Toolkit', 'React Query', 'Storybook'],
    outcomes: ['Role-based access control', 'Virtual learning', 'High stakeholder approval'],
  },
  {
    title: 'Liberty Seguros Portal',
    tagline: 'Broker efficiency, centralized',
    description:
      'CMS-driven broker portal with campaigns, news feeds, and personalized client dashboards.',
    tech: ['React', 'JavaScript', 'Drupal'],
    outcomes: ['Personalized dashboards', 'Centralized resources', 'Improved efficiency'],
  },
];

// ---------------------------------------------------------------------------
// Skills — with icon keys mapped to react-icons/si
// ---------------------------------------------------------------------------

export interface Skill {
  name: string;
  icon: string;
}

export const primarySkills: Skill[] = [
  { name: 'React', icon: 'SiReact' },
  { name: 'TypeScript', icon: 'SiTypescript' },
  { name: 'Node.js', icon: 'SiNodedotjs' },
  { name: 'NestJS', icon: 'SiNestjs' },
  { name: 'Next.js', icon: 'SiNextdotjs' },
  { name: 'MySQL', icon: 'SiMysql' },
];

export const secondarySkills: Skill[] = [
  { name: 'JavaScript', icon: 'SiJavascript' },
  { name: 'Redis', icon: 'SiRedis' },
  { name: 'Docker', icon: 'SiDocker' },
  { name: 'MongoDB', icon: 'SiMongodb' },
  { name: 'BigQuery', icon: 'SiGooglebigquery' },
  { name: 'Google Cloud', icon: 'SiGooglecloud' },
  { name: 'Firebase', icon: 'SiFirebase' },
  { name: 'Apache Kafka', icon: 'SiApachekafka' },
  { name: 'Jest', icon: 'SiJest' },
  { name: 'Storybook', icon: 'SiStorybook' },
  { name: 'Git', icon: 'SiGit' },
  { name: 'Linux', icon: 'SiLinux' },
  { name: 'Express.js', icon: 'SiExpress' },
  { name: 'React Native', icon: 'SiReact' },
  { name: 'Webpack', icon: 'SiWebpack' },
];

// ---------------------------------------------------------------------------
// Education & certifications
// ---------------------------------------------------------------------------

export const education = {
  degree: 'B.Tech in Information Technology',
  institution: 'Techno Main Salt Lake, Kolkata',
  period: '2016 — 2020',
};

export const certifications = [
  'Full Stack MERN Bootcamp',
  'IBM Blockchain Foundation for Developers',
  'IBM Blockchain Essentials',
  'Programming, Data Structures & Algorithms Using C',
];

// ---------------------------------------------------------------------------
// Recommendations
// ---------------------------------------------------------------------------

export interface Recommendation {
  name: string;
  title: string;
  relationship: string;
  date: string;
  text: string;
  linkedinUrl: string;
  image: string;
}

export const recommendations: Recommendation[] = [
  {
    name: 'Edward Chen',
    title: 'Staff AI Product Manager @ Turing | Ex-Amazon | Columbia MBA',
    relationship: 'Edward was senior to Asit but didn\'t manage Asit directly',
    date: 'February 24, 2026',
    text: 'Asit is a strong senior engineer with clear leadership capability. He has done an excellent job owning complex, ambiguous technical areas and consistently navigates uncertainty with confidence and sound judgment. I\'m particularly impressed by his willingness to engage directly with customers, stepping into conversations to accelerate problem solving and build trust with stakeholders.\n\nHe brings a calm, thoughtful approach to challenging problems and is someone the team can rely on when direction is not fully defined. As he continues to grow his product sense alongside his technical leadership, his impact will only expand further. Any team would benefit from his ownership mindset and steady execution.',
    linkedinUrl: 'https://www.linkedin.com/in/edward-z-chen',
    image:
      'https://media.licdn.com/dms/image/v2/D4E03AQFFvHMu_1NHnA/profile-displayphoto-shrink_100_100/B4EZRRHNFPGwAY-/0/1736527630988?e=1776297600&v=beta&t=BzJwsgQl4pqNEf77R8RW6vzUJa6ZDJ73Mbw39cb_SMM',
  },
  {
    name: 'Lav Shah',
    title: 'Technical Lead | Building Scalable Full-Stack Systems & AI Automations | web3 | React, Node, Next.js, Python | n8n, Make | OpenAI, Claude',
    relationship: 'Lav worked with Asit on the same team',
    date: 'December 24, 2025',
    text: 'I had the opportunity to work closely with Asit on multiple projects, and he consistently proved himself to be a solid and dependable developer. He has a strong grasp of fundamentals and approaches his work with a genuine willingness to learn and grow\u2014something that really sets him apart.\n\nAsit adapts quickly to change and takes on new requirements or shifting priorities with a positive attitude. Whether it\'s learning a new tool, new technology, adjusting to evolving project needs, or stepping into unfamiliar areas, he handles it with confidence and commitment. He\'s reliable, easy to work with, and always focused on delivering what the team needs.\n\nAny team looking for a developer who is flexible, growth-oriented, and dependable would be fortunate to have Asit.',
    linkedinUrl: 'https://www.linkedin.com/in/lav-shah',
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQHUHed7_emVJA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1677692137756?e=1776297600&v=beta&t=tepoBVqvnAdZSVP9c8Z8VW1cCAgtDVEGOJoj8q5SP3E',
  },
  {
    name: 'Nishi Dalal',
    title: 'Senior Software Engineer',
    relationship: 'Nishi worked with Asit on the same team',
    date: 'August 21, 2025',
    text: 'I\'ve had the pleasure of working with Asit at Impelsys Private Ltd, and I\'m continually impressed by his dedication, technical expertise, and positive attitude. He not only consistently delivers exceptional work, but also brings out the best in those around him. I have learned a lot from him. Asit is a true team player-always willing to help, tackle challenges, and support the goals of the group. I highly recommend him to any organization looking for someone who is reliable, driven, and a genuine asset to the team.',
    linkedinUrl: 'https://www.linkedin.com/in/nishi-dalal',
    image:
      'https://media.licdn.com/dms/image/v2/D5635AQGXW0U7XhrOLA/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1660002772504?e=1775595600&v=beta&t=boo8vcy3Biegr9nt375PTau2HZg1xY5sPchdXWsTOJg',
  },
  {
    name: 'Anuj Jain',
    title: 'Sr. Manager | RL GyM | SWE | Product Delivery Expert',
    relationship: 'Anuj managed Asit directly',
    date: 'July 16, 2025',
    text: 'I had the pleasure of working with Asit, and he is a reliable and proactive developer. He takes complete ownership of his tasks, understands requirements thoroughly, and always delivers with quality. His collaborative mindset and dedication to team goals make him a valuable asset. Asit consistently contributed to our success, and I truly enjoyed working with him.',
    linkedinUrl: 'https://www.linkedin.com/in/anuj-jain-03572477',
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQHTJou8gGrW4A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1678494872285?e=1776297600&v=beta&t=eaMShaj04C2bsd-SHH069_C4cvKUlWcjeqU3boNQ7PA',
  },
  {
    name: 'Onassis Osunwa',
    title: 'Software Engineer, at Turing.com',
    relationship: 'Onassis worked with Asit on the same team',
    date: 'July 14, 2025',
    text: 'I am happy to write this recommendation for Asit, who has been my coworker for the last three years. During that time, he has proven to be a reliable and innovative engineer with a knack for paying attention to details. In addition, he is very easy to work with and communicative. I would recommend him for any position that requires initiative and strong work ethic.',
    linkedinUrl: 'https://www.linkedin.com/in/onassis-osunwa',
    image:
      'https://media.licdn.com/dms/image/v2/C4D03AQGeAJ_Nz63vig/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1549345291811?e=1776297600&v=beta&t=9mBERe5xAo-NCPAscficZ2wdmx3SsxBb3qGfwEQINlY',
  },
];

export const recommendationsLink =
  'https://www.linkedin.com/in/asitprakash/details/recommendations/?detailScreenTabIndex=0';

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const navLinks = [
  { name: 'Impact', href: '#impact' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Work', href: '#work' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Recommendations', href: '#recommendations' },
  { name: 'Contact', href: '#contact' },
];

// ---------------------------------------------------------------------------
// Backward-compatible exports for chatEngine.ts
// ---------------------------------------------------------------------------

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  projects: Project[];
}

export const experiences: Experience[] = companyExperiences.flatMap((co) =>
  co.roles.map((role) => ({
    title: role.title,
    company: co.company,
    period: role.period,
    location: co.location,
    projects: role.projects,
  }))
);

export const skillCategories = [
  { name: 'Core Stack', skills: primarySkills.map((s) => s.name) },
  { name: 'Also Work With', skills: secondarySkills.map((s) => s.name) },
];
