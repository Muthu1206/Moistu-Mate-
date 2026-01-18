import express from "express";
import { postReading, getLatest, getHistory } from "../controllers/sensorController";

const router = express.Router();

router.post("/device/readings", postReading);
router.get("/sensors/latest", getLatest);
router.get("/sensors/history", getHistory);

export default router;
