import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

type SceneObject = {
  id: string;
  className: string;
  delay: number;
  drift: number;
  stackCenter: number;
  spawnOffset: number;
  content: React.ReactNode;
};

const objects: SceneObject[] = [
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

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const readDegrees = (element: HTMLElement, property: string) => {
  const value = getComputedStyle(element).getPropertyValue(property);
  return Number.parseFloat(value) || 0;
};

const FallingScene: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const objectRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let engine: Matter.Engine;
    let runner: Matter.Runner;
    let resizeTimer = 0;

    const startSimulation = () => {
      // Cleanup previous simulation
      if (runner) Matter.Runner.stop(runner);
      if (engine) Matter.Engine.clear(engine);

      scene.classList.remove('physics-active');
      objectRefs.current.forEach((element) => {
        if (!element) return;
        ['left', 'right', 'top', 'bottom', 'opacity', 'transform'].forEach((property) => element.style.removeProperty(property));
      });

      const sceneWidth = scene.clientWidth;
      const sceneHeight = scene.clientHeight;
      const elements = objectRefs.current.filter((element): element is HTMLDivElement => Boolean(element && element.offsetWidth));

      // Setup Matter engine
      engine = Matter.Engine.create();
      engine.world.gravity.y = 1.6;

      scene.classList.add('physics-active');

      const bodiesAndElements: Array<{ body: Matter.Body, element: HTMLDivElement, config: SceneObject }> = [];

      elements.forEach((element) => {
        const config = objects[Number(element.dataset.index)];
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const startAngle = readDegrees(element, '--start-rotate') * (Math.PI / 180);
        const targetX = clamp(sceneWidth * config.stackCenter - width / 2, -width * 0.18, sceneWidth - width * 0.82);
        const startX = clamp(targetX + config.spawnOffset, -width * 0.2, sceneWidth - width * 0.8);

        // Initial setup for CSS
        element.style.left = '0';
        element.style.right = 'auto';
        element.style.top = '0';
        element.style.bottom = 'auto';
        element.style.opacity = '0';

        // Matter.js positions bodies by their center
        const centerX = startX + width / 2;
        const centerY = -height - 120 - Number(element.dataset.index) * 42;

        const body = Matter.Bodies.rectangle(centerX, centerY, width, height, {
          angle: startAngle,
          restitution: 0.55, // bounciness
          friction: 0.8,
          frictionAir: 0.015,
          isSleeping: true, // we will wake it up based on delay
          density: 0.002
        });

        bodiesAndElements.push({ body, element, config });
        Matter.World.add(engine.world, body);
      });

      // Add floor and walls
      const floor = Matter.Bodies.rectangle(sceneWidth / 2, sceneHeight + 50, sceneWidth + 200, 100, { 
        isStatic: true,
        restitution: 0.35,
        friction: 0.8
      });
      const leftWall = Matter.Bodies.rectangle(-50, sceneHeight / 2, 100, sceneHeight * 2, { isStatic: true });
      const rightWall = Matter.Bodies.rectangle(sceneWidth + 50, sceneHeight / 2, 100, sceneHeight * 2, { isStatic: true });

      Matter.World.add(engine.world, [floor, leftWall, rightWall]);

      const startTime = performance.now();

      Matter.Events.on(engine, 'beforeUpdate', () => {
        const elapsed = (performance.now() - startTime) / 1000;
        bodiesAndElements.forEach(({ body, config, element }) => {
          // Wake up bodies when their delay is reached
          if (body.isSleeping && elapsed >= config.delay) {
            Matter.Sleeping.set(body, false);
            element.style.opacity = '1';
            // Apply gentle horizontal pull towards their stack center mimicking the original pull
            Matter.Body.setVelocity(body, { x: config.drift, y: body.velocity.y });
          } else if (!body.isSleeping) {
            // Very gentle force pulling them toward their designated column to help them stack
            const elWidth = element.offsetWidth;
            const targetX = clamp(sceneWidth * config.stackCenter, elWidth / 2, sceneWidth - elWidth / 2);
            const pullForce = (targetX - body.position.x) * 0.00002;
            Matter.Body.applyForce(body, body.position, { x: pullForce, y: 0 });
          }
        });
      });

      // Sync DOM on each tick
      Matter.Events.on(engine, 'afterUpdate', () => {
        bodiesAndElements.forEach(({ body, element }) => {
          if (body.isSleeping) return;
          const bodyX = body.position.x - element.offsetWidth / 2;
          const bodyY = body.position.y - element.offsetHeight / 2;
          const angleDeg = body.angle * (180 / Math.PI);
          element.style.transform = `translate3d(${bodyX.toFixed(2)}px, ${bodyY.toFixed(2)}px, 0) rotate(${angleDeg.toFixed(2)}deg)`;
        });
      });

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
    };

    startSimulation();

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(startSimulation, 160);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (runner) Matter.Runner.stop(runner);
      if (engine) Matter.Engine.clear(engine);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={sceneRef} className="falling-scene" aria-hidden="true">
      {objects.map(({ id, className, content }, index) => (
        <div
          ref={(element) => { objectRefs.current[index] = element; }}
          className={`falling-object ${className}`}
          data-index={index}
          key={id}
        >
          <div className="falling-object-inner">{content}</div>
        </div>
      ))}
    </div>
  );
};

export default FallingScene;
