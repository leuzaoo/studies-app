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

    // Validação de email
    if (updatedData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updatedData.email.trim())) {
        return res.status(400).json({ message: "Insira um email válido." });
      }
    } else {
      return res.status(400).json({ message: "Email é obrigatório." });
    }

    // Upload de imagens para Cloudinary
    try {
      if (req.body.userImage && req.body.userImage.startsWith("data:image")) {
        const result = await cloudinary.uploader.upload(req.body.userImage, {
          folder: "user_images",
          allowed_formats: ["jpg", "png", "jpeg"],
          transformation: [{ width: 300, height: 300, crop: "limit" }],
        });
        updatedData.userImage = result.secure_url;
      }

      if (
        req.body.bannerImage &&
        req.body.bannerImage.startsWith("data:image")
      ) {
        const result = await cloudinary.uploader.upload(req.body.bannerImage, {
          folder: "banner_images",
          allowed_formats: ["jpg", "png", "jpeg"],
          transformation: [{ width: 800, height: 300, crop: "limit" }],
        });
        updatedData.bannerImage = result.secure_url;
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Erro ao fazer upload da imagem." });
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
