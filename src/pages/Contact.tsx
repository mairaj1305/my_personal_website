import { useEffect, useMemo, useState, type CSSProperties, type FormEvent, type PointerEvent, type ReactNode } from 'react';
import { ArrowUpRight, Check, Copy, Instagram, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { contactDetails } from '@/data/contact';

type Topic = 'Internship' | 'Collaboration' | 'Skardu Minds' | 'Feedback' | 'Just saying hi';
const topics: Topic[] = ['Internship', 'Collaboration', 'Skardu Minds', 'Feedback', 'Just saying hi'];

function formatWhatsAppUrl(number: string): string {
  return `https://wa.me/${encodeURIComponent(number.replace(/[^\d+]/g, ''))}?text=${encodeURIComponent('Hi Mairaj, I found your portfolio and wanted to connect.')}`;
}

function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty('--contact-rx', `${(0.5 - y) * 8}deg`);
    event.currentTarget.style.setProperty('--contact-ry', `${(x - 0.5) * 8}deg`);
  };
  const reset = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--contact-rx', '0deg');
    event.currentTarget.style.setProperty('--contact-ry', '0deg');
  };
  return <div className={`contact-tilt ${className}`} onPointerMove={handleMove} onPointerLeave={reset}>{children}</div>;
}

function KarachiClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', hour: 'numeric', minute: '2-digit' }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return <span>{time ? `It's ${time} in Karachi` : 'Karachi time loading'}</span>;
}

function ContactCard({ href, icon: Icon, label, detail, color, external = true, children }: { href: string; icon: typeof Mail; label: string; detail: string; color: string; external?: boolean; children?: ReactNode }) {
  return (
    <TiltCard className="contact-quick-wrap">
      <a className={`contact-quick contact-quick-${color}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
        <span className="contact-quick-icon"><Icon size={23} aria-hidden="true" /></span>
        <span className="contact-quick-copy"><strong>{label}</strong><small>{detail}</small></span>
        <ArrowUpRight className="contact-quick-arrow" size={20} aria-hidden="true" />
      </a>
      {children}
    </TiltCard>
  );
}

function ContactForm() {
  const [topic, setTopic] = useState<Topic>('Internship');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailTouched(true);
    if (!emailValid || !message.trim()) return;
    setSending(true);
    setError(false);
    const form = event.currentTarget;
    const data = new URLSearchParams();
    new FormData(form).forEach((value, key) => data.append(key, String(value)));
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data.toString() });
      if (!response.ok) throw new Error('Form submission failed');
      setSent(true);
      form.reset();
      setMessage('');
      setEmail('');
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSent(false);
    setError(false);
    setEmailTouched(false);
    setMessage('');
    setEmail('');
    setTopic('Internship');
  };

  if (sent) {
    return <div className="contact-success" role="status"><div className="contact-confetti" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} style={{ '--confetti-index': index } as CSSProperties} />)}</div><span className="contact-plane"><Send size={26} aria-hidden="true" /></span><span className="contact-success-check"><Check size={25} aria-hidden="true" /></span><h3>Message sent. Talk soon!</h3><button type="button" className="contact-text-button" onClick={reset}>Send another</button></div>;
  }

  return (
    <form className="contact-fun-form" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} noValidate>
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="topic" value={topic} />
      <input className="contact-honeypot" name="bot-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <fieldset className="contact-topic-fieldset">
        <legend>What brings you here?</legend>
        <div className="contact-topic-list">
          {topics.map((item) => <button type="button" className={`contact-topic ${topic === item ? 'is-selected' : ''}`} aria-pressed={topic === item} onClick={() => setTopic(item)} key={item}>{item}</button>)}
        </div>
      </fieldset>
      <div className="contact-field-row">
        <label className="contact-floating-field" htmlFor="contact-name"><input id="contact-name" name="name" placeholder=" " required /><span>Name</span></label>
        <label className="contact-floating-field" htmlFor="contact-email"><input id="contact-email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} onBlur={() => setEmailTouched(true)} placeholder=" " required /><span>Email</span></label>
      </div>
      {emailTouched && !emailValid && <p className="contact-inline-error" role="alert">Almost there, add a valid email.</p>}
      <label className="contact-floating-field contact-message-field" htmlFor="contact-message"><textarea id="contact-message" name="message" value={message} onChange={(event) => setMessage(event.target.value.slice(0, 500))} placeholder=" " rows={5} required /><span>Message</span><small>{message.length}/500</small></label>
      {error && <p className="contact-form-error" role="alert">That did not go through. Please email me directly instead.</p>}
      <button className="button button-orange contact-submit" type="submit" disabled={sending}>{sending ? <span className="contact-spinner" aria-label="Sending" /> : <>Send it <span aria-hidden="true">🚀</span><ArrowUpRight size={16} aria-hidden="true" /></>}</button>
    </form>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const whatsappUrl = useMemo(() => formatWhatsAppUrl(contactDetails.whatsappNumber), []);
  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactDetails.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return <>
    <Seo title="Contact Mairaj Abbas | Marketing Internships and Collaborations" description="Contact Mairaj Abbas about marketing internships, collaborations, Skardu Minds, or a thoughtful idea." />
    <section className="contact-page-hero"><span className="contact-hero-blur" aria-hidden="true" /><div className="contact-dot-grid" aria-hidden="true" /><div className="container contact-hero-inner"><nav className="contact-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">Contact</span></nav><span className="eyebrow">Say Hello</span><h1>Let’s build something <span>worth remembering.</span> <span className="contact-wave" aria-hidden="true">👋</span></h1><p>Pick the easiest way to reach me.</p></div></section>
    <main className="contact-page-main">
      <section className="container contact-quick-section" aria-label="Quick contact options">
        <div className="contact-quick-grid">
          <ContactCard href={`mailto:${contactDetails.email}`} icon={Mail} label="Email" detail={contactDetails.email} color="orange" external={false}><button type="button" className="contact-copy-button" onClick={copyEmail}><Copy size={14} aria-hidden="true" /> {copied ? 'Copied!' : 'Copy'}</button></ContactCard>
          <ContactCard href={whatsappUrl} icon={MessageCircle} label="WhatsApp" detail="Start a conversation" color="green" />
          <ContactCard href={contactDetails.linkedInUrl} icon={Linkedin} label="LinkedIn" detail="Connect professionally" color="blue" />
          <ContactCard href={contactDetails.instagramUrl} icon={Instagram} label="Instagram" detail={contactDetails.instagramLabel} color="peach" />
        </div>
        <div className="contact-status"><span className="contact-status-dot" aria-hidden="true" /><strong>Open to internships and collaborations</strong><span className="contact-status-divider" /><KarachiClock /><span className="contact-status-divider" /><span>I usually reply within 24 hours.</span></div>
      </section>
      <section className="container contact-form-section"><div className="contact-form-heading"><span className="eyebrow">Or drop a note</span><h2>Say it <span>your way.</span></h2></div><ContactForm /></section>
      <section className="container contact-resume-strip"><span>Prefer to read first?</span><a className="button button-outline-orange" href="/Mairaj-Abbas-Resume.pdf" download>Download Résumé <ArrowUpRight size={16} aria-hidden="true" /></a></section>
      <p className="contact-rooted-line">Made in Karachi. Rooted in Skardu.</p>
    </main>
  </>;
}
