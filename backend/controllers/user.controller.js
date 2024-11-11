import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const updatedProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "username",
      "email",
      "about",
      "userImage",
      "bannerImage",
    ];
    const updatedData = {};

    for (const field of allowedFields) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }

    if (updatedData.username && updatedData.username.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Nome de usuário deve ter ao menos 3 caracteres." });
    }

    if (updatedData.username && /[^a-zA-Z0-9._]/.test(updatedData.username)) {
      return res
        .status(400)
        .json({ message: "Nome de usuário contém caracteres inválidos." });
    }

    if (updatedData.username) {
      const existingUsername = await User.findOne({
        username: updatedData.username,
      });

      if (existingUsername) {
        return res
          .status(400)
          .json({ message: "Este nome de usuário está em uso." });
      }
    }

    if (updatedData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updatedData.email.trim())) {
        return res.status(400).json({ message: "Insira um email válido." });
      }
    } else {
      return res.status(400).json({ message: "Email é obrigatório." });
    }

    if (req.file) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024;

      if (req.file.size > MAX_FILE_SIZE) {
        return res
          .status(400)
          .json({ message: "A imagem deve ter no máximo 2MB." });
      }

      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "user_images",
          allowed_formats: ["jpg", "png", "jpeg"],
        });

        updatedData.userImage = result.secure_url;
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao fazer upload da imagem.", error });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Perfil atualizado com sucesso.",
      user,
    });
  } catch (error) {
    console.log("Erro no controlador 'updatedProfile': ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
