import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  productId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
  quantity: number;
  total: number;
}

const OrderSchema = new Schema<IOrder>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true, default: 1 },
  total: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<IOrder>("Order", OrderSchema);
