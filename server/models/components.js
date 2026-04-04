import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
  type: String,
  label: String,

  defaultProps: Object,
  propsSchema: Object,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Component", componentSchema);