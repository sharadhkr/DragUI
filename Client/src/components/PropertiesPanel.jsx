import { useBuilderStore } from "../store/useBuilderStore";

export default function PropertiesPanel() {
  const {
    tree,
    selectedId,
    updateProps,
    deleteComponent,
    duplicateComponent,
  } = useBuilderStore();

  function find(node) {
    if (node.id === selectedId) return node;
    for (let child of node.children) {
      const found = find(child);
      if (found) return found;
    }
  }

  const selected = find(tree);

  if (!selected) return <div className="w-1/4 p-4">No selection</div>;

  const editableProps = Object.entries(selected.props || {}).filter(
    ([, value]) => typeof value === "string"
  );

  return (
    <div className="w-1/4 p-4 border-l space-y-4 bg-white min-h-screen">
      <h3 className="font-bold text-lg">{selected.type}</h3>

      {editableProps.length === 0 && (
        <div className="text-sm text-slate-500">No editable properties</div>
      )}

      {editableProps.map(([key, value]) => (
        <label key={key} className="block text-sm space-y-1">
          <span className="font-semibold">{key}</span>
          <input
            value={value}
            onChange={(e) => updateProps(selected.id, { [key]: e.target.value })}
            className="border p-2 w-full rounded"
          />
        </label>
      ))}

      <button
        onClick={() => duplicateComponent(selected.id)}
        className="bg-yellow-400 p-2 w-full"
      >
        Duplicate
      </button>

      <button
        onClick={() => deleteComponent(selected.id)}
        className="bg-red-500 text-white p-2 w-full"
      >
        Delete
      </button>
    </div>
  );
}