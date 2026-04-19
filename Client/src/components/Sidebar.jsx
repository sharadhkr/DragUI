import { useDraggable } from "@dnd-kit/core";
import { useRegistry } from "../hooks/useRegistry";
import { useBuilderStore } from "../store/useBuilderStore";

function ToolItem({ comp }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `tool-${comp.type}`,
    data: {
      type: comp.type,
      props: comp.defaultProps,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.7 : 1,
      }}
      className="mb-3 cursor-grab rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
    >
      <div className="font-semibold text-slate-800">{comp.label}</div>
      <div className="mt-1 text-xs text-slate-500">Drag to canvas</div>
    </div>
  );
}

export default function Sidebar() {
  const registry = useRegistry();
  const addComponent = useBuilderStore((s) => s.addComponent);

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Component library</h2>
          <p className="text-sm text-slate-500">Drag components into the canvas or click to add.</p>
        </div>
      </div>

      <div className="space-y-4">
        {registry.map((comp) => (
          <div key={comp.type}>
            <ToolItem comp={comp} />
            <button
              type="button"
              onClick={() =>
                addComponent("root", {
                  id: Date.now().toString(),
                  type: comp.type,
                  props: { ...comp.defaultProps },
                  children: [],
                })
              }
              className="mt-2 w-full rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
            >
              Add {comp.label}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
