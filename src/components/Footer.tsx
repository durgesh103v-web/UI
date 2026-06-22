import React from 'react';

const CDN = 'https://www.theinterviewkit.com/assets/img/icons';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#top" className="footer-logo flex items-center gap-2">
          <img src={`${CDN}/compass.svg`} alt="" className="w-5 h-5" />
          <img src={`${CDN}/logotext.svg`} alt="The Interview Kit" className="h-3.5" />
        </a>
        <p className="text-xs text-muted">The Interview Kit ― © 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
