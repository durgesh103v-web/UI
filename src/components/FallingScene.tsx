import React, { useEffect, useRef } from 'react';

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

type Body = {
  element: HTMLDivElement;
  x: number;
  y: number;
  targetX: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  angularVelocity: number;
  mass: number;
  delay: number;
  squash: number;
  kick: number;
  active: boolean;
};

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

    let frame = 0;
    let resizeTimer = 0;
    let stopped = false;

    const startSimulation = () => {
      cancelAnimationFrame(frame);
      scene.classList.remove('physics-active');
      objectRefs.current.forEach((element) => {
        if (!element) return;
        ['left', 'right', 'top', 'bottom', 'opacity', 'transform'].forEach((property) => element.style.removeProperty(property));
      });

      const sceneWidth = scene.clientWidth;
      const sceneHeight = scene.clientHeight;
      const elements = objectRefs.current.filter((element): element is HTMLDivElement => Boolean(element && element.offsetWidth));

      const bodies: Body[] = elements.map((element) => {
        const config = objects[Number(element.dataset.index)];
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const startAngle = readDegrees(element, '--start-rotate');
        const endAngle = readDegrees(element, '--end-rotate');
        const targetX = clamp(sceneWidth * config.stackCenter - width / 2, -width * 0.18, sceneWidth - width * 0.82);
        const startX = clamp(targetX + config.spawnOffset, -width * 0.2, sceneWidth - width * 0.8);

        return {
          element,
          x: startX,
          y: -height - 120 - Number(element.dataset.index) * 42,
          targetX,
          width,
          height,
          velocityX: config.drift,
          velocityY: 0,
          angle: startAngle,
          angularVelocity: (endAngle - startAngle) / 1.2,
          mass: Math.max(1, width * height / 15000),
          delay: config.delay,
          squash: 0,
          kick: 0,
          active: false,
        };
      });

      scene.classList.add('physics-active');
      bodies.forEach((body) => {
        body.element.style.left = '0';
        body.element.style.right = 'auto';
        body.element.style.top = '0';
        body.element.style.bottom = 'auto';
      });

      const startedAt = performance.now();
      let previousTime = startedAt;

      const collide = (upper: Body, lower: Body) => {
        const upperBottom = upper.y + upper.height;
        const lowerTop = lower.y;
        const penetration = upperBottom - lowerTop;
        if (penetration <= 0) return;

        const overlap = Math.min(upper.x + upper.width, lower.x + lower.width) - Math.max(upper.x, lower.x);
        const neededOverlap = Math.min(upper.width, lower.width) * 0.08;
        if (overlap <= neededOverlap) return;
        if (upper.y + upper.height * 0.45 >= lower.y + lower.height * 0.55) return;

        const relativeVelocity = upper.velocityY - lower.velocityY;
        const impact = Math.max(0, relativeVelocity);
        const correction = penetration + 0.7;

        // Keep the top object resting on the lower object instead of letting both fall to the floor.
        upper.y -= correction * 0.88;
        lower.y += correction * 0.12;

        const offset = (upper.x + upper.width / 2 - (lower.x + lower.width / 2)) / Math.max(42, lower.width / 2);
        const bounce = impact > 180 ? Math.min(420, impact * 0.42) : Math.min(70, impact * 0.18);

        if (impact > 20) {
          upper.velocityY = -bounce;
          // This fake upward kick gives the visible "box below jumps" effect from the reference video.
          lower.velocityY = Math.min(lower.velocityY, -Math.min(145, impact * 0.16));
          upper.velocityX += offset * Math.min(impact, 760) * 0.12;
          lower.velocityX -= offset * Math.min(impact, 760) * 0.045;
          upper.angularVelocity += offset * Math.min(impact, 760) * 0.04;
          lower.angularVelocity -= offset * Math.min(impact, 760) * 0.015;
          upper.squash = Math.max(upper.squash, Math.min(1, impact / 620));
          lower.kick = Math.max(lower.kick, Math.min(1, impact / 680));
          lower.squash = Math.max(lower.squash, Math.min(0.8, impact / 900));
        } else {
          upper.velocityY = Math.min(upper.velocityY, 0);
        }

        const friction = 0.82;
        upper.velocityX *= friction;
        lower.velocityX *= friction;
      };

      const tick = (time: number) => {
        if (stopped) return;
        const elapsed = (time - startedAt) / 1000;
        const delta = Math.min((time - previousTime) / 1000, 0.032);
        previousTime = time;

        bodies.forEach((body) => {
          if (!body.active && elapsed >= body.delay) body.active = true;
          if (!body.active) return;

          body.velocityY += 1580 * delta;
          body.x += body.velocityX * delta;
          body.y += body.velocityY * delta;
          body.angle += body.angularVelocity * delta;

          // Pull every item gently toward its stack column so objects actually collide and pile up.
          body.velocityX += (body.targetX - body.x) * delta * 6.2;
          body.velocityX *= Math.pow(0.986, delta * 60);
          body.angularVelocity *= Math.pow(0.988, delta * 60);
          body.squash *= Math.pow(0.82, delta * 60);
          body.kick *= Math.pow(0.72, delta * 60);

          const sideLimit = body.width * 0.2;
          if (body.x < -sideLimit) {
            body.x = -sideLimit;
            body.velocityX = Math.abs(body.velocityX) * 0.38;
          } else if (body.x + body.width > sceneWidth + sideLimit) {
            body.x = sceneWidth + sideLimit - body.width;
            body.velocityX = -Math.abs(body.velocityX) * 0.38;
          }
        });

        for (let pass = 0; pass < 6; pass += 1) {
          const activeBodies = bodies.filter((body) => body.active).sort((a, b) => a.y - b.y);

          for (let i = 0; i < activeBodies.length; i += 1) {
            for (let j = i + 1; j < activeBodies.length; j += 1) {
              collide(activeBodies[i], activeBodies[j]);
            }
          }

          activeBodies.forEach((body) => {
            if (body.y + body.height < sceneHeight) return;
            body.y = sceneHeight - body.height;

            if (body.velocityY > 72) {
              body.squash = Math.max(body.squash, Math.min(1, body.velocityY / 720));
              body.velocityY *= -0.26;
            } else if (body.velocityY >= 0) {
              body.velocityY = 0;
            }

            body.velocityX *= 0.72;
            body.angularVelocity *= 0.68;
          });
        }

        bodies.forEach((body) => {
          if (!body.active) return;
          const squashAmount = Math.max(body.squash, body.kick * 0.55);
          const scaleX = 1 + squashAmount * 0.075;
          const scaleY = 1 - squashAmount * 0.105;
          const kickLift = -body.kick * 9;
          body.element.style.opacity = '1';
          body.element.style.transform = `translate3d(${body.x.toFixed(2)}px, ${(body.y + kickLift).toFixed(2)}px, 0) rotate(${body.angle.toFixed(2)}deg) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
        });

        frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    startSimulation();
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(startSimulation, 160);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
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
