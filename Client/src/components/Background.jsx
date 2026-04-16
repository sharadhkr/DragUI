import React from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const Cell = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`aspect-square border border-stone-200/70 bg-white hover:bg-violet-50 transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'shadow-lg scale-105 z-50' : 'shadow-sm'
      }`}
    />
  );
};

const Grid = () => {
  const { setNodeRef } = useDroppable({
    id: 'grid-container',
  });

  return (
    <div
      ref={setNodeRef}
      className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 gap-0 opacity-70 h-full w-full"
    >
      {Array.from({ length: 400 }, (_, i) => (
        <Cell key={i} id={`cell-${i}`} />
      ))}
    </div>
  );
};

function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <DndContext onDragEnd={() => {}}>
        <div className="absolute inset-0 pointer-events-auto">
          <Grid />
        </div>
      </DndContext>
    </div>
  );
}

export default Background;   