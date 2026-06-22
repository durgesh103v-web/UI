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
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ref]);
};

const Visuals: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const gridImages = [
    ['grid-1', 'grid-3'],
    ['grid-2', 'grid-6'],
    ['grid-4', 'grid-5'],
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="reveal section-label reveal-left">Goes down easy</p>

        <h2 className="reveal font-display text-3xl sm:text-4xl font-light text-dark max-w-xl leading-tight mb-10">
          Created in Figma with tons of juicy examples and visuals.
        </h2>

        <div className="reveal visual-grid grid grid-cols-3 gap-3 sm:gap-5 mb-12">
          {gridImages.map((pair, colIdx) => (
            <div key={colIdx} className="tilt-card flex flex-col gap-3 sm:gap-5">
              {pair.map((img, rowIdx) => (
                <img
                  key={img}
                  src={`${CDN_IMAGES}/${img}.png`}
                  alt="Thumbnail of a page of text and images"
                  className="visual-thumb w-full rounded-xl object-cover shadow-sm"
                  style={{ animationDelay: `${(colIdx * 2 + rowIdx) * 0.06}s` }}
                />
              ))}
            </div>
          ))}
        </div>

        <p className="reveal text-muted max-w-xl leading-relaxed mb-12">
          Eight chapters of guides, examples, tips &amp; tricks that'll help you land your next (or first) role as a product designer. Written with expert insight about the interview process.
        </p>

        <img src={`${CDN_ICONS}/divider.svg`} alt="" className="reveal divider-line w-full mb-12 opacity-40" />

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="reveal info-card tilt-card">
            <img
              src={`${CDN_ICONS}/icon-beginner.svg`}
              alt=""
              className="w-8 h-8 mb-4"
            />
            <h3 className="font-medium text-dark mb-2">Great for early-career designers</h3>
            <p className="text-sm text-muted leading-relaxed">
              Looking for your first internship or full-time job? No problem – this kit is created with you in mind.
            </p>
          </div>
          <div className="reveal info-card tilt-card stagger-2">
            <img
              src={`${CDN_ICONS}/icon-experienced.svg`}
              alt=""
              className="w-8 h-8 mb-4"
            />
            <h3 className="font-medium text-dark mb-2">...And also more experienced ones</h3>
            <p className="text-sm text-muted leading-relaxed">
              Even if you've interviewed before, The Interview Kit is the perfect refresher for your next job hunt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visuals;
