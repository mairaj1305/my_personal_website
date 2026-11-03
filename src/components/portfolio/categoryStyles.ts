import { BookOpen, Briefcase, Compass, Globe, Landmark, Megaphone, Mic, Search, type LucideIcon } from 'lucide-react';
import type { Category, ProjectIconName } from '@/data/projects';

export const projectIcons: Record<ProjectIconName, LucideIcon> = {
  book: BookOpen,
  briefcase: Briefcase,
  compass: Compass,
  globe: Globe,
  landmark: Landmark,
  megaphone: Megaphone,
  mic: Mic,
  search: Search,
};

export function categoryTagClass(category: Category): string {
  return `pf-tag pf-tag-${category.toLowerCase()}`;
}
