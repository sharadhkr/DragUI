import { useBuilderStore } from "../store/useBuilderStore";

export default function PropertiesPanel() {
  const { components, selectedId, updateProps } = useBuilderStore();

  const selected = components.find((c) => c.id === selectedId);

  if (!selected) return <div className="w-1/4 p-4">No selection</div>;

  return (
    <div className="w-1/4 p-4 border-l">
      <input
        value={selected.props.text}
        onChange={(e) =>
          updateProps(selected.id, { text: e.target.value })
        }
        className="border p-2 w-full"
      />
    </div>
  );
}