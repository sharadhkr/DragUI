import { useDroppable } from "@dnd-kit/core";
import Renderer from "./Renderer";
import { useBuilderStore } from "../store/useBuilderStore";

export default function Canvas() {
  const tree = useBuilderStore((s) => s.tree);
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      className={`w-2/4 bg-gray-50 p-4 min-h-screen rounded-lg border border-dashed ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      <div className="text-xs mb-3 text-slate-600">
        Drag a component here or click Add in the left panel.
      </div>
      <Renderer node={tree} />
    </div>
  );
}