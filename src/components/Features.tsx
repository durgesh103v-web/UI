import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

import { features } from '../data/content';
import { CDN_ICONS, CDN_IMAGES } from '../config/constants';

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="reveal section-label reveal-left">Jumpstart your job search</p>

        <h2 className="reveal font-display text-3xl sm:text-4xl font-light text-dark max-w-xl leading-tight mb-8">
          The Interview Kit is a comprehensive guide to getting a job in product design.
        </h2>

        <div className="reveal image-frame float-card mb-10">
          <img
            src={`${CDN_IMAGES}/pages-desktop.png`}
            alt="Pages from The Interview Kit"
            loading="lazy"
            decoding="async"
            className="section-image w-full object-cover"
          />
        </div>

        <p className="reveal text-muted max-w-xl leading-relaxed mb-14">
          Everything you need to know to land a product design job, from the resume to the on-site. All packaged into a delightful little guide.
        </p>

        <img src={`${CDN_ICONS}/divider.svg`} alt="" className="reveal divider-line w-full mb-14 opacity-40" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`reveal feature-card stagger-${Math.min(i + 1, 4)}`}
            >
              <img
                src={`${CDN_ICONS}/${f.icon}.svg`}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-8 h-8 mb-5"
              />
              <h3 className="font-medium text-dark mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
