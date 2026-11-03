import { Award, Layers, Users, type LucideIcon } from 'lucide-react';

export const aboutStory = {
  pill: 'My Story',
  heading: { before: 'From ', accent: 'Skardu', after: ' to IBA Karachi' },
  paragraphs: [
    "I'm a BBA Marketing student at IBA Karachi and a Jenabai Scholar from Skardu, Gilgit-Baltistan. I've always been curious about why people buy, choose, and trust, which led me to build TheStudentLens, where I turn behavioral economics and psychology into content Gen Z and young professionals actually use.",
    'Back home, I lead Skardu Minds and Rahnuma, programmes that bring academic competition, mentorship, and career guidance to school students across Baltistan. Building them taught me how to turn an idea into something real, from design to delivery.',
  ],
  highlights: [
    { icon: Award, title: 'Jenabai Scholar' },
    { icon: Users, title: '6,000+ Students Reached' },
    { icon: Layers, title: '3 Initiatives Built', detail: 'TheStudentLens, Skardu Minds, Rahnuma' },
  ] satisfies { icon: LucideIcon; title: string; detail?: string }[],
} as const;
