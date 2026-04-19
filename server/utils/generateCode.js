export function generateCode(tree) {
  let imports = new Set();

  // CSS-only properties that should go in style, not as attributes
  const CSS_STYLE_KEYS = new Set([
    "color",
    "backgroundColor",
    "fontSize",
    "textAlign",
    "fontWeight",
    "padding",
    "margin",
    "width",
    "height",
    "display",
    "border",
    "borderRadius",
    "boxShadow",
  ]);

  function renderNode(node) {
    if (!node) return "";

    // HANDLE DIV
    if (node.type === "div") {
      const children = node.children?.map(renderNode).join("\n");
      const styleProps = getStyleObject(node.props);
      const styleAttr = styleProps ? ` style={${styleProps}}` : "";

      return `<div className="${node.props?.className || ""}"${styleAttr}>
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

  function getStyleObject(props = {}) {
    const styleObj = {};
    
    Object.entries(props).forEach(([key, value]) => {
      if (CSS_STYLE_KEYS.has(key)) {
        styleObj[key] = value;
      }
    });

    if (Object.keys(styleObj).length === 0) return null;

    // Generate JavaScript object literal for style
    const entries = Object.entries(styleObj)
      .map(([key, value]) => `${key}: "${value}"`)
      .join(", ");
    
    return `{${entries}}`;
  }

  function generateProps(props = {}) {
    return Object.entries(props)
      .filter(([key]) => !CSS_STYLE_KEYS.has(key))
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
  }

  const body = renderNode(tree);

  return `
import { ${[...imports].join(", ")} } from "DropUi";

export default function GeneratedUI() {
  return (
    <>
      ${body}
    </>
  );
}
`;
}