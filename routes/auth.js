// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../database/pool.js";

const router = express.Router();

// REGISTRO
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const exists = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (exists.rows.length > 0)
      return res.status(400).json({ message: "Email ya registrado" });

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (name, email, phone, password) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, phone, hashed]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error en register:", err);
    res.status(500).json({ error: "Error en servidor" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ error: "Error en servidor" });
  }
});

export default router;
