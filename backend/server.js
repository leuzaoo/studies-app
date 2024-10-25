import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import studiesRoutes from "./routes/studies.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/studies", studiesRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
