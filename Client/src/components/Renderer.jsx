import { useBuilderStore } from "../store/useBuilderStore";
import { components } from "../DropUi/index";

export default function Renderer({ node }) {
  const { selectedId, selectComponent } = useBuilderStore();

  const Comp = components[node.type] || "div";

  const handleClick = (e) => {
    e.stopPropagation();
    selectComponent(node.id);
  };

  return (
    <Comp
      {...node.props}
      onClick={handleClick}
      className={`${node.props?.className || ""} ${
        selectedId === node.id ? "outline outline-2 outline-blue-500" : ""
      }`}
    >
      {node.children?.map((child) => (
        <Renderer key={child.id} node={child} />
      ))}
    </Comp>
  );
}