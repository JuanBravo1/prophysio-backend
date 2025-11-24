// middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function auth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header)
      return res.status(401).json({ message: "Token faltante" });

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error("Error JWT:", err.message);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
