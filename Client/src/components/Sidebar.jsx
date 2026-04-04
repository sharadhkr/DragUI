import { useRegistry } from "../hooks/useRegistry";
import { useBuilderStore } from "../store/useBuilderStore";

export default function Sidebar() {
  const registry = useRegistry();
  const addComponent = useBuilderStore((s) => s.addComponent);

  return (
    <div className="w-1/4 p-4 border-r">
      {registry.map((comp) => (
        <div
          key={comp.type}
          className="p-2 bg-gray-200 mb-2 cursor-pointer"
          onClick={() =>
            addComponent("root", {
              id: Date.now().toString(),
              type: comp.type,
              props: comp.defaultProps,
              children: [],
            })
          }
        >
          {comp.label}
        </div>
      ))}
    </div>
  );
}