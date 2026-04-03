import { useBuilderStore } from "../store/useBuilderStore";

export default function Canvas() {
  const { components, selectComponent } = useBuilderStore();

  return (
    <div className="w-2/4 p-4 bg-gray-50 min-h-screen">
      {components.map((comp) => {
        if (comp.type === "Button") {
          return (
            <button
              key={comp.id}
              onClick={() => selectComponent(comp.id)}
              className="px-4 py-2 bg-blue-500 text-white mb-2"
            >
              {comp.props.text}
            </button>
          );
        }

        return null;
      })}
    </div>
  );
}