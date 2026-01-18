import express from "express";
import { getSettings, postSettings, postControl } from "../controllers/deviceController";

const router = express.Router();

router.get("/device/settings", getSettings);
router.post("/device/settings", postSettings);
router.post("/device/control", postControl);

export default router;
