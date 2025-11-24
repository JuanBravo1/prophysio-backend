// pool.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 1, // 👈 importante para Neon + Render (evita demasiadas conexiones)
});

db.connect()
  .then(() => {
    console.log("✅ Conectado a PostgreSQL (Neon)");
  })
  .catch((err) => {
    console.error("❌ Error al conectar a PostgreSQL:", err);
  });
