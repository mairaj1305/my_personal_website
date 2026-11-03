export type Category = 'Community' | 'Content' | 'Research' | 'Digital' | 'Finance';

export type ProjectIconName = 'book' | 'briefcase' | 'compass' | 'globe' | 'landmark' | 'megaphone' | 'mic' | 'search';

export type ProjectTile = { label: string; value: string };

export type ProjectLinks = { pdf?: string; instagram?: string; youtube?: string };

export type Project = {
  id: string;
  title: string;
  course: string;
  category: Category;
  icon: ProjectIconName;
  status?: 'In Progress';
  tiles: ProjectTile[];
  summary: string;
  bullets: string[];
  tags: string[];
  links?: ProjectLinks;
};

export const projects: Project[] = [
  {
    id: '01',
    title: 'Skardu Minds',
    course: 'Community initiative',
    category: 'Community',
    icon: 'book',
    tiles: [
      { label: 'student age groups', value: '3' },
      { label: 'week implementation plan', value: '12' },
      { label: 'grant proposal target', value: 'PKR 500K' },
    ],
    summary: 'A multi-tier academic competition and skills programme for school students in Skardu.',
    bullets: [
      'Designed three grade-band tiers with full syllabi, sample assessments, and a prize structure',
      'Prepared a facilitator handbook and delivered facilitated sessions across three age groups',
      'Built a 12-week implementation timeline',
      'Wrote a grant proposal targeting PKR 500,000 for the Jenabai Awards',
    ],
    tags: ['Program Design', 'Leadership', 'Education Access', 'Grant Writing'],
  },
  {
    id: '02',
    title: 'Rahnuma',
    course: 'Career guidance platform',
    category: 'Community',
    icon: 'compass',
    tiles: [
      { label: 'grades guided', value: '5-12' },
      { label: 'mentor universities', value: '3' },
    ],
    summary: 'A student-led career and education guidance platform serving the Baltistan region.',
    bullets: [
      'Guides school students from grade 5 to 12 on career and education choices',
      'Mentors come from IBA, LUMS, and AKU',
      'Serves students across Baltistan',
    ],
    tags: ['Mentorship', 'Career Guidance', 'Education Access'],
  },
  {
    id: '03',
    title: 'TheStudentLens',
    course: 'Content brand',
    category: 'Content',
    icon: 'megaphone',
    tiles: [],
    summary: 'An Instagram page that explains behavioral economics and psychology to Gen Z and young professionals.',
    bullets: [
      'Creates content on behavioral economics and management theories',
      'Targets Gen Z and young professionals',
      'Built and maintained as a long-running personal brand',
    ],
    tags: ['Content Strategy', 'Behavioral Economics', 'Social Media'],
    links: { instagram: 'https://www.instagram.com/thestudentlens' },
  },
  {
    id: '04',
    title: 'Next Voyage',
    course: 'Client project',
    category: 'Digital',
    icon: 'globe',
    status: 'In Progress',
    tiles: [
      { label: 'workstream', value: 'Website' },
      { label: 'workstream', value: 'WhatsApp' },
      { label: 'workstream', value: 'SEO' },
    ],
    summary: 'A group project to strengthen Next Voyage’s online presence.',
    bullets: [
      'Building the company’s website using AI-assisted development',
      'Optimizing their WhatsApp Business presence',
      'Developing an SEO strategy to improve online visibility',
    ],
    tags: ['Web Development', 'WhatsApp Business', 'SEO'],
  },
  {
    id: '05',
    title: 'The Quiet Vote',
    course: 'Content strategy',
    category: 'Content',
    icon: 'mic',
    tiles: [
      { label: 'episode ideas', value: '100' },
      { label: 'month content calendar', value: '3' },
    ],
    summary: 'A YouTube-first podcast concept about the hidden influences behind everyday decisions.',
    bullets: [
      'Developed the channel concept and positioning',
      'Planned 100 episode ideas',
      'Built an SEO keyword set and a 3-month content calendar',
    ],
    tags: ['Podcast', 'SEO', 'Content Calendar'],
  },
  {
    id: '06',
    title: 'Loss Aversion Podcast',
    course: 'Consumer behavior',
    category: 'Research',
    icon: 'mic',
    tiles: [{ label: 'minute podcast', value: '10' }],
    summary: 'A two-person conversational podcast on how loss aversion and framing shape buying decisions.',
    bullets: [
      'Scripted a host and guest conversation on loss aversion, framing, and prospect theory',
      'Used Pakistani consumer examples to make the concepts relatable',
    ],
    tags: ['Prospect Theory', 'Framing', 'Scriptwriting'],
  },
  {
    id: '07',
    title: 'Micro-Influencer Credibility Study',
    course: 'Business research methods',
    category: 'Research',
    icon: 'search',
    tiles: [{ label: 'research objectives', value: '3' }],
    summary: 'A qualitative study of how Gen Z judges micro-influencer credibility in fashion purchases.',
    bullets: [
      'Framed the research question and three objectives',
      'Designed an exploratory qualitative study using Source Credibility Theory',
      'Planned semi-structured interviews, purposive sampling, and thematic analysis',
    ],
    tags: ['Qualitative Research', 'Source Credibility Theory', 'Thematic Analysis'],
  },
  {
    id: '08',
    title: 'FCCL Capital Structure Analysis',
    course: 'Financial management',
    category: 'Finance',
    icon: 'landmark',
    tiles: [{ label: 'years analyzed', value: '5' }],
    summary: 'Capital structure and dividend policy analysis of Fauji Cement.',
    bullets: [
      'Organized FY2022 to FY2026 financials into a clean inputs sheet',
      'Built a ratios sheet for capital structure and dividend policy analysis',
    ],
    tags: ['Financial Analysis', 'Excel', 'Capital Structure'],
  },
  {
    id: '09',
    title: 'SBP Training Study',
    course: 'Human resource management',
    category: 'Research',
    icon: 'briefcase',
    tiles: [],
    summary: 'A group study on the effectiveness of training and development at the State Bank of Pakistan.',
    bullets: [
      'Conducted a primary interview with an HR professional',
      'Wrote the full academic report',
      'Designed a consulting-style presentation deck',
    ],
    tags: ['Primary Research', 'HRM', 'Presentation'],
  },
  {
    id: '10',
    title: "Women's Financial Inclusion",
    course: 'Financial institutions and markets',
    category: 'Finance',
    icon: 'landmark',
    tiles: [{ label: 'slide presentation', value: '18' }],
    summary: "A research report and presentation on women's financial inclusion.",
    bullets: [
      'Researched and wrote a full-length report',
      'Built an 18-slide presentation',
    ],
    tags: ['Research', 'Report Writing', 'Presentation'],
  },
];

export const featured = ['03', '01', '04'].flatMap((id) => projects.filter((project) => project.id === id));
