import { apiRequest } from "../utils/api.js";
import { detectProjectType } from "../utils/detect.js";
import fs from "fs-extra";

export default async function pull(projectId) {
  if (!projectId) {
    console.log("❌ Please provide project ID");
    return;
  }

  console.log("⬇️ Fetching project...");

  const data = await apiRequest(`/project/${projectId}`);

  if (!data || data.error) {
    console.log("❌ Project not found");
    return;
  }

  const type = detectProjectType();

  console.log(`📦 Project type: ${data.type}`);
  console.log(`📁 Current dir: ${type}`);

  if (data.type === "frontend" && type === "frontend") {
    fs.ensureDirSync("src");
    fs.writeFileSync("src/GeneratedUI.jsx", data.code || "// UI CODE");
    console.log("✅ Generated UI saved to src/GeneratedUI.jsx");
  } else if (data.type === "backend" && type === "backend") {
    fs.ensureDirSync("routes");
    fs.writeFileSync("routes/generated.js", data.code || "// API CODE");
    console.log("✅ Generated backend file saved to routes/generated.js");
  } else {
    console.log("❌ Wrong directory for this project type");
  }
}