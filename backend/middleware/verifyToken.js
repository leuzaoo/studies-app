import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-studies"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token ausente." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token expirado." });
      }
      return res
        .status(401)
        .json({ success: false, message: "Token inválido." });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado." });
    }

    if (user.status && user.status !== "active") {
      return res
        .status(403)
        .json({ success: false, message: "Usuário inativo ou suspenso." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(
      "Erro no middleware 'verifyToken':",
      error.message,
      error.stack
    );
    return res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor." });
  }
};

export default verifyToken;
