import { Request, Response } from "express";

export const currentWeather = async (req: Request, res: Response) => {
  // Return mock data — replace with real weather API integration later
  const { farmId } = req.query;
  const mock = {
    farmId: farmId || null,
    temperature: 25.1,
    humidity: 60,
    condition: "Partly Cloudy",
    provider: "mock"
  };
  return res.json(mock);
};
