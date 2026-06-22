import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

import { chapters } from '../data/content';
import { CDN_ICONS, CDN_IMAGES, FIGMA_URL } from '../config/constants';

const Chapters: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal chapter-panel">
          <div className="chapter-sun mb-5">
            <img src={`${CDN_ICONS}/starburst.svg`} alt="" loading="lazy" decoding="async" />
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
                  loading="lazy"
                  decoding="async"
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
