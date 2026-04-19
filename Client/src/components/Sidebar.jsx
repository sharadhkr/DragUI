import { useDraggable } from "@dnd-kit/core";
import { registry } from "../utils/registry";
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
      className="p-2 bg-gray-200 mb-2 cursor-grab rounded border"
    >
      {comp.label}
    </div>
  );
}

export default function Sidebar() {
  const addComponent = useBuilderStore((s) => s.addComponent);

  return (
    <div className="w-1/4 p-4 border-r bg-white min-h-screen">
      <h2 className="font-semibold mb-4">Components</h2>
      {registry.map((comp) => (
        <div key={comp.type} className="mb-4">
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
            className="text-xs text-blue-600 hover:underline mt-1"
          >
            Add {comp.label}
          </button>
        </div>
      ))}
    </div>
  );
}