import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,

  username: {
    type: String,
    unique: true,
  },

  isPrivate: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);