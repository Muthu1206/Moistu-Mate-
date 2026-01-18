import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  preferredLanguage?: string;
  role: "farmer" | "seller" | "admin";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String },
    passwordHash: { type: String, required: true },
    preferredLanguage: { type: String, default: "en" },
    role: { type: String, enum: ["farmer", "seller", "admin"], default: "farmer" }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
