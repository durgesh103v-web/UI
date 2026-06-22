import React from 'react';

const CDN = 'https://www.theinterviewkit.com/assets/img/icons';

const Navbar: React.FC = () => (
  <nav className="hero-nav" aria-label="Main navigation">
    <a href="#top" className="hero-logo" aria-label="The Interview Kit, back to top">
      <img src={`${CDN}/compass.svg`} alt="" />
      <img src={`${CDN}/logotext.svg`} alt="The Interview Kit" />
    </a>
  </nav>
);

export default Navbar;
