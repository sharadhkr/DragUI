import { registry } from "../utils/registry";
import { useBuilderStore } from "../store/useBuilderStore";

export default function Sidebar() {
  const addComponent = useBuilderStore((s) => s.addComponent);

  return (
    <div className="w-1/4 p-4 border-r">
      {registry.map((comp) => (
        <div
          key={comp.type}
          className="p-2 bg-gray-200 mb-2 cursor-pointer"
          onClick={() =>
            addComponent({
              id: Date.now(),
              type: comp.type,
              props: comp.defaultProps,
            })
          }
        >
          {comp.label}
        </div>
      ))}
    </div>
  );
}