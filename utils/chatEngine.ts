import {
  personalInfo,
  experiences,
  skillCategories,
  featuredProjects,
  education,
  certifications,
} from '../data/portfolio';

export interface ChatResponse {
  text: string;
  suggestions: string[];
}

// ---------------------------------------------------------------------------
// Data lookups
// ---------------------------------------------------------------------------

const allSkills = skillCategories.flatMap((c) => c.skills);

const companyLookup: Record<string, string> = {
  turing: 'Turing',
  'turing.com': 'Turing',
  impelsys: 'Impelsys',
  innoraft: 'Innoraft Solutions',
  'innoraft solutions': 'Innoraft Solutions',
  liberty: 'Innoraft Solutions',
  'liberty seguros': 'Innoraft Solutions',
};

const projectLookup: Record<string, string> = {
  'ai labeling': 'AI Labeling Tool',
  'labeling tool': 'AI Labeling Tool',
  'ai label': 'AI Labeling Tool',
  labeling: 'AI Labeling Tool',
  annotation: 'AI Labeling Tool',
  'video annotation': 'AI Labeling Tool',
  'pdf annotation': 'AI Labeling Tool',
  vetting: 'Vetting Engine',
  'vetting engine': 'Vetting Engine',
  assessment: 'Vetting Engine',
  'coding challenge': 'Vetting Engine',
  ncuk: 'NCUK Enterprise',
  'ncuk enterprise': 'NCUK Enterprise',
  'student management': 'NCUK Enterprise',
  'virtual learning': 'NCUK Enterprise',
  'broker portal': 'Liberty Seguros Broker Portal',
  'liberty portal': 'Liberty Seguros Broker Portal',
  seguros: 'Liberty Seguros Broker Portal',
};

const skillAliases: Record<string, string> = {
  js: 'JavaScript', javascript: 'JavaScript',
  ts: 'TypeScript', typescript: 'TypeScript',
  node: 'Node.js', nodejs: 'Node.js', 'node js': 'Node.js',
  nest: 'NestJS', nestjs: 'NestJS', 'nest js': 'NestJS',
  react: 'React.js', reactjs: 'React.js', 'react js': 'React.js',
  'react native': 'React Native', reactnative: 'React Native',
  next: 'Next.js', nextjs: 'Next.js', 'next js': 'Next.js',
  express: 'Express.js', expressjs: 'Express.js',
  mongo: 'MongoDB', mongodb: 'MongoDB',
  mysql: 'MySQL', sql: 'MySQL',
  redis: 'Redis',
  firebase: 'Firebase Realtime DB',
  bigquery: 'BigQuery', bq: 'BigQuery',
  docker: 'Docker',
  gcp: 'Google Cloud Platform', 'google cloud': 'Google Cloud Platform',
  kafka: 'Apache Kafka',
  jest: 'Jest',
  storybook: 'Storybook',
  webpack: 'Webpack',
  git: 'Git',
  linux: 'Linux/Unix', unix: 'Linux/Unix', bash: 'Bash',
  copilot: 'GitHub Copilot', 'github copilot': 'GitHub Copilot',
  openai: 'OpenAI APIs', 'open ai': 'OpenAI APIs',
  claude: 'Claude',
  cursor: 'Cursor',
};

// ---------------------------------------------------------------------------
// Stop words — stripped before topic intent scoring
// ---------------------------------------------------------------------------

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'must',
  'i', 'me', 'my', 'we', 'our', 'you', 'your',
  'he', 'him', 'his', 'she', 'her', 'it', 'its', 'they', 'them', 'their',
  'this', 'that', 'these', 'those',
  'what', 'which', 'who', 'whom', 'where', 'when', 'why', 'how',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as',
  'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'and', 'but', 'or', 'so', 'if', 'then', 'than',
  'not', 'no', 'nor', 'just', 'also', 'very', 'really', 'quite',
  'about', 'up', 'out', 'some', 'any', 'all', 'each', 'every',
  'tell', 'please', 'know', 'like', 'want', 'need', 'give',
  'much', 'many', 'more', 'most', 'other', 'another', 'such',
  'lies', 'lie', 'go', 'goes', 'going', 'come', 'came', 'get', 'got',
  'say', 'said', 'think', 'thought', 'make', 'makes', 'made',
  'asit', 'prakash', 'asits', 'guy', 'person', 'man', 'dude',
]);

// ---------------------------------------------------------------------------
// Normalize & helpers
// ---------------------------------------------------------------------------

function normalize(input: string): string {
  return input.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function removeStopWords(text: string): string[] {
  return text.split(' ').filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

function fuzzyMatch(input: string, candidates: string[], threshold = 2): string | null {
  for (const c of candidates) {
    if (input.includes(c)) return c;
  }
  const words = input.split(' ');
  for (const word of words) {
    if (word.length < 4) continue;
    for (const c of candidates) {
      if (c.length < 4) continue;
      if (levenshtein(word, c) <= threshold) return c;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// PHASE 1 — Entity detection (companies, projects, skills)
// ---------------------------------------------------------------------------

interface Entities {
  company: string | null;
  project: string | null;
  skill: string | null;
}

function detectEntities(normalized: string): Entities {
  let company: string | null = null;
  let project: string | null = null;
  let skill: string | null = null;

  // Check multi-word keys first (longer = more specific)
  const sortedCompanyKeys = Object.keys(companyLookup).sort((a, b) => b.length - a.length);
  for (const key of sortedCompanyKeys) {
    if (normalized.includes(key)) { company = companyLookup[key]; break; }
  }
  if (!company) {
    const fuzzyCompany = fuzzyMatch(normalized, Object.keys(companyLookup));
    if (fuzzyCompany) company = companyLookup[fuzzyCompany];
  }

  const sortedProjectKeys = Object.keys(projectLookup).sort((a, b) => b.length - a.length);
  for (const key of sortedProjectKeys) {
    if (normalized.includes(key)) { project = projectLookup[key]; break; }
  }

  for (const s of allSkills) {
    if (normalized.includes(s.toLowerCase())) { skill = s; break; }
  }
  if (!skill) {
    const sortedAliases = Object.keys(skillAliases).sort((a, b) => b.length - a.length);
    for (const alias of sortedAliases) {
      const words = normalized.split(' ');
      if (alias.includes(' ') ? normalized.includes(alias) : words.includes(alias)) {
        skill = skillAliases[alias]; break;
      }
    }
  }

  return { company, project, skill };
}

// ---------------------------------------------------------------------------
// Entity‑based responses
// ---------------------------------------------------------------------------

function companyResponse(companyName: string, normalized: string): ChatResponse {
  const roles = experiences.filter(
    (e) => e.company.toLowerCase() === companyName.toLowerCase(),
  );
  if (roles.length === 0) {
    const role = experiences.find((e) =>
      e.company.toLowerCase().includes(companyName.toLowerCase().split(' ')[0]),
    );
    if (role) return singleRoleResponse(role);
  }

  if (companyName === 'Turing' && roles.length > 1) {
    const details = roles
      .map((r) => {
        const projs = r.projects
          .map((p) => `  - ${p.name}: ${p.description}`)
          .join('\n');
        return `${r.title} (${r.period})\n${projs}`;
      })
      .join('\n\n');
    return {
      text: `Asit has been at Turing since April 2022, promoted from Software Engineer to Senior Software Engineer:\n\n${details}`,
      suggestions: ['AI Labeling Tool details?', 'Vetting Engine details?', 'His skills?'],
    };
  }

  if (roles.length === 1) return singleRoleResponse(roles[0]);

  return {
    text: `Asit worked at ${companyName}. Ask me for more details!`,
    suggestions: ['His experience?', 'Projects?', 'Skills?'],
  };
}

function singleRoleResponse(role: (typeof experiences)[0]): ChatResponse {
  const projectDetails = role.projects
    .map((p) => {
      const ach = p.achievements.map((a) => `  • ${a}`).join('\n');
      return `${p.name}: ${p.description}\n${ach}\n  Tech: ${p.tech.join(', ')}`;
    })
    .join('\n\n');

  return {
    text: `At ${role.company} (${role.period}), Asit worked as ${role.title}.\n\n${projectDetails || 'He built web applications for various clients, honing his full-stack skills.'}`,
    suggestions: ['Other companies?', 'His skills?', 'Contact Asit'],
  };
}

function projectResponse(projectTitle: string): ChatResponse {
  const project = featuredProjects.find((p) => p.title === projectTitle);
  if (!project) return topicResponses.projects();
  return {
    text: `${project.title}: ${project.description}\n\nKey outcomes: ${project.outcomes.join(', ')}.\n\nTech: ${project.tech.join(', ')}`,
    suggestions: ['Other projects?', 'Current role?', 'Contact Asit'],
  };
}

function skillResponse(skillName: string): ChatResponse {
  const category = skillCategories.find((c) =>
    c.skills.some((s) => s.toLowerCase() === skillName.toLowerCase()),
  );
  const relatedProjects = featuredProjects
    .filter((p) => p.tech.some((t) => t.toLowerCase() === skillName.toLowerCase()))
    .map((p) => p.title);

  let text = `Yes, ${skillName} is part of Asit's toolkit${category ? ` (${category.name})` : ''}. He has hands-on production experience with it.`;
  if (relatedProjects.length > 0) {
    text += `\n\nProjects using ${skillName}: ${relatedProjects.join(', ')}.`;
  }
  return {
    text,
    suggestions: ['All skills?', 'His projects?', 'Contact Asit'],
  };
}

// ---------------------------------------------------------------------------
// PHASE 2 — Topic intent matching (keyword scoring with stop-word removal)
// ---------------------------------------------------------------------------

interface TopicDef {
  keywords: string[];
  respond: () => ChatResponse;
}

const topicResponses = {
  greeting: (): ChatResponse => ({
    text: `Hey there! I'm Asit's portfolio assistant. Ask me anything about his experience, skills, projects, or how to get in touch. What would you like to know?`,
    suggestions: ['What does Asit do?', 'Show me his skills', 'Tell me about his projects'],
  }),
  thanks: (): ChatResponse => ({
    text: `You're welcome! Is there anything else you'd like to know about Asit?`,
    suggestions: ['His experience', 'Skills', 'Contact info'],
  }),
  about: (): ChatResponse => ({
    text: `${personalInfo.name} is a ${personalInfo.title} based in ${personalInfo.location}. ${personalInfo.about}`,
    suggestions: ['Current role?', 'What are his skills?', 'How to contact him?'],
  }),
  currentRole: (): ChatResponse => {
    const current = experiences[0];
    const p = current.projects[0];
    return {
      text: `Asit is currently a ${current.title} at ${current.company} (${current.period}). He's working on the ${p.name} — ${p.description}`,
      suggestions: ['What did he build there?', 'Previous roles?', 'Tech stack used?'],
    };
  },
  experience: (): ChatResponse => {
    const timeline = experiences
      .map((e) => `• ${e.title} at ${e.company} (${e.period})`)
      .join('\n');
    return {
      text: `Asit has 6+ years of professional experience across 4 companies:\n\n${timeline}`,
      suggestions: ['Tell me about Turing', 'Projects?', 'Skills?'],
    };
  },
  skills: (): ChatResponse => ({
    text: `Here's Asit's technical toolkit:\n\n${skillCategories.map((c) => `${c.name}: ${c.skills.join(', ')}`).join('\n\n')}`,
    suggestions: ['Projects?', 'Current role?', 'Download resume'],
  }),
  frontend: (): ChatResponse => ({
    text: `On the frontend, Asit is highly experienced with:\n\n• React.js & Next.js for building dynamic SPAs and SSR apps\n• TypeScript for type-safe development\n• React Native for mobile apps\n• Redux Toolkit, React Query for state management\n• Storybook for component libraries\n• Responsive design & modern CSS\n\nHe's built complex frontends including AI labeling UIs, coding challenge interfaces, and enterprise dashboards.`,
    suggestions: ['Backend skills?', 'His projects?', 'Full tech stack?'],
  }),
  backend: (): ChatResponse => ({
    text: `On the backend, Asit has deep experience with:\n\n• Node.js & NestJS for scalable server applications\n• Express.js for REST APIs\n• MySQL, MongoDB, Firebase for databases\n• Redis for caching & pub/sub\n• Apache Kafka for event streaming\n• BigQuery for analytics\n• Docker & CI/CD for deployment\n• Google Cloud Platform\n\nHe's architected backends handling large-scale data processing and real-time systems.`,
    suggestions: ['Frontend skills?', 'DevOps experience?', 'His projects?'],
  }),
  fullstack: (): ChatResponse => ({
    text: `Asit is a true full-stack engineer with end-to-end ownership capabilities:\n\n• Frontend: React, Next.js, TypeScript, React Native\n• Backend: Node.js, NestJS, Express.js\n• Databases: MySQL, MongoDB, Redis, BigQuery\n• Infra: Docker, CI/CD, GCP, Firebase\n• Testing: Jest, React Testing Library, Storybook\n\nHe regularly owns features from database schema to UI.`,
    suggestions: ['His projects?', 'Current role?', 'Contact Asit'],
  }),
  projects: (): ChatResponse => ({
    text: `Here are Asit's featured projects:\n\n${featuredProjects.map((p) => `• ${p.title} — ${p.description}`).join('\n\n')}`,
    suggestions: ['AI Labeling Tool?', 'Vetting Engine?', 'Tech stack?'],
  }),
  education: (): ChatResponse => ({
    text: `Asit holds a ${education.degree} from ${education.institution} (${education.period}).`,
    suggestions: ['Certifications?', 'Work experience?', 'His skills?'],
  }),
  certifications: (): ChatResponse => ({
    text: `Asit's certifications include:\n\n${certifications.map((c) => `• ${c}`).join('\n')}`,
    suggestions: ['Education?', 'Skills?', 'Work experience?'],
  }),
  contact: (): ChatResponse => ({
    text: `You can reach Asit at:\n\n• Email: ${personalInfo.email}\n• LinkedIn: linkedin.com/in/asitprakash\n• GitHub: github.com/asit-prakash\n• Twitter: @asitprksh\n\nHe's always open to discussing new opportunities and interesting projects!`,
    suggestions: ['What does Asit do?', 'His skills?', 'Download resume'],
  }),
  location: (): ChatResponse => ({
    text: `Asit is based in ${personalInfo.location}. He originally studied in Kolkata and has been working in Bangalore since 2021. He has extensive experience working with remote, distributed teams across global time zones.`,
    suggestions: ['Contact info?', 'Current role?', 'Work experience?'],
  }),
  resume: (): ChatResponse => ({
    text: `You can view or download Asit's resume here: [Download Resume](/resume.pdf). It covers his full work history, skills, and achievements.`,
    suggestions: ['Work experience?', 'His skills?', 'Contact Asit'],
  }),
  strengths: (): ChatResponse => ({
    text: `Asit's key strengths include:\n\n• Full-stack architecture — end-to-end ownership from React frontends to NestJS backends\n• AI/ML tooling — building platforms that support AI model training at scale\n• Performance optimization — measurable improvements like 17% assessment accuracy boost\n• Remote collaboration — seamless work across global time zones\n• Technical leadership — mentoring engineers and driving high-impact solutions\n• Scalable systems — architecting solutions that handle large datasets efficiently`,
    suggestions: ['His projects?', 'Tech stack?', 'Contact Asit'],
  }),
  availability: (): ChatResponse => ({
    text: `Asit is always open to discussing exciting opportunities! He's experienced with remote work and has collaborated across global time zones. The best way to reach him is via email at ${personalInfo.email} or connect on LinkedIn.`,
    suggestions: ['Contact info?', 'What does he do?', 'Download resume'],
  }),
  hobbies: (): ChatResponse => ({
    text: `Outside of work, Asit enjoys exploring new technologies, contributing to open source, and mentoring fellow engineers. He's passionate about staying on the cutting edge of web development and AI tooling.`,
    suggestions: ['His skills?', 'Current role?', 'Contact Asit'],
  }),
  promotion: (): ChatResponse => ({
    text: `Yes! Asit was promoted at Turing from Software Engineer to Senior Software Engineer (July 2023). His career progression:\n\n• 2018–2019: Freelance Web Developer — built client projects independently\n• 2020–2021: Software Engineer at Innoraft Solutions — enterprise portal development\n• 2021–2022: Software Engineer at Impelsys — student management systems\n• 2022–2023: Software Engineer at Turing — built the Vetting Engine\n• 2023–Present: Senior Software Engineer at Turing — leading AI Labeling Tool\n\nConsistent growth from freelance to leading enterprise AI tools at scale.`,
    suggestions: ['Current role?', 'His strengths?', 'Projects?'],
  }),
  leadership: (): ChatResponse => ({
    text: `As a Senior Software Engineer, Asit demonstrates strong leadership:\n\n• Technical leadership — driving architecture decisions and high-impact solutions\n• Mentoring — actively mentoring junior and mid-level engineers\n• Project ownership — end-to-end ownership of complex features and systems\n• Cross-team collaboration — working seamlessly with distributed teams across time zones\n• Stakeholder communication — translating technical concepts for non-technical stakeholders\n\nWhile his current role is an IC (Individual Contributor) senior position, he regularly takes on leadership responsibilities.`,
    suggestions: ['His strengths?', 'Current role?', 'Projects?'],
  }),
  ai: (): ChatResponse => ({
    text: `Asit works at the intersection of full-stack engineering and AI:\n\n• Currently building AI-powered labeling tools for model training at Turing\n• Built platforms that help train and evaluate AI/LLM models at scale\n• Experienced with OpenAI APIs for integrating AI capabilities\n• Uses AI productivity tools: GitHub Copilot, Claude, Cursor\n• Works on data pipelines that feed high-quality labeled data to ML models\n\nHe doesn't train ML models directly, but builds the critical tooling and platforms that support AI/LLM development.`,
    suggestions: ['AI Labeling Tool?', 'His tech stack?', 'Contact Asit'],
  }),
  devops: (): ChatResponse => ({
    text: `Asit's DevOps and infrastructure experience includes:\n\n• Docker for containerization\n• CI/CD pipelines for automated testing and deployment\n• Google Cloud Platform (GCP) for cloud infrastructure\n• Firebase for realtime databases and hosting\n• Webpack for build optimization\n• Linux/Unix & Bash scripting for server management\n\nHe's comfortable setting up and managing the full deployment pipeline from code to production.`,
    suggestions: ['Backend skills?', 'Full tech stack?', 'His projects?'],
  }),
  remoteWork: (): ChatResponse => ({
    text: `Asit has extensive remote work experience. At Turing (3+ years), he's been working with globally distributed teams across different time zones. He's skilled in:\n\n• Asynchronous communication and documentation\n• Cross-timezone collaboration\n• Self-motivated independent work\n• Remote pair programming and code reviews\n• Distributed team project management\n\nHe's highly effective in remote-first environments.`,
    suggestions: ['Current role?', 'His strengths?', 'Contact Asit'],
  }),
  salary: (): ChatResponse => ({
    text: `Salary and compensation details are best discussed directly with Asit. Feel free to reach out to him at ${personalInfo.email} or connect on LinkedIn to discuss specifics for your opportunity.`,
    suggestions: ['Contact info?', 'His experience?', 'Download resume'],
  }),
  age: (): ChatResponse => ({
    text: `Asit graduated in 2020 with his B.Tech and has been working professionally since 2018 (starting with freelance work during college). He's a young, energetic engineer in his mid-20s with 6+ years of industry experience.`,
    suggestions: ['Education?', 'Career timeline?', 'Contact Asit'],
  }),
  whyHire: (): ChatResponse => ({
    text: `Here's why Asit stands out:\n\n• Proven impact — 17% accuracy improvement on developer assessments at Turing\n• Full-stack ownership — can build features end-to-end, from database to UI\n• AI/ML ecosystem — experience building tools that power AI model training\n• Growth trajectory — promoted from SE to Senior SE at Turing in ~1 year\n• Remote-ready — 3+ years of successful remote collaboration across global teams\n• Clean code advocate — strong testing practices, code reviews, and mentoring\n• Fast learner — adapted across Drupal, React, NestJS, and AI tooling domains\n\nHe brings both technical depth and the ability to communicate effectively with stakeholders.`,
    suggestions: ['His projects?', 'Tech stack?', 'Contact Asit'],
  }),
  problemSolving: (): ChatResponse => ({
    text: `Asit is a strong problem solver. Examples from his work:\n\n• Built real-time monitoring and alerting systems to proactively catch bugs\n• Optimized data processing pipelines to handle large-scale annotation datasets\n• Refined assessment challenge structures to improve signal quality by 17%\n• Architected scalable systems that handle growing user bases without degradation\n\nHe approaches problems methodically — understanding the root cause before jumping to solutions.`,
    suggestions: ['His strengths?', 'Projects?', 'Tech stack?'],
  }),
  websiteStack: (): ChatResponse => ({
    text: `This portfolio website is built with:\n\n• Next.js 14 (React framework)\n• TypeScript\n• Tailwind CSS for styling\n• Framer Motion for animations\n• Deployed on Vercel\n\nThe chatbot you're talking to is a fully client-side intent engine — zero AI API calls, runs entirely in your browser!`,
    suggestions: ['His tech skills?', 'Projects?', 'Contact Asit'],
  }),
  funFact: (): ChatResponse => {
    const facts = [
      `Asit started his career as a freelance developer while still in college, building real client projects from 2018!`,
      `The Vetting Engine Asit built helped improve developer assessment accuracy by 17% — that's a massive impact on hiring quality.`,
      `Asit holds IBM Blockchain certifications — not just a web developer, he's explored diverse tech domains.`,
      `This chatbot you're using runs entirely in your browser with zero AI API calls!`,
      `Asit has worked across 4 different companies in 6 years, spanning education tech, insurance, and AI — a versatile engineer.`,
    ];
    return {
      text: facts[Math.floor(Math.random() * facts.length)],
      suggestions: ['Another fun fact!', 'His projects?', 'Contact Asit'],
    };
  },
  freelance: (): ChatResponse => ({
    text: `Yes! Asit started his career as a Freelance Web Developer (March 2018 — December 2019) while completing his B.Tech. He built web applications for various clients, developing strong full-stack skills with React, Node.js, and modern web technologies.`,
    suggestions: ['Career growth?', 'Current role?', 'His skills?'],
  }),
  help: (): ChatResponse => ({
    text: `I can answer questions about Asit in these areas:\n\n• About — who he is, background, summary\n• Experience — career history, companies, roles\n• Skills — technologies, frameworks, tools\n• Projects — what he's built, project details\n• Education — degree, certifications\n• Contact — email, social links\n• Career — promotions, growth, strengths\n• AI/ML — his AI-related work\n• Availability — hiring, remote work\n• Resume — download link\n\nJust ask naturally — I understand most questions!`,
    suggestions: ['Who is Asit?', 'His experience', 'Tech stack'],
  }),
  industries: (): ChatResponse => ({
    text: `Asit has worked across multiple industries:\n\n• AI/ML — Building tools for AI model training and LLM data labeling (Turing)\n• HR Tech — Developer assessment and vetting platforms (Turing)\n• EdTech — Student management systems and virtual learning (Impelsys/NCUK)\n• InsurTech — Broker portal and client management for insurance (Innoraft/Liberty Seguros)\n• Freelance — Various client web applications\n\nThis cross-industry experience gives him a broad perspective on different problem domains.`,
    suggestions: ['His projects?', 'Career timeline?', 'Skills?'],
  }),
  achievements: (): ChatResponse => ({
    text: `Asit's notable achievements:\n\n• Improved developer assessment accuracy by 17% at Turing\n• Automated annotation workflows, significantly reducing manual effort\n• Promoted from SE to Senior SE at Turing within ~1 year\n• Built scalable architectures handling large-scale data processing\n• Earned high stakeholder approval for the NCUK student platform\n• Strengthened broker relationships through personalized dashboards at Liberty Seguros\n\nEach project delivered measurable business impact.`,
    suggestions: ['His projects?', 'Why hire him?', 'Contact Asit'],
  }),
};

const topics: Record<string, TopicDef> = {
  greeting:       { keywords: ['hello', 'hi', 'hey', 'sup', 'howdy', 'greetings', 'yo', 'hola', 'namaste', 'hii', 'hiii'], respond: topicResponses.greeting },
  thanks:         { keywords: ['thanks', 'thank', 'thx', 'cool', 'great', 'awesome', 'nice', 'okay', 'ok', 'understood', 'helpful', 'perfect', 'wonderful', 'amazing', 'appreciate'], respond: topicResponses.thanks },
  about:          { keywords: ['who', 'introduce', 'background', 'summary', 'bio', 'overview', 'describe', 'profile'], respond: topicResponses.about },
  currentRole:    { keywords: ['current', 'currently', 'present', 'nowadays', 'latest', 'recent', 'doing', 'today'], respond: topicResponses.currentRole },
  experience:     { keywords: ['experience', 'career', 'companies', 'worked', 'employment', 'history', 'journey', 'timeline', 'professional', 'roles', 'positions'], respond: topicResponses.experience },
  skills:         { keywords: ['skill', 'skills', 'technology', 'technologies', 'tech', 'stack', 'language', 'languages', 'framework', 'frameworks', 'tools', 'proficient', 'expert', 'expertise', 'toolkit'], respond: topicResponses.skills },
  frontend:       { keywords: ['frontend', 'ui', 'ux', 'css', 'html', 'interface', 'styling', 'responsive', 'tailwind', 'component', 'components'], respond: topicResponses.frontend },
  backend:        { keywords: ['backend', 'server', 'api', 'apis', 'microservice', 'microservices', 'database', 'databases'], respond: topicResponses.backend },
  fullstack:      { keywords: ['fullstack'], respond: topicResponses.fullstack },
  projects:       { keywords: ['project', 'projects', 'built', 'build', 'made', 'portfolio', 'product', 'created', 'developed', 'shipped', 'delivered'], respond: topicResponses.projects },
  education:      { keywords: ['education', 'degree', 'university', 'college', 'study', 'studied', 'btech', 'school', 'academic', 'graduated', 'qualification', 'alumni', 'institute', 'engineering'], respond: topicResponses.education },
  certifications: { keywords: ['certification', 'certificate', 'certified', 'course', 'courses', 'training', 'bootcamp', 'mern', 'blockchain'], respond: topicResponses.certifications },
  contact:        { keywords: ['contact', 'email', 'reach', 'connect', 'message', 'touch', 'mail', 'linkedin', 'github', 'twitter', 'social'], respond: topicResponses.contact },
  location:       { keywords: ['location', 'live', 'based', 'city', 'country', 'located', 'bangalore', 'bengaluru', 'india', 'kolkata', 'place'], respond: topicResponses.location },
  resume:         { keywords: ['resume', 'cv', 'download'], respond: topicResponses.resume },
  strengths:      { keywords: ['strength', 'strengths', 'best', 'specialize', 'specialization', 'speciality', 'specialty', 'excel', 'strong', 'standout', 'unique', 'special', 'advantage', 'superpower', 'expertise', 'expert', 'niche', 'forte', 'focus', 'focused'], respond: topicResponses.strengths },
  availability:   { keywords: ['available', 'freelance', 'open', 'opportunities', 'looking', 'joining', 'openings', 'relocate', 'onsite', 'hybrid'], respond: topicResponses.availability },
  hobbies:        { keywords: ['hobby', 'hobbies', 'interests', 'passion', 'passionate', 'leisure', 'enjoy', 'enjoys'], respond: topicResponses.hobbies },
  promotion:      { keywords: ['promotion', 'promoted', 'growth', 'grow', 'grew', 'advance', 'advancement', 'progression', 'progress', 'climb', 'level'], respond: topicResponses.promotion },
  leadership:     { keywords: ['lead', 'leader', 'leadership', 'mentor', 'mentoring', 'manage', 'management', 'team', 'guide', 'ownership'], respond: topicResponses.leadership },
  ai:             { keywords: ['ai', 'ml', 'artificial', 'intelligence', 'machine', 'learning', 'llm', 'gpt', 'model', 'chatgpt'], respond: topicResponses.ai },
  devops:         { keywords: ['devops', 'deploy', 'deployment', 'cicd', 'pipeline', 'cloud', 'infrastructure', 'infra'], respond: topicResponses.devops },
  remoteWork:     { keywords: ['remote', 'distributed', 'timezone', 'async', 'wfh'], respond: topicResponses.remoteWork },
  salary:         { keywords: ['salary', 'pay', 'compensation', 'ctc', 'package', 'money', 'rate', 'cost', 'charge', 'pricing', 'budget'], respond: topicResponses.salary },
  age:            { keywords: ['age', 'old', 'young', 'born', 'birthday', 'dob'], respond: topicResponses.age },
  whyHire:        { keywords: ['hire', 'consider', 'fit', 'suitable', 'right', 'candidate', 'recommend', 'pick', 'choose', 'convince'], respond: topicResponses.whyHire },
  problemSolving: { keywords: ['problem', 'solving', 'debug', 'debugging', 'troubleshoot', 'fix', 'challenge', 'difficult', 'complex'], respond: topicResponses.problemSolving },
  websiteStack:   { keywords: ['website', 'site', 'page'], respond: topicResponses.websiteStack },
  funFact:        { keywords: ['fact', 'interesting', 'trivia', 'random', 'surprise'], respond: topicResponses.funFact },
  freelance:      { keywords: ['freelance', 'freelancer', 'independent', 'consultant', 'consulting', 'contract'], respond: topicResponses.freelance },
  help:           { keywords: ['help', 'options', 'menu', 'commands', 'features'], respond: topicResponses.help },
  industries:     { keywords: ['industry', 'industries', 'domain', 'domains', 'sector', 'sectors', 'field', 'fields', 'vertical', 'verticals'], respond: topicResponses.industries },
  achievements:   { keywords: ['achievement', 'achievements', 'accomplishment', 'accomplishments', 'impact', 'results', 'outcome', 'outcomes', 'highlights'], respond: topicResponses.achievements },
};

// Phrase patterns that map directly to topics — checked on the RAW normalized input
// (before stop-word removal) to catch multi-word natural patterns.
const phrasePatterns: [RegExp, string][] = [
  [/(?:what|who|how)\b.*\b(?:current|doing|now|present|today|these days)/, 'currentRole'],
  [/(?:full|end.to.end)\s*stack/, 'fullstack'],
  [/(?:front).?end/, 'frontend'],
  [/(?:back).?end/, 'backend'],
  [/(?:work|remote|wfh|work from home|distributed)/, 'remoteWork'],
  [/(?:ci|cd|ci.cd|devops|deploy)/, 'devops'],
  [/(?:how much|salary|compensation|ctc|package)/, 'salary'],
  [/(?:how old|age|born|birthday)/, 'age'],
  [/(?:why hire|why should|should i hire|convince me|why choose|what makes .* stand out|what sets .* apart)/, 'whyHire'],
  [/(?:career growth|promoted|promotion|career progression|level up|moved up)/, 'promotion'],
  [/(?:free time|outside work|when not coding|hobbies|spare time)/, 'hobbies'],
  [/(?:download|view|see|get|share)\s*(?:resume|cv)/, 'resume'],
  [/(?:get in touch|contact info|reach out|how .* reach|how .* contact|email .* address)/, 'contact'],
  [/(?:open to work|available for|open for work|looking for .* job|open .* opportunities)/, 'availability'],
  [/(?:fun fact|something interesting|surprise me|random fact|did you know)/, 'funFact'],
  [/(?:what can i ask|what can you do|how does this work|help me|show options|what topics)/, 'help'],
  [/(?:this (?:website|portfolio|site)|how .* this .* built|built with what)/, 'websiteStack'],
  [/(?:which|what) (?:industr|domain|sector|field|vertical)/, 'industries'],
  [/(?:achievement|accomplishment|biggest impact|notable .* result)/, 'achievements'],
  [/(?:problem solv|debug|troubleshoot|biggest challenge)/, 'problemSolving'],
  [/(?:artificial intelligence|machine learning|llm|ai .* work|ai .* experience)/, 'ai'],
  [/(?:lead|leader|leadership|mentor|team .* manage|manage .* team)/, 'leadership'],
  [/(?:expert|expertise|speciali[sz]|forte|niche|where .* (?:lie|lies|excel|strong|best|focus|good))/, 'strengths'],
  [/(?:what (?:is|are) .* (?:skill|tech|stack|language|tool))/, 'skills'],
  [/(?:experience|work|time|stint|tenure|role|job) .* (?:at|in|with) /, 'experience'],
  [/(?:which|what) (?:project|product|tool|system|platform|app)/, 'projects'],
  [/(?:where .* stud|which .* college|which .* university|education)/, 'education'],
  [/(?:where .* (?:live|based|stay|from|located)|which city|which country)/, 'location'],
  [/(?:who is|about asit|about him|tell .* about .* (?:himself|him|asit))/, 'about'],
  [/(?:year|years) .* (?:experience|work)/, 'experience'],
  [/(?:how .* (?:long|many year))/, 'experience'],
  [/(?:can .* (?:do|handle|work|build|develop|manage))/, 'strengths'],
  [/(?:does he (?:know|use|work|have|code))/, 'skills'],
  [/(?:biggest|greatest|most .* (?:achievement|accomplishment|impact|proud))/, 'achievements'],
  [/(?:hire|hiring|recruit|interested in him)/, 'whyHire'],
  [/(?:talk|speak|chat|discuss|connect) .* (?:him|asit)/, 'contact'],
];

function scoreTopic(cleanedWords: string[], topic: TopicDef): number {
  let score = 0;
  for (const keyword of topic.keywords) {
    if (cleanedWords.includes(keyword)) {
      score += 5;
    } else {
      for (const word of cleanedWords) {
        if (word.length >= 4 && keyword.length >= 4) {
          // Prefix match: "experties" starts with "expert", "speciali" covers specialization/speciality
          if (word.startsWith(keyword.slice(0, 4)) || keyword.startsWith(word.slice(0, 4))) {
            score += 4;
            break;
          }
          if (levenshtein(word, keyword) <= 2) {
            score += 3;
            break;
          }
        }
      }
    }
  }
  if (cleanedWords.length <= 3 && score > 0) score += 3;
  return score;
}

// ---------------------------------------------------------------------------
// Main response pipeline
// ---------------------------------------------------------------------------

export function getResponse(input: string): ChatResponse {
  if (!input.trim()) {
    return {
      text: `Ask me anything about Asit — his experience, skills, projects, education, or how to reach him!`,
      suggestions: ['Who is Asit?', 'Show me his skills', 'His projects'],
    };
  }

  const normalized = normalize(input);

  // ------ PHASE 1: Entity detection (highest priority) ------
  const entities = detectEntities(normalized);

  // If a specific entity is mentioned, respond about it directly
  if (entities.project) return projectResponse(entities.project);
  if (entities.company) return companyResponse(entities.company, normalized);

  // ------ PHASE 2: Phrase / pattern matching on raw input ------
  for (const [pattern, topicKey] of phrasePatterns) {
    if (pattern.test(normalized) && topics[topicKey]) {
      return topics[topicKey].respond();
    }
  }

  // ------ PHASE 3: Keyword scoring on stop-word-cleaned input ------
  const cleanedWords = removeStopWords(normalized);

  let bestTopic = '';
  let bestScore = 0;
  for (const [name, topic] of Object.entries(topics)) {
    const score = scoreTopic(cleanedWords, topic);
    if (score > bestScore) {
      bestScore = score;
      bestTopic = name;
    }
  }

  if (bestScore >= 5 && topics[bestTopic]) {
    return topics[bestTopic].respond();
  }

  // ------ PHASE 4: Skill entity (checked after topics to avoid false positives) ------
  if (entities.skill) return skillResponse(entities.skill);

  // ------ PHASE 5: Fuzzy company match ------
  const fuzzyCompany = fuzzyMatch(normalized, Object.keys(companyLookup), 2);
  if (fuzzyCompany) return companyResponse(companyLookup[fuzzyCompany], normalized);

  // ------ PHASE 6: Soft topic match ------
  if (bestScore >= 3 && topics[bestTopic]) {
    return topics[bestTopic].respond();
  }

  // ------ PHASE 7: Graceful fallback ------
  return {
    text: `Hmm, I'm not sure about that one. But I know a lot about Asit! Try asking about:\n\n• His background and experience\n• Technical skills and tech stack\n• Projects he's built\n• Education and certifications\n• How to contact him\n• Career growth and strengths\n• AI/ML work\n\nOr just type "help" to see all topics!`,
    suggestions: ['Who is Asit?', 'His experience', 'Skills', 'Contact info'],
  };
}
