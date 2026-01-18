import mongoose, { Document, Schema } from "mongoose";

export interface ISensorReading extends Document {
  farmId: string;
  sensorId: string;
  soilMoisture: number;
  humidity: number;
  temperature: number;
  ph?: number;
  lightLevel?: number;
  createdAt: Date;
}

const SensorReadingSchema = new Schema<ISensorReading>(
  {
    farmId: { type: String, required: true, index: true },
    sensorId: { type: String, required: true },
    soilMoisture: { type: Number, required: true },
    humidity: { type: Number, required: true },
    temperature: { type: Number, required: true },
    ph: { type: Number },
    lightLevel: { type: Number }
  },
  { timestamps: true }
);

SensorReadingSchema.index({ farmId: 1, createdAt: -1 });

export default mongoose.model<ISensorReading>("SensorReading", SensorReadingSchema);
