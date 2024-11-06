import User from "../models/user.model.js";

export const updatedProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "username",
      "email",
      "password",
      "about",
      "avatar",
    ];

    const updatedData = {};

    for (const field of allowedFields) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }

    if (updatedData.username) {
      const existingUser = await User.findOne({
        username: updatedData.username,
      });

      if (
        existingUser &&
        existingUser._id.toString() !== req.user._id.toString()
      ) {
        return res
          .status(400)
          .json({ message: "Este nome de usuário já está em uso." });
      }
    }

    if (updatedData.email) {
      const existingEmail = await User.findOne({ email: updatedData.email });

      if (
        existingEmail &&
        existingEmail._id.toString() !== req.user._id.toString()
      ) {
        return res.status(400).json({ message: "Este email já está em uso." });
      }
    }

    // todo: add profile picture with cloudinary

    // if (req.body.profilePicture) {
    //   const result = await cloudinary.uploader.upload(req.body.profilePicture);
    //   updatedData.profilePicture = result.secure_url;
    // }

    // if (req.body.bannerImg) {
    //   const result = await cloudinary.uploader.upload(req.body.bannerImg);
    //   updatedData.bannerImg = result.secure_url;
    // }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    console.log("Erro no controlador 'updatedProfile': ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
