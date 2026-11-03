import { useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { PortfolioFilterBar } from '@/components/portfolio/PortfolioFilterBar';
import { PortfolioProjectCard } from '@/components/portfolio/PortfolioProjectCard';
import { projects } from '@/data/projects';

const portfolioFilters = ['All', 'Community', 'Content', 'Research', 'Digital', 'Finance'] as const;
type PortfolioFilter = (typeof portfolioFilters)[number];

export default function Portfolio() {
  const [filter, setFilter] = useState<PortfolioFilter>('All');
  const visible = filter === 'All' ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <Seo title="Portfolio" description="Selected content, community, research, finance, and digital marketing projects by Mairaj Abbas." />

      <section className="pf-hero">
        <span className="pf-blur" aria-hidden="true" />
        <div className="container pf-hero-inner">
          <nav aria-label="Breadcrumb" className="pf-crumbs">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Portfolio</span>
          </nav>
          <span className="eyebrow">Selected Work</span>
          <h1 className="pf-title">
            Things I’ve{' '}
            <span className="pf-mask">
              <span className="pf-word">built</span>
            </span>
          </h1>
          <p className="pf-lede">Content, community, and research projects.</p>
          <span className="pf-count-badge">{projects.length} projects</span>
        </div>
      </section>

      <PortfolioFilterBar filters={portfolioFilters} active={filter} onChange={setFilter} count={visible.length} />

      <section className="container pf-list-section" aria-label="All projects">
        <div className="pf-grid" key={filter}>
          {visible.map((project, index) => (
            <PortfolioProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="pf-closing">
        <div className="container pf-closing-inner">
          <h2>Have a project in mind?</h2>
          <div className="pf-closing-actions">
            <Link to="/contact" className="button button-orange">
              Let’s Talk
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <a href="/Mairaj-Abbas-Resume.pdf" className="button button-outline-orange" download>
              Download Résumé
              <Download size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
