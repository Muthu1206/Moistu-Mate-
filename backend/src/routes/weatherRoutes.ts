import express from "express";
import { currentWeather } from "../controllers/weatherController";

const router = express.Router();

router.get("/weather/current", currentWeather);

export default router;
