import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-studies"];

    if (!token) {
      return res.status(401).json({ message: "Token ausente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Token inválido." });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    next();
  } catch (error) {
    console.error("Erro no middleware verifyToken:", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
};

export default verifyToken;
