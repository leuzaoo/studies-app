import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import generateTokenAndSetCookie from "../config/generateToken.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt-studies", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

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
  const { username, password } = req.body;

  try {
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Preencha o campo de nome de usuário.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Preencha o campo de senha.",
      });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Usário não encontrado." });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Usuário encontrado mas a senha está incorreta.",
      });
    }

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
      .status(400)
      .json({ success: false, message: "Erro no servidor interno." });
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
