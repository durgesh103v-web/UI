import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const CDN_ICONS = 'https://www.theinterviewkit.com/assets/img/icons';
const CDN_IMAGES = 'https://www.theinterviewkit.com/assets/img/images';

const Storytelling: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="reveal section-label reveal-left">Craft your story &amp; stand out</p>

        <h2 className="reveal font-display text-3xl sm:text-4xl font-light text-dark leading-tight max-w-xl mb-10">
          Interviewing is all about telling a story. Learn how to tell a great one.
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

        <p className="reveal text-muted max-w-xl leading-relaxed mb-12">
          Learn how to tell stories about your work and design experience. Get inspired by examples from great designers and companies.
        </p>

        <img src={`${CDN_ICONS}/divider.svg`} alt="" loading="lazy" decoding="async" className="reveal divider-line w-full mb-12 opacity-40" />

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="reveal info-card tilt-card">
            <img src={`${CDN_ICONS}/icon-cheatsheet.svg`} alt="" loading="lazy" decoding="async" className="w-8 h-8 mb-4" />
            <h3 className="font-medium text-dark mb-2">Your interviewing cheat sheet</h3>
            <p className="text-sm text-muted leading-relaxed">
              Get insights on the questions you'll be asked in every interview, and how to answer them.
            </p>
          </div>
          <div className="reveal info-card tilt-card stagger-2">
            <img src={`${CDN_ICONS}/icon-standout.svg`} alt="" loading="lazy" decoding="async" className="w-8 h-8 mb-4" />
            <h3 className="font-medium text-dark mb-2">Make your story stand out</h3>
            <p className="text-sm text-muted leading-relaxed">
              Most designers tell the same stories about their work. Learn how to tell yours like an expert.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Storytelling;
