import Renderer from "./Renderer";
import { useBuilderStore } from "../store/useBuilderStore";

export default function Canvas() {
  const tree = useBuilderStore((s) => s.tree);

  return (
    <div className="w-2/4 bg-gray-50 p-4 min-h-screen">
      <Renderer node={tree} />
    </div>
  );
}