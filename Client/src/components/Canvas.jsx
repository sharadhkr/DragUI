import { useDroppable } from "@dnd-kit/core";
import Renderer from "./Renderer";

export default function Canvas({ tree }) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[720px] rounded-3xl border border-dashed p-5 transition ${
        isOver ? "border-cyan-400 bg-cyan-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Canvas</h2>
          <p className="text-sm text-slate-500">Drop components here and select to edit.</p>
        </div>
      </div>

      <div className="min-h-[620px] rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <Renderer node={tree} />
      </div>
    </div>
  );
}