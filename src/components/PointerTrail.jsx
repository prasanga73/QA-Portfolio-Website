import { useEffect, useRef, useState } from 'react';

const MARK_LIFETIME = 980;
const MAX_MARKS = 14;

export default function PointerTrail() {
  const [marks, setMarks] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    const timers = new Set();

    const handleMouseMove = event => {
      const id = nextId.current++;
      const mark = {
        id,
        x: event.clientX,
        y: event.clientY,
        rotation: (id % 2 ? -1 : 1) * (8 + (id % 4) * 4)
      };

      setMarks(currentMarks => [...currentMarks.slice(-MAX_MARKS + 1), mark]);

      const timer = window.setTimeout(() => {
        setMarks(currentMarks => currentMarks.filter(currentMark => currentMark.id !== id));
        timers.delete(timer);
      }, MARK_LIFETIME);

      timers.add(timer);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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