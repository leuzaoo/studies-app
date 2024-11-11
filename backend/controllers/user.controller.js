import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const updatedProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

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
      if (req.body[field] && req.body[field] !== user[field]) {
        updatedData[field] = req.body[field].trim();
      }
    }

    if (updatedData.username) {
      if (updatedData.username.length < 3) {
        return res
          .status(400)
          .json({ message: "Nome de usuário deve ter ao menos 3 caracteres." });
      }

      if (/[^a-zA-Z0-9._]/.test(updatedData.username)) {
        return res
          .status(400)
          .json({ message: "Nome de usuário contém caracteres inválidos." });
      }

      const existingUsername = await User.findOne({
        username: updatedData.username,
      });

      if (existingUsername && existingUsername._id.toString() !== userId) {
        return res
          .status(400)
          .json({ message: "Este nome de usuário já está em uso." });
      }
    }

    if (updatedData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updatedData.email)) {
        return res.status(400).json({ message: "Insira um email válido." });
      }

      const existingEmail = await User.findOne({ email: updatedData.email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        return res.status(400).json({ message: "Este email já está em uso." });
      }
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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Perfil atualizado com sucesso.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro no controlador 'updatedProfile': ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro no servidor interno." });
  }
};
