// routes/appointments.js
import express from "express";
import { db } from "../database/pool.js";      // ✔ ruta corregida
import auth from "../middleware/auth.js";      // ✔ ruta corregida

const router = express.Router();

// Crear cita
router.post("/", auth, async (req, res) => {
  try {
    const { service, serviceLabel, date, time, notes } = req.body;

    const result = await db.query(
      `INSERT INTO appointments (user_id, service, serviceLabel, date, time, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, service, serviceLabel, date, time, notes]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error creando cita:", err);
    res.status(500).json({ message: "Error al crear cita" });
  }
});

// Listar citas del usuario logueado
router.get("/", auth, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * 
       FROM appointments 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error obteniendo citas:", err);
    res.status(500).json({ message: "Error al obtener citas" });
  }
});

// Obtener datos del usuario (ANTES ESTABA AQUÍ)
router.get("/me", auth, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email, phone FROM users WHERE id = $1",
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

export default router;
