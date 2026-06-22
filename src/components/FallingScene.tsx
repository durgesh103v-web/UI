import React from 'react';

type SceneObject = { id: string; className: string; content: React.ReactNode };

const objects: SceneObject[] = [
  { id: 'application', className: 'scene-application', content: <><span className="check">&#10003;</span><strong>Application<br />submitted!</strong></> },
  { id: 'resume', className: 'scene-resume', content: <><span className="resume-band" /><strong>Product Designer<br />Cruise</strong><p>We're building the world's most advanced self-driving vehicles.</p></> },
  { id: 'tips', className: 'scene-tips', content: <><b>8</b><span>chapters of juicy<br />tips &amp; tricks</span></> },
  { id: 'compass', className: 'scene-compass', content: <span>&#9670;</span> },
  { id: 'early', className: 'scene-early', content: <><strong>Great for early-<br />career designers</strong><p>Everything you need to land that first role.</p></> },
  { id: 'portfolio', className: 'scene-portfolio', content: <><div className="browser-bar"><b>Jane W.</b><span>Portfolio&nbsp;&nbsp;&nbsp; About</span></div><div className="portfolio-grid"><i /><i /><i /></div></> },
  { id: 'mapper', className: 'scene-mapper', content: <><div className="mini-window-dots">&#9679;&nbsp;&#9679;&nbsp;&#9679;</div><div className="map-lines" /><strong>Mapper</strong><small>iOS app for making maps</small></> },
  { id: 'case-study', className: 'scene-case-study', content: <>CRUSH<br />THE<br />CASE<br />STUDY</> },
];

const FallingScene: React.FC = () => (
  <div className="falling-scene" aria-hidden="true">
    {objects.map(({ id, className, content }) => (
      <div className={`falling-object ${className}`} key={id}>
        <div className="falling-object-inner">{content}</div>
      </div>
    ))}
  </div>
);

export default FallingScene;
