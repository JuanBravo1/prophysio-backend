// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";              // ✔ ruta correcta
import appointmentsRoutes from "./routes/appointments.js"; // ✔ ruta correcta
import "./database/pool.js";                            // ✔ ruta correcta

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

// Ruta simple para probar backend
app.get("/", (req, res) => {
  res.send("API Prophysio OK ✅");
});

// Montar rutas
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentsRoutes);

// Puerto Render o local
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor levantado en puerto ${PORT}`);
});
