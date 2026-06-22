import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const CDN_IMAGES = 'https://www.theinterviewkit.com/assets/img/images';

const CTAAbout: React.FC = () => {
  const ctaRef = useRef<HTMLElement>(null);
  const authorRef = useRef<HTMLElement>(null);
  useReveal(ctaRef);
  useReveal(authorRef);

  return (
    <>
      {/* Ready to interview CTA */}
      <section ref={ctaRef} className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="reveal cta-glow-card relative rounded-3xl overflow-hidden">
            <img
              src={`${CDN_IMAGES}/image-readytointerview.png`}
              alt="Three pages from The Interview Kit."
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/65 backdrop-blur-[2px] p-10">
              <h2 className="font-display text-3xl sm:text-5xl font-light text-dark leading-tight mb-3">
                Ready to interview?
              </h2>
              <p className="text-white/60 mb-8 text-base">
                Get immediate access to The Interview Kit for free.
              </p>
              <a
                href="https://www.figma.com/community/file/1268352321000064567"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Download on Figma →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About the author */}
      <section ref={authorRef} className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="reveal author-card flex flex-col sm:flex-row items-start gap-8">
            {/* Profile picture */}
            <img
              src={`${CDN_IMAGES}/profile-picture.png`}
              alt="A photograph of the author."
              loading="lazy"
              decoding="async"
              className="flex-shrink-0 w-20 h-20 rounded-full object-cover border border-border"
            />
            <div>
              <p className="text-dark leading-relaxed mb-4">
                Hello! My name is{' '}
                <a href="https://oliverengel.com/" target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">
                  Oliver
                </a>
                .
              </p>
              <p className="text-muted text-sm leading-relaxed mb-4">
                I'm a Senior Product Designer at{' '}
                <a href="https://joinhandshake.com/" target="_blank" rel="noreferrer" className="text-dark underline underline-offset-2 hover:text-accent transition-colors">
                  Handshake
                </a>{' '}
                and graduate of University of Washington's{' '}
                <a href="https://mhcid.washington.edu/" target="_blank" rel="noreferrer" className="text-dark underline underline-offset-2 hover:text-accent transition-colors">
                  Master of Human-Computer Interaction + Design
                </a>{' '}
                program. I created this guide because it's something I wish I had when I was breaking into product design.
              </p>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Throughout my years in design, I've been fortunate enough to interview with dozens of different companies and also help interview countless product design candidates. This kit is intended to share my experience and advice from being on both sides of the interview process.
              </p>
              <p className="text-muted text-sm leading-relaxed">
                This kit is also informed by research and discussions with recruiters, design managers, and other product designers. If you have any questions or feedback, please feel free to reach out to me at{' '}
                <a href="mailto:oliverengel6@gmail.com" className="text-accent hover:underline">
                  oliverengel6@gmail.com
                </a>
                .
              </p>
              <div className="mt-6">
                <a
                  href="https://www.figma.com/community/file/1268352321000064567"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Download on Figma →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTAAbout;
