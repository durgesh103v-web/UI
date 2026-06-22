import React from 'react';
import { Feature, Chapter, SceneObject } from '../types';

export const features: Feature[] = [
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

export const chapters: Chapter[] = [
  {
    thumb: 'thumb-designportfolio',
    title: 'Build the portfolio',
    bullets: [
      'Tools for building portfolios',
      'Why portfolios are important',
      'What makes a portfolio great',
      'Who portfolios are for',
      '50+ inspiring portfolios',
    ],
  },
  {
    thumb: 'thumb-casestudy',
    title: 'Craft the case study',
    bullets: [
      'How to choose your projects',
      'Writing compelling stories',
      'Visualizing the work',
      'Example case study breakdowns',
      'Case study inspiration',
    ],
  },
  {
    thumb: 'thumb-portfoliopresentation',
    title: 'Portfolio presentations',
    bullets: [
      'Introducing yourself',
      'Selecting projects to present',
      'Structuring the presentation',
      'Presentation slide examples',
      "How you're evaluated",
    ],
  },
  {
    thumb: 'thumb-resume',
    title: 'Resumes & cover letters',
    bullets: [
      'Communicating projects and work experience',
      'Tips on clear & concise writing',
      'Nailing the visual design',
      'Examples & breakdowns',
      'Writing cover letters',
    ],
  },
  {
    thumb: 'thumb-applying',
    title: 'Find & apply to jobs',
    bullets: [
      'Where to find design jobs',
      'Assessing potential job fit',
      'Determining where to apply',
      "Avoiding the 'cold apply'",
      'Staying sane while applying',
    ],
  },
  {
    thumb: 'thumb-behavioralinterview',
    title: 'Tackle the behavioral interview',
    bullets: [
      "Types of interviews you'll face & why",
      'Methods of answering questions',
      'Extensive example questions for each interview',
    ],
  },
  {
    thumb: 'thumb-technicalinterview',
    title: 'Design challenges',
    bullets: [
      'Solving whiteboard challenges',
      'Approaching app critiques',
      'The take-home challenge',
      "Why they exist and how you're evaluated",
    ],
  },
  {
    thumb: 'thumb-theoffer',
    title: 'The offer stage',
    bullets: [
      'Determining your target comp',
      'How to research real salary figures',
      'Negotiating compensation',
      'Asking for references',
    ],
  },
];

export const objects: SceneObject[] = [
  {
    id: 'application',
    className: 'scene-application',
    delay: 0.08,
    drift: 8,
    stackCenter: 0.15,
    spawnOffset: -14,
    content: <><span className="check">&#10003;</span><strong>Application<br />submitted!</strong></>,
  },
  {
    id: 'resume',
    className: 'scene-resume',
    delay: 0.34,
    drift: -4,
    stackCenter: 0.20,
    spawnOffset: 10,
    content: <><span className="resume-band" /><strong>Product Designer<br />Cruise</strong><p>We're building the world's most advanced self-driving vehicles.</p></>,
  },
  {
    id: 'tips',
    className: 'scene-tips',
    delay: 0.7,
    drift: 18,
    stackCenter: 0.27,
    spawnOffset: -8,
    content: <><b>8</b><span>chapters of juicy<br />tips &amp; tricks</span></>,
  },
  {
    id: 'compass',
    className: 'scene-compass',
    delay: 1.04,
    drift: -22,
    stackCenter: 0.33,
    spawnOffset: 8,
    content: <span>&#9670;</span>,
  },
  {
    id: 'early',
    className: 'scene-early',
    delay: 1.22,
    drift: 10,
    stackCenter: 0.38,
    spawnOffset: -6,
    content: <><strong>Great for early-<br />career designers</strong><p>Everything you need to land that first role.</p></>,
  },
  {
    id: 'portfolio',
    className: 'scene-portfolio',
    delay: 0.36,
    drift: -8,
    stackCenter: 0.66,
    spawnOffset: 12,
    content: <><div className="browser-bar"><b>Jane W.</b><span>Portfolio&nbsp;&nbsp;&nbsp; About</span></div><div className="portfolio-grid"><i /><i /><i /></div></>,
  },
  {
    id: 'mapper',
    className: 'scene-mapper',
    delay: 0.12,
    drift: 12,
    stackCenter: 0.60,
    spawnOffset: -10,
    content: <><div className="mini-window-dots">&#9679;&nbsp;&#9679;&nbsp;&#9679;</div><div className="map-lines" /><strong>Mapper</strong><small>iOS app for making maps</small></>,
  },
  {
    id: 'case-study',
    className: 'scene-case-study',
    delay: 0.86,
    drift: -16,
    stackCenter: 0.73,
    spawnOffset: 7,
    content: <>CRUSH<br />THE<br />CASE<br />STUDY</>,
  },
];
