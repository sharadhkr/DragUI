export function generateCode(tree) {
  let imports = new Set();

  function renderNode(node) {
    if (!node) return "";

    // HANDLE DIV
    if (node.type === "div") {
      const children = node.children?.map(renderNode).join("\n");

      return `<div className="${node.props?.className || ""}">
${children}
</div>`;
    }

    // HANDLE BUTTON
    if (node.type === "Button") {
      imports.add("Button");

      return `<Button ${generateProps(node.props)} />`;
    }

    return "";
  }

  function generateProps(props = {}) {
    return Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
  }

  const body = renderNode(tree);

  return `
import { ${[...imports].join(", ")} } from "sharadui";

export default function GeneratedUI() {
  return (
    <>
      ${body}
    </>
  );
}
`;
}