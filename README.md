# The Interview Kit - Senior Frontend Developer Evaluation

This is a pixel-perfect, highly optimized implementation of [The Interview Kit](https://www.theinterviewkit.com/) landing page, built as part of the Senior Frontend Developer evaluation process.

## Setup Instructions

1. Ensure you have Node.js (v18+ recommended) installed.
2. Clone the repository and navigate into the project directory.
3. Run the following commands:

```bash
# Install dependencies
npm install

# Start the local development server (runs on localhost:3000)
npm start

# Build the project for production
npm run build
```

## Assumptions Made

- **Visual Fidelity**: The primary objective was a 1:1 pixel-perfect recreation of the original site, including typography, responsive clamps, and complex layout arrangements. 
- **Physics Engine**: The interactive falling elements at the top of the page required true rigid-body collision to stack and rest naturally without slipping or jittering. I assumed that using an industry-standard 2D physics engine (`matter.js`) was preferred over a manual, less performant Euler integration loop.
- **State Management**: Because this is a static landing page without complex user flows, heavy state management libraries (like Redux or Zustand) were intentionally omitted in favor of simple React hooks and a clean architectural separation of data and UI.

## Additional Improvements

- **Matter.js Integration**: Completely rewrote the `FallingScene` physics using `matter.js`. This eliminated layout thrashing caused by constant DOM `getComputedStyle` reads within a `requestAnimationFrame` loop, resulting in a buttery-smooth 60 FPS experience and perfectly stable object stacking.
- **Senior-Level Architecture**: Decoupled all hardcoded content arrays and magic strings from the React components. Data is now securely managed in `src/data/content.tsx` and `src/config/constants.ts`, ensuring the UI components are reusable and maintainable.
- **Strict Type Safety**: Implemented global TypeScript interfaces (`src/types/index.ts`) for all data structures (Features, Chapters, SceneObjects).
- **Performant Animations**: Utilized `IntersectionObserver` via a custom `useReveal` hook to handle scroll animations, avoiding the severe performance penalties of generic `window.onscroll` event listeners.
- **Semantic Versioning**: Maintained a clean, professional Git commit history utilizing standard semantic commit messages to demonstrate version control best practices.
