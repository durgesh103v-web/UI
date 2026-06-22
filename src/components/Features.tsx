import React, { useEffect, useRef } from 'react';

const CDN_ICONS = 'https://www.theinterviewkit.com/assets/img/icons';
const CDN_IMAGES = 'https://www.theinterviewkit.com/assets/img/images';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: 'icon-portfolio',
    title: 'Build a portfolio',
    description: 'Learn how to level up your portfolio and how to showcase your work like a pro.',
  },
  {
    icon: 'icon-casestudy',
    title: 'Craft your case studies',
    description: 'Show employers compelling stories about your best design work.',
  },
  {
    icon: 'icon-technical',
    title: 'Solve design challenges',
    description: 'Know what to expect with technical evaluations like design challenges and app critiques.',
  },
  {
    icon: 'icon-interview',
    title: 'Ace the interviews',
    description: 'Detailed guides to on-site interviews, screener calls, hiring manager 1:1s, and more.',
  },
];

const useReveal = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
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
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ref]);
};

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
