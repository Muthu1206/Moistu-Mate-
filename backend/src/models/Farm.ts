import mongoose, { Document, Schema } from "mongoose";

export interface IFarm extends Document {
  ownerId: mongoose.Types.ObjectId;
  name: string;
  location?: string;
  area?: number;
  cropType?: string;
}

const FarmSchema = new Schema<IFarm>({
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  location: { type: String },
  area: { type: Number },
  cropType: { type: String }
});

export default mongoose.model<IFarm>("Farm", FarmSchema);
