import mongoose, { Document, Schema } from "mongoose";

export interface IDeviceSettings extends Document {
  farmId: string;
  autoWateringEnabled: boolean;
  moistureThreshold: number;
  pumpStatus: "on" | "off";
}

const DeviceSettingsSchema = new Schema<IDeviceSettings>({
  farmId: { type: String, required: true, unique: true, index: true },
  autoWateringEnabled: { type: Boolean, default: false },
  moistureThreshold: { type: Number, default: 30 },
  pumpStatus: { type: String, enum: ["on", "off"], default: "off" }
});

export default mongoose.model<IDeviceSettings>("DeviceSettings", DeviceSettingsSchema);
