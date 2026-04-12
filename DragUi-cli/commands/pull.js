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

  // 🔥 BASIC DEMO (you will expand later)
  if (data.type === "frontend" && type === "frontend") {
    fs.writeFileSync("src/GeneratedUI.jsx", "// UI CODE");
    console.log("✅ Frontend installed");
  } else if (data.type === "backend" && type === "backend") {
    fs.writeFileSync("routes/generated.js", "// API CODE");
    console.log("✅ Backend installed");
  } else {
    console.log("❌ Wrong directory for this project type");
  }
}