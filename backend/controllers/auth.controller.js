import { body, validationResult } from "express-validator";
import sanitizeHtml from "sanitize-html";
import bcryptjs from "bcryptjs";

import generateTokenAndSetCookie from "../config/generateToken.js";
import User from "../models/user.model.js";
import axios from "axios";

export const signup = async (req, res) => {
  try {
    let { name, username, email, password } = req.body;

    username = sanitizeHtml(username);
    name = sanitizeHtml(name);

    if (!username || !name) {
      return res.status(400).json({
        message: "Nome ou nome de usuário inválido ou removido por segurança.",
      });
    }

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Este email está em uso." });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Este nome de usuário está em uso." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "A senha deve ter pelo menos 6 caracteres." });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const userImage =
      PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const user = new User({
      name,
      email,
      password: hashedPassword,
      username,
      userImage,
    });

    await user.save();

    res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Erro ao criar o usário", error.message);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
};

export const login = async (req, res) => {
  await Promise.all([
    body("username").trim().isString().notEmpty().escape().run(req),
    body("password").isString().notEmpty().run(req),
    body("captchaToken").isString().notEmpty().run(req), // CAPTCHA obrigatório
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Dados inválidos, tente novamente.",
    });
  }

  const { username, password, captchaToken } = req.body;

  // Verificar o CAPTCHA antes de continuar
  const isValidCaptcha = await verifyCaptcha(captchaToken);
  if (!isValidCaptcha) {
    return res.status(403).json({
      success: false,
      message: "Captcha inválido. Tente novamente.",
    });
  }

  try {
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos.",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Credenciais inválidas." });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Credenciais inválidas.",
      });
    }

    // Login bem-sucedido
    generateTokenAndSetCookie(user.id, res);

    res.status(200).json({
      success: true,
      message: "Login feito com sucesso.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Erro no controlador de Login:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro no servidor interno." });
  }
};

// Função para verificar o CAPTCHA usando a API do Google
const verifyCaptcha = async (captchaToken) => {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: captchaToken,
        },
      }
    );

    return response.data.success;
  } catch (error) {
    console.error("Erro ao verificar CAPTCHA:", error.message);
    return false;
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt-studies");
    res.status(200).json({ success: true, message: "Você saiu da sua conta." });
  } catch (error) {
    console.log("Erro no controlador de logout.", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro no servidor interno." });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findOne(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Usuário não encontrado." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Erro no controlador 'checkAuth': ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
