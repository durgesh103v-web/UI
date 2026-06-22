import React, { useEffect, useRef } from 'react';
import FallingScene from './FallingScene';

const FIGMA_URL = 'https://www.figma.com/community/file/1268352321000064567';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      section.style.setProperty('--pointer-x', x.toFixed(3));
      section.style.setProperty('--pointer-y', y.toFixed(3));
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const scrollToContent = () => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={sectionRef} id="top" className="hero-stage">
      <FallingScene />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-copy">
        <h1>Land a <em>killer</em> job in<br className="hidden sm:block" /> product design</h1>
        <p>Get the free step-by-step guide to the product design interview process.</p>
        <a href={FIGMA_URL} target="_blank" rel="noreferrer" className="hero-button">
          Download on Figma <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <button className="hero-scroll" type="button" onClick={scrollToContent}>
        Learn more <span aria-hidden="true">&darr;</span>
      </button>
    </section>
  );
};

export default Hero;
