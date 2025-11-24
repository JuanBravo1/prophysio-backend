// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./auth.js";
import appointmentsRoutes from "./appointments.js";
import "./pool.js"; // inicializa conexión a la BD

dotenv.config();

const app = express();

// CORS más explícito para producción / Render
app.use(
  cors({
    origin: "*", // si quieres, luego lo restringimos a tu dominio/app
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

// Ruta simple para probar que el backend vive
app.get("/", (req, res) => {
  res.send("API Prophysio OK ✅");
});

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentsRoutes);

// PORT para Render o local
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor levantado en puerto ${PORT}`);
});
