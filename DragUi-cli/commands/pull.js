import { apiRequest } from "../utils/api.js";
import { detectProjectType } from "../utils/detect.js";
import fs from "fs-extra";

export default async function pull(...args) {
  const projectId = args.join(" ").trim();

  if (!projectId) {
    console.log("❌ Please provide project ID or name");
    return;
  }

  console.log("⬇️ Fetching project...");

  let data;
  try {
    data = await apiRequest(`/project/${projectId}`);
  } catch (err) {
    console.log(`❌ ${err.message}`);
    return;
  }

  if (!data || !data.design) {
    console.log("❌ Project design not found");
    return;
  }

  const type = detectProjectType();
  console.log(`📦 Project: ${data.name}`);
  console.log(`📁 Current dir: ${type}`);

  if (type === "frontend") {
    const componentCode = generateComponent(data.design);
    fs.ensureDirSync("src");
    fs.writeFileSync("src/GeneratedUI.jsx", componentCode);
    console.log("✅ Generated UI component saved to src/GeneratedUI.jsx");
  } else if (type === "backend") {
    fs.ensureDirSync("routes");
    fs.writeFileSync("routes/generated.json", JSON.stringify(data.design, null, 2));
    console.log("✅ Design JSON saved to routes/generated.json");
  } else {
    console.log("❌ Unknown project type. Run this from a frontend or backend directory.");
  }
}

function generateComponent(design) {
  return `// Auto-generated component from DropUI
// Generated: ${new Date().toISOString()}

import React from 'react';
import { Button, Container } from 'DropUi';

const componentRegistry = {
  Button,
  button: Button,
  Container,
  container: Container,
};

const Renderer = ({ node }) => {
  if (!node) return null;

  const Comp = componentRegistry[node.type] || 'div';

  return (
    <Comp {...node.props} className={node.props?.className || ''}>
      {node.children?.map((child) => (
        <Renderer key={child.id} node={child} />
      ))}
    </Comp>
  );
};

const GeneratedUI = () => {
  const design = ${JSON.stringify(design)};

  return (
    <div className="generated-ui">
      {design.map((node) => (
        <Renderer key={node.id} node={node} />
      ))}
    </div>
  );
};

export default GeneratedUI;
`;
}