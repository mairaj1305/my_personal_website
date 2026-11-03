import { aboutStory } from '@/data/about';

export function MyStory() {
  const { heading } = aboutStory;

  return (
    <section className="container about-story" aria-labelledby="about-story-heading">
      <div className="about-story-copy">
        <span className="about-story-pill">{aboutStory.pill}</span>
        <h2 id="about-story-heading">
          {heading.before}
          <span>{heading.accent}</span>
          {heading.after}
        </h2>
        {aboutStory.paragraphs.map((paragraph, index) => (
          <div className="about-story-para" key={index}>
            {index === 0 && <span className="about-story-quote" aria-hidden="true">“</span>}
            <p>{paragraph}</p>
          </div>
        ))}
      </div>
      <ul className="about-story-stats">
        {aboutStory.highlights.map(({ icon: Icon, title, detail }) => (
          <li className="about-story-stat" key={title}>
            <span className="about-story-stat-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <div>
              <strong>{title}</strong>
              {detail && <small>{detail}</small>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
