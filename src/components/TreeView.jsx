import { useBuilderStore } from "../store/useBuilderStore";

export default function TreeView({ node }) {
  const { selectComponent } = useBuilderStore();

  return (
    <div className="ml-2">
      <div
        className="cursor-pointer text-sm"
        onClick={() => selectComponent(node.id)}
      >
        {node.type}
      </div>

      {node.children?.map((child) => (
        <TreeView key={child.id} node={child} />
      ))}
    </div>
  );
}