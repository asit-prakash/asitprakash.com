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
  { value: '1', label: 'Promotion', detail: 'SWE → Senior SWE' },
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
  roles: Role[];
}

export const companyExperiences: CompanyExperience[] = [
  {
    company: 'Turing',
    location: 'Bangalore, India',
    totalPeriod: 'April 2022 — Present',
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
// Navigation
// ---------------------------------------------------------------------------

export const navLinks = [
  { name: 'Impact', href: '#impact' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Work', href: '#work' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
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
