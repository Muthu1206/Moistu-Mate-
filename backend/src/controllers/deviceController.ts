import { Request, Response } from "express";
import DeviceSettings from "../models/DeviceSettings";

export const getSettings = async (req: Request, res: Response) => {
  try {
    const { farmId } = req.query;
    if (!farmId) return res.status(400).json({ message: "farmId required" });
    const settings = await DeviceSettings.findOne({ farmId: String(farmId) }).lean();
    if (!settings) return res.json({ farmId, autoWateringEnabled: false, moistureThreshold: 30, pumpStatus: "off" });
    return res.json(settings);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const postSettings = async (req: Request, res: Response) => {
  try {
    const { farmId, autoWateringEnabled, moistureThreshold } = req.body;
    if (!farmId) return res.status(400).json({ message: "farmId required" });
    const settings = await DeviceSettings.findOneAndUpdate(
      { farmId },
      { $set: { autoWateringEnabled: !!autoWateringEnabled, moistureThreshold: moistureThreshold ?? 30 } },
      { upsert: true, new: true }
    );
    return res.json(settings);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const postControl = async (req: Request, res: Response) => {
  /* UI can call this to request turning the pump on/off; the ESP32 can poll `GET /device/settings` to learn the desired pumpStatus */
  try {
    const { farmId, pumpStatus } = req.body;
    if (!farmId || !pumpStatus) return res.status(400).json({ message: "farmId and pumpStatus required" });
    if (!["on", "off"].includes(pumpStatus)) return res.status(400).json({ message: "pumpStatus must be 'on' or 'off'" });
    const settings = await DeviceSettings.findOneAndUpdate({ farmId }, { $set: { pumpStatus } }, { upsert: true, new: true });
    return res.json(settings);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};
