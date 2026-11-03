import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, Award, Brain, ChevronUp, Compass, Instagram, Linkedin, Mail, Menu, Search, Sparkles, Target, UsersRound, X } from 'lucide-react';
import { featured, type Category } from '@/data/projects';
import { Seo } from '@/components/Seo';
import { MyStory } from '@/components/about/MyStory';
import Portfolio from '@/pages/Portfolio';
import Contact from '@/pages/Contact';

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

function Preloader() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  useEffect(() => {
    try {
      if (sessionStorage.getItem('ma-preloader-seen') === 'true' || reduceMotion) return;
      setVisible(true);
      const timer = window.setTimeout(() => { sessionStorage.setItem('ma-preloader-seen', 'true'); setVisible(false); }, 1800);
      return () => window.clearTimeout(timer);
    } catch {
      if (!reduceMotion) setVisible(true);
      return undefined;
    }
  }, [reduceMotion]);
  if (!visible) return null;
  const dismiss = () => { try { sessionStorage.setItem('ma-preloader-seen', 'true'); } catch { /* storage can be unavailable */ } setVisible(false); };
  return <button className="preloader" type="button" aria-label="Skip intro" onClick={dismiss}><span className="preloader-ring"><span>MA</span></span><small>Click to skip</small></button>;
}

function CustomCursor() {
  const reduceMotion = usePrefersReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
    const move = (event: PointerEvent) => { cursorRef.current?.style.setProperty('transform', `translate3d(${event.clientX}px, ${event.clientY}px, 0)`); const target = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null; const interactive = target?.closest('a, button, .project-card, .selected-project-card, .skill-modern-card'); setActive(Boolean(interactive)); setLabel(target?.closest('[data-cursor="view"], .selected-project-card') ? 'View' : ''); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduceMotion]);
  if (reduceMotion) return null;
  return <div ref={cursorRef} className={`custom-cursor ${active ? 'is-active' : ''}`} aria-hidden="true"><span>{label}</span></div>;
}


function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { element.classList.add('is-visible'); observer.disconnect(); } }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    const update = () => { setScrolled(window.scrollY > 12); const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? (window.scrollY / max) * 100 : 0); };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    const buttons = Array.from(document.querySelectorAll<HTMLElement>('.button, .nav-resume'));
    const cleanups = buttons.map((button) => {
      const move = (event: PointerEvent) => { const rect = button.getBoundingClientRect(); button.style.setProperty('--mag-x', `${(event.clientX - rect.left - rect.width / 2) * .12}px`); button.style.setProperty('--mag-y', `${(event.clientY - rect.top - rect.height / 2) * .12}px`); };
      const leave = () => { button.style.setProperty('--mag-x', '0px'); button.style.setProperty('--mag-y', '0px'); };
      button.addEventListener('pointermove', move); button.addEventListener('pointerleave', leave);
      return () => { button.removeEventListener('pointermove', move); button.removeEventListener('pointerleave', leave); };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [location.pathname]);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.selected-project-card, .project-card, .skill-modern-card'));
    const cleanups = cards.map((card) => {
      const move = (event: PointerEvent) => { const rect = card.getBoundingClientRect(); const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 16; const rotateX = ((event.clientY - rect.top) / rect.height - .5) * -16; card.style.setProperty('--tilt-x', `${rotateX}deg`); card.style.setProperty('--tilt-y', `${rotateY}deg`); card.style.setProperty('--shine-x', `${((event.clientX - rect.left) / rect.width) * 100}%`); };
      const leave = () => { card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); };
      card.addEventListener('pointermove', move); card.addEventListener('pointerleave', leave);
      return () => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [location.pathname]);
  return <div className="site-shell">
    <Preloader /><CustomCursor />
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}><div className="scroll-progress" style={{ width: `${progress}%` }} /><div className="container nav-wrap">
      <Link to="/" className="brand" aria-label="Mairaj Abbas home"><span className="brand-mark">MA</span><span className="brand-name"><span>Mairaj</span> <b>Abbas</b></span></Link>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/about">About</NavLink><NavLink to="/portfolio">Portfolio</NavLink><NavLink to="/contact">Contact</NavLink><Link className="nav-resume" to="/contact">Let’s Talk <ArrowUpRight size={14} /></Link></nav>
    </div></header>
    <main className="page-transition" key={location.pathname}><div className="route-wipe" />{children}</main>
    <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span className="back-to-top-progress" style={{ background: `conic-gradient(var(--orange) ${progress}%, rgba(255,255,255,.14) ${progress}% 100%)` }} /><ChevronUp size={17} /></button>
    <footer className="site-footer"><div className="container footer-grid"><div><Link to="/" className="brand footer-brand"><span className="brand-mark">MA</span><span className="brand-name"><span>Mairaj</span> <b>Abbas</b></span></Link><p className="footer-note">Made in Karachi.<br />Rooted in Skardu.</p></div><div className="footer-links"><span className="eyebrow">Explore</span><Link to="/about">About</Link><Link to="/portfolio">Selected work</Link><Link to="/contact">Get in touch</Link></div><div className="footer-links"><span className="eyebrow">Say hello</span><a href="mailto:mairajabbas@example.com"><Mail size={14} /> Email</a><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin size={14} /> LinkedIn</a><a href="https://www.instagram.com/thestudentlens" target="_blank" rel="noopener noreferrer"><Instagram size={14} /> @TheStudentLens</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Mairaj Abbas</span><span>Marketing student · IBA Karachi</span></div></footer>
  </div>;
}

function SectionLabel({ children }: { children: ReactNode }) { return <span className="eyebrow">{children}</span>; }
function PageBanner({ title, current }: { title: string; current: string }) { return <section className="page-banner"><div className="container"><SectionLabel>{title}</SectionLabel><h1>{current}</h1><p><Link to="/">Home</Link><span>›</span><strong>{current}</strong></p></div></section>; }
function ProjectVisual({ number }: { number: string }) { return <div className={`project-visual project-visual-${number}`}><span>{number}</span></div>; }
function ProfileImage({ className = '' }: { className?: string }) { return <div className={`profile-frame ${className}`}><img loading="lazy" src="/profile.jpg" alt="Mairaj Abbas, BBA Marketing student at IBA Karachi" onError={(event) => { event.currentTarget.style.opacity = '0'; }} /></div>; }
function categoryClass(category: Category): string { return `tag-${category.toLowerCase().replace(/\s+/g, '-')}`; }

function RotatingSubtitle() {
  const subtitles = ['Marketing Student', 'Brand Thinker', 'Community Builder', 'Content Creator'];
  const [index, setIndex] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setIndex((value) => (value + 1) % subtitles.length), 2500); return () => window.clearInterval(timer); }, [subtitles.length]);
  return <span className="rotating-subtitle" aria-live="polite">{subtitles[index]}</span>;
}

function HeroAtmosphere() {
  return <div className="hero-atmosphere" aria-hidden="true"><span className="atmosphere-blob atmosphere-blob-one" /><span className="atmosphere-blob atmosphere-blob-two" /><span className="atmosphere-blob atmosphere-blob-three" /><span className="atmosphere-shape atmosphere-ring-shape" /><span className="atmosphere-shape atmosphere-plus-shape">+</span><span className="atmosphere-shape atmosphere-dot-shape" /></div>;
}

function CountUp() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let start: number | null = null;
      const animate = (time: number) => {
        if (start === null) start = time;
        const progress = Math.min((time - start) / 1100, 1);
        setCount(Math.floor(progress * 6000));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="home-count"><strong>{count.toLocaleString()}+</strong><span>Students Reached</span></div>;
}

function Home() {
  const schema = { '@context': 'https://schema.org', '@type': 'Person', name: 'Mairaj Abbas', jobTitle: 'Marketing Student', alumniOf: 'IBA Karachi', sameAs: ['https://www.linkedin.com', 'https://www.instagram.com/thestudentlens'] };
  return <><Seo title="Mairaj Abbas | Marketing Student at IBA Karachi" description="Mairaj Abbas is an IBA Karachi marketing student focused on consumer insight, brand strategy, and community." /><script type="application/ld+json">{JSON.stringify(schema)}</script>
    <section className="dark-hero home-hero-modern"><HeroAtmosphere /><div className="container home-hero-grid"><div className="home-hero-copy"><SectionLabel>Hello, I’m</SectionLabel><h1><span className="hero-word">Mairaj</span> <span className="hero-word hero-word-orange">Abbas</span></h1><RotatingSubtitle /><p>BBA Marketing at IBA Karachi. Turning consumer insight into action.</p><div className="hero-actions"><Link to="/portfolio" className="button button-orange">See My Work <ArrowUpRight size={16} /></Link><a href="/Mairaj-Abbas-Resume.pdf" className="button button-outline-orange" download>Download Résumé <ArrowUpRight size={16} /></a></div></div><div className="home-portrait-modern"><div className="portrait-orb portrait-orb-large" /><div className="portrait-orb portrait-orb-small" /><div className="portrait-ring"><img loading="lazy" src="/profile.jpg" alt="Mairaj Abbas, BBA Marketing student at IBA Karachi" onError={(event) => { event.currentTarget.style.opacity = '0'; }} /></div></div></div></section>
    <section className="stats-band"><div className="container stats-grid-modern"><div className="stat-card stat-card-main"><CountUp /></div></div></section>
    <section className="container selected-work-modern"><div className="section-heading-modern"><div><SectionLabel>Selected Work</SectionLabel><h2>Ideas made <span>useful.</span></h2></div><Link to="/portfolio" className="button button-outline-orange">View All <ArrowUpRight size={15} /></Link></div><div className="selected-work-grid">{featured.map((project, index) => <Reveal className={`reveal-delay-${index}`} key={project.id}><Link to="/portfolio" className="selected-project-card"><ProjectVisual number={project.id} /><div className="selected-project-body"><span className="project-category">{project.course}</span><h3>{project.title}</h3><div className="tag-list">{project.tags.slice(0, 2).map((tag) => <span className={categoryClass(project.category)} key={tag}>{tag}</span>)}</div><span className="project-arrow"><ArrowUpRight size={17} /></span></div></Link></Reveal>)}</div></section>
    <section className="home-closing-modern"><div className="container home-closing-modern-inner"><div><SectionLabel>Next step</SectionLabel><h2>Open to marketing internships.</h2></div><Link to="/contact" className="button button-orange">Let’s Talk <ArrowUpRight size={16} /></Link></div></section>
  </>;
}

function About() {
  const skills = [{ name: 'Consumer Behavior', icon: Brain }, { name: 'Brand Strategy', icon: Target }, { name: 'Content Strategy', icon: Sparkles }, { name: 'SEO', icon: Search }, { name: 'Social Media', icon: Instagram }, { name: 'Qualitative Research', icon: Compass }, { name: 'Excel', icon: Award }, { name: 'Leadership', icon: UsersRound }];
  return <><Seo title="About Mairaj Abbas | BBA Marketing, Jenabai Scholar" description="Meet Mairaj Abbas, an IBA Karachi BBA Marketing student and Jenabai Scholar focused on brand management." /><PageBanner title="About Me" current="About Me" /><section className="container about-overview"><div className="about-photo-panel"><ProfileImage className="about-profile" /><span className="accent-circle accent-circle-one" /><span className="accent-circle accent-circle-two" /></div><div className="about-overview-copy"><SectionLabel>About Me</SectionLabel><h2>Insight into <span>action</span></h2><p className="about-bio">I build content and education initiatives where insight becomes useful action.</p><div className="about-info-card"><div><small>Name</small><strong>Mairaj Abbas</strong></div><div><small>Education</small><strong>BBA Marketing, IBA Karachi</strong></div><div><small>Hometown</small><strong>Skardu, Gilgit-Baltistan</strong></div><div><small>Focus</small><strong>Brand Management</strong></div></div><div className="about-actions"><Link to="/contact" className="button button-orange">Contact Me <ArrowUpRight size={15} /></Link><a href="/Mairaj-Abbas-Resume.pdf" className="button button-outline-orange" download>Download My Résumé <ArrowUpRight size={15} /></a></div></div></section><MyStory /><section className="alternate-section skills-section"><div className="container"><div className="centered-heading"><SectionLabel>Capabilities</SectionLabel><h2>My <span>Skills</span></h2></div><div className="skills-modern-grid">{skills.map(({ name, icon: Icon }) => <article className="skill-modern-card" key={name}><Icon size={22} /><h3>{name}</h3></article>)}</div></div></section><section className="dark-cta-band"><div className="container dark-cta-inner"><h2>Let’s work together.</h2><Link to="/contact" className="button button-orange">Contact Me <ArrowUpRight size={15} /></Link></div></section></>;
}

function NotFound() { return <section className="not-found-modern"><div className="container"><SectionLabel>404</SectionLabel><h1>That page took a <span>wrong turn.</span></h1><Link to="/" className="button button-orange">Back home <ArrowUpRight size={16} /></Link></div></section>; }
function App() { return <BrowserRouter><Layout><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/portfolio" element={<Portfolio />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></Layout></BrowserRouter>; }
export default App;
