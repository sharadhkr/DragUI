import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
  name: String,
  type: String, // frontend / backend
  category: String,
  path: String, // template path
  props: [String],
  files: [String],
});

export default mongoose.model("Component", componentSchema);