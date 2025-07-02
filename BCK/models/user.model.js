import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String },
  country: { type: String, required: true },
  phone: { type: String },
  desc: { type: String },
  isSeller: { type: Boolean, default: false },
  darkMode: { type: Boolean, default: false }, // 🌟 eklendi
}, { timestamps: true });



export default mongoose.model("User", userSchema)