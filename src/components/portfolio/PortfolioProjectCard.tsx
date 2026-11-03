import { useId, useState, type CSSProperties } from 'react';
import { ChevronDown, FileText, Instagram, Youtube, type LucideIcon } from 'lucide-react';
import { categoryTagClass, projectIcons } from '@/components/portfolio/categoryStyles';
import type { Project, ProjectLinks } from '@/data/projects';

type ProjectLink = { href: string; label: string; icon: LucideIcon };

type PortfolioProjectCardProps = { project: Project; index: number };

function buildLinks(links: ProjectLinks | undefined): ProjectLink[] {
  const items: ProjectLink[] = [];
  if (links?.pdf) items.push({ href: links.pdf, label: 'View PDF', icon: FileText });
  if (links?.instagram) items.push({ href: links.instagram, label: 'Visit on Instagram', icon: Instagram });
  if (links?.youtube) items.push({ href: links.youtube, label: 'Watch on YouTube', icon: Youtube });
  return items;
}

export function PortfolioProjectCard({ project, index }: PortfolioProjectCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Icon = projectIcons[project.icon];
  const inProgress = project.status === 'In Progress';
  const links = buildLinks(project.links);
  const buttonLabel = open ? 'Hide Details' : inProgress ? "What We're Doing" : 'What I Did';

  return (
    <article className="pf-card" style={{ '--delay': `${index * 70}ms` } as CSSProperties}>
      <div className="pf-card-top">
        <div className="pf-card-head">
          <span className="pf-card-icon" aria-hidden="true">
            <Icon size={24} />
          </span>
          <div className="pf-card-badges">
            {inProgress && (
              <span className="pf-progress">
                <span className="pf-progress-dot" aria-hidden="true" />
                In Progress
              </span>
            )}
            <span className="pf-course">{project.course}</span>
          </div>
        </div>
        <h2 className="pf-card-title">{project.title}</h2>
        {project.tiles.length > 0 && (
          <dl className="pf-tiles">
            {project.tiles.map((tile) => (
              <div className="pf-tile" key={`${tile.label}-${tile.value}`}>
                <dt>{tile.label}</dt>
                <dd>{tile.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="pf-card-bottom">
        <p className="pf-summary">{project.summary}</p>
        <ul className="pf-tags" aria-label="Project tags">
          {project.tags.map((tag) => (
            <li className={categoryTagClass(project.category)} key={tag}>{tag}</li>
          ))}
        </ul>
        <button
          type="button"
          className="pf-expand"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {buttonLabel}
          <ChevronDown size={18} aria-hidden="true" />
        </button>
        <div id={panelId} className={`pf-panel ${open ? 'is-open' : ''}`}>
          <div className="pf-panel-inner">
            <div className="pf-panel-body">
              <ul className="pf-bullets">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className="pf-bullet-dot" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {links.length > 0 && (
                <div className="pf-links">
                  {links.map(({ href, label, icon: LinkIcon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                      <LinkIcon size={16} aria-hidden="true" />
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
