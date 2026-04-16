import React, { useEffect, useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const COLORS = [
  'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400',
  'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-orange-400'
];

const AutoDraggableCell = ({ id }) => {
  const [color, setColor] = useState(COLORS[0]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAutoDragging, setIsAutoDragging] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { color },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isAutoDragging ? 'none' : 'transform 0.3s ease',
  };

  // Random color on mount
  useEffect(() => {
    setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, []);

  // Auto-move every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;
      setPosition({ x: dx, y: dy });
      setIsAutoDragging(true);

      const timeout = setTimeout(() => {
        setIsAutoDragging(false);
      }, 800);

      return () => clearTimeout(timeout);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`aspect-square border border-stone-200/70 ${color} cursor-grab hover:brightness-110 transition-transform active:cursor-grabbing`}
    />
  );
};

const Grid = () => {
  const { setNodeRef } = useDroppable({ id: 'auto-grid' });

  return (
    <div ref={setNodeRef} className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 gap-0 h-full w-full">
      {Array.from({ length: 400 }, (_, i) => (
        <AutoDraggableCell key={i} id={`cell-${i}`} />
      ))}
    </div>
  );
};

function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <DndContext>
        <div className="absolute inset-0 pointer-events-auto">
          <Grid />
        </div>
      </DndContext>
    </div>
  );
}

export default Background;   