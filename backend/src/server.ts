import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import sensorRoutes from "./routes/sensorRoutes";
import deviceRoutes from "./routes/deviceRoutes";
import weatherRoutes from "./routes/weatherRoutes";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/", sensorRoutes);
app.use("/", deviceRoutes);
app.use("/", weatherRoutes);

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();

export default app;
