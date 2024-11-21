import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import commentsRoutes from "./routes/comments.route.js";
import studiesRoutes from "./routes/studies.route.js";
import metricsRoutes from "./routes/metrics.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/studies", studiesRoutes);
app.use("/api/v1/metrics", metricsRoutes);
app.use("/api/v1/comments", commentsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
