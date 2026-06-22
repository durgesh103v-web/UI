import React, { useRef } from 'react';

const CDN_ICONS = 'https://www.theinterviewkit.com/assets/img/icons';
const CDN_IMAGES = 'https://www.theinterviewkit.com/assets/img/images';

const useReveal = (ref: React.RefObject<HTMLElement>) => {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = el.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ref]);
};

interface Chapter {
  thumb: string;
  title: string;
  bullets: string[];
}

const chapters: Chapter[] = [
  {
    thumb: 'thumb-designportfolio',
    title: 'Build the portfolio',
    bullets: [
      'Tools for building portfolios',
      'Why portfolios are important',
      'What makes a portfolio great',
      'Who portfolios are for',
      '50+ inspiring portfolios',
    ],
  },
  {
    thumb: 'thumb-casestudy',
    title: 'Craft the case study',
    bullets: [
      'How to choose your projects',
      'Writing compelling stories',
      'Visualizing the work',
      'Example case study breakdowns',
      'Case study inspiration',
    ],
  },
  {
    thumb: 'thumb-portfoliopresentation',
    title: 'Portfolio presentations',
    bullets: [
      'Introducing yourself',
      'Selecting projects to present',
      'Structuring the presentation',
      'Presentation slide examples',
      "How you're evaluated",
    ],
  },
  {
    thumb: 'thumb-resume',
    title: 'Resumes & cover letters',
    bullets: [
      'Communicating projects and work experience',
      'Tips on clear & concise writing',
      'Nailing the visual design',
      'Examples & breakdowns',
      'Writing cover letters',
    ],
  },
  {
    thumb: 'thumb-applying',
    title: 'Find & apply to jobs',
    bullets: [
      'Where to find design jobs',
      'Assessing potential job fit',
      'Determining where to apply',
      "Avoiding the 'cold apply'",
      'Staying sane while applying',
    ],
  },
  {
    thumb: 'thumb-behavioralinterview',
    title: 'Tackle the behavioral interview',
    bullets: [
      "Types of interviews you'll face & why",
      'Methods of answering questions',
      'Extensive example questions for each interview',
    ],
  },
  {
    thumb: 'thumb-technicalinterview',
    title: 'Design challenges',
    bullets: [
      'Solving whiteboard challenges',
      'Approaching app critiques',
      'The take-home challenge',
      "Why they exist and how you're evaluated",
    ],
  },
  {
    thumb: 'thumb-theoffer',
    title: 'The offer stage',
    bullets: [
      'Determining your target comp',
      'How to research real salary figures',
      'Negotiating compensation',
      'Asking for references',
    ],
  },
];

const Chapters: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal chapter-panel">
          <div className="chapter-sun mb-5">
            <img src={`${CDN_ICONS}/starburst.svg`} alt="" />
          </div>

          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-light text-dark leading-tight mb-3">
              See what's inside
            </h2>
            <p className="text-muted text-sm mb-7">Eight chapters of delicious detail.</p>
            <a
              href="https://www.figma.com/community/file/1268352321000064567"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Download on Figma →
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {chapters.map((ch, i) => (
              <article
                key={ch.title}
                className="reveal chapter-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <img
                  src={`${CDN_IMAGES}/${ch.thumb}.png`}
                  alt={`Thumbnail for ${ch.title}`}
                  className="chapter-thumb w-full mb-4 object-cover"
                />
                <h3 className="font-medium text-dark mb-3 text-sm">{ch.title}</h3>
                <ul className="space-y-1.5">
                  {ch.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-muted">
                      <span className="text-accent mt-0.5 flex-shrink-0 font-medium">–</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chapters;
