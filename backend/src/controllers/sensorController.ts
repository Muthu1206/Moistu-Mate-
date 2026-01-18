import { Request, Response } from "express";
import SensorReading from "../models/SensorReading";
import DeviceSettings from "../models/DeviceSettings";

export const postReading = async (req: Request, res: Response) => {

  // //  
  //   {
  //     "farmId": "farm1",
  //     "sensorId": "esp32-1",
  //     "soilMoisture": 45.5,
  //     "humidity": 65.2,
  //     "temperature": 24.1,
  //     "ph": 6.8,
  //     "lightLevel": 80
  //   }
  
  try {
    const { farmId, sensorId, soilMoisture, humidity, temperature, ph, lightLevel } = req.body;
    if (!farmId || !sensorId || soilMoisture == null || humidity == null || temperature == null)
      return res.status(400).json({ message: "Missing required sensor fields" });
    const reading = await SensorReading.create({ farmId, sensorId, soilMoisture, humidity, temperature, ph, lightLevel });

    // Update DeviceSettings pumpStatus if auto watering is enabled
    const settings = await DeviceSettings.findOne({ farmId });
    if (settings && settings.autoWateringEnabled) {
      const shouldWater = soilMoisture < settings.moistureThreshold;
      const newStatus = shouldWater ? "on" : "off";
      if (settings.pumpStatus !== newStatus) {
        settings.pumpStatus = newStatus;
        await settings.save();
      }
    }

    return res.status(201).json({ reading });
  } catch (err) {
    return res.status(500).json({ message: "Error saving reading", error: (err as Error).message });
  }
};

export const getLatest = async (req: Request, res: Response) => {
  try {
    const { farmId } = req.query;
    if (!farmId) return res.status(400).json({ message: "farmId required" });
    const latest = await SensorReading.findOne({ farmId: String(farmId) }).sort({ createdAt: -1 }).lean();
    if (!latest) return res.status(404).json({ message: "No readings found" });
    return res.json(latest);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { farmId, range } = req.query;
    if (!farmId) return res.status(400).json({ message: "farmId required" });
    // range like '24h', '7d'
    let since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (typeof range === "string") {
      const match = range.match(/(\d+)([hd])/);
      if (match) {
        const n = parseInt(match[1], 10);
        if (match[2] === "h") since = new Date(Date.now() - n * 60 * 60 * 1000);
        if (match[2] === "d") since = new Date(Date.now() - n * 24 * 60 * 60 * 1000);
      }
    }
    const items = await SensorReading.find({ farmId: String(farmId), createdAt: { $gte: since } }).sort({ createdAt: 1 }).lean();
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};
