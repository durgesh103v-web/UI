# The Interview Kit — Frontend Implementation

A React + TypeScript implementation of the `theinterviewkit.com` landing page reference.
The page focuses on a dark editorial layout, animated hero objects, scroll reveal sections, reusable cards, and responsive grids.

## Tech Stack

- React 18
- TypeScript
- Functional components and hooks
- Tailwind CSS
- CSS keyframe animations
- IntersectionObserver for scroll reveals

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm start
```

The app opens at:

```bash
http://localhost:3000
```

### Production build

```bash
npm run build
```

The optimized production files are generated inside the `build/` folder.

## Project Structure

```txt
src/
  components/
    Navbar.tsx
    Hero.tsx
    FallingScene.tsx
    Features.tsx
    Visuals.tsx
    Storytelling.tsx
    Chapters.tsx
    CTAAbout.tsx
    Footer.tsx
  App.tsx
  index.tsx
  index.css
```

## Assumptions Made

- The assignment is frontend-only, so there is no backend or authentication.
- The design reference was used for layout, visual hierarchy, dark theme, spacing, and animation behavior.
- Public image assets are referenced from the original website asset paths because the exact Figma/source assets were not included in the assignment package.
- CTA buttons point to the public Figma community file.

## Animation Details Added

- Hero background cards fall with stronger realistic bounce timing.
- Added liquid-style squash/stretch settling after impact so the cards feel like they flow softly instead of stopping hard.
- Added landing ripple/contact shadow/gloss effects to make the fall feel closer to the reference recording.
- Hero objects keep a subtle floating motion after landing.
- Hero scene responds slightly to pointer movement for a parallax feel.
- Sections reveal using IntersectionObserver.
- Feature cards, visual thumbnails, chapter cards, CTA, and author card have fade/slide/blur reveal animations.
- Cards have hover lift and tilt micro-interactions.
- Divider and starburst elements include small motion details.
- Motion respects `prefers-reduced-motion`.

## Additional Improvements

- Reusable component structure.
- Shared `useReveal` hook to avoid duplicated IntersectionObserver logic.
- Lazy/async image loading for below-the-fold visual sections.
- Typed data arrays for feature and chapter cards.
- Responsive desktop, tablet, and mobile layouts.
- Semantic HTML using nav, main, section, article, and footer.
- Clean README with setup, assumptions, and improvements.
