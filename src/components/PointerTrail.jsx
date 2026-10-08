import { useEffect, useRef, useState } from 'react';

const MARK_LIFETIME = 980;
const MAX_MARKS = 14;
// Only drop a new mark after the pointer has travelled this far, so a fast
// mouse doesn't trigger a React render on every mousemove event.
const MIN_MARK_DISTANCE = 18;

export default function PointerTrail() {
  const [marks, setMarks] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timers = new Set();
    let lastMark = null;
    let pendingPoint = null;
    let frame = 0;

    const addMark = () => {
      frame = 0;
      const { x, y } = pendingPoint;
      if (lastMark && Math.hypot(x - lastMark.x, y - lastMark.y) < MIN_MARK_DISTANCE) {
        return;
      }

      const id = nextId.current++;
      const mark = {
        id,
        x,
        y,
        rotation: (id % 2 ? -1 : 1) * (8 + (id % 4) * 4)
      };
      lastMark = mark;

      setMarks(currentMarks => [...currentMarks.slice(-MAX_MARKS + 1), mark]);

      const timer = window.setTimeout(() => {
        setMarks(currentMarks => currentMarks.filter(currentMark => currentMark.id !== id));
        timers.delete(timer);
      }, MARK_LIFETIME);

      timers.add(timer);
    };

    const handleMouseMove = event => {
      pendingPoint = { x: event.clientX, y: event.clientY };
      if (!frame) {
        frame = window.requestAnimationFrame(addMark);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.cancelAnimationFrame(frame);
      timers.forEach(timer => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="pointer-trail" aria-hidden="true">
      {marks.map(mark => (
        <span
          className="pointer-mark"
          key={mark.id}
          style={{ left: mark.x, top: mark.y, '--mark-rotation': `${mark.rotation}deg` }}
        >
          प्र
        </span>
      ))}
    </div>
  );
}
