import { useBuilderStore } from "../store/useBuilderStore";

export default function Renderer({ node }) {
  const { selectedId, selectComponent } = useBuilderStore();

  const isSelected = selectedId === node.id;

  const handleClick = (e) => {
    e.stopPropagation();
    selectComponent(node.id);
  };

  const commonProps = {
    onClick: handleClick,
    className: `${node.props?.className || ""} ${
      isSelected ? "outline outline-2 outline-blue-500" : ""
    }`,
  };

  const renderChildren = () =>
    node.children?.map((child) => (
      <Renderer key={child.id} node={child} />
    ));

  if (node.type === "div") {
    return <div {...commonProps}>{renderChildren()}</div>;
  }

  if (node.type === "Button") {
    return (
      <button {...commonProps}>
        {node.props.text}
      </button>
    );
  }

  return null;
}