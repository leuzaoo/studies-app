import Comment from "../models/comment.model.js";
import Study from "../models/study.model.js";

export const newComment = async (req, res) => {
  const { content, userId } = req.body;

  try {
    const newComment = new Comment({
      study: req.params.id,
      user: userId,
      content,
    });

    await newComment.save();

    await Study.findByIdAndUpdate(req.params.id, {
      $push: { comments: newComment._id },
    });

    res.status(200).json({
      success: true,
      message: "Comentário feito.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Erro inesperado ao adicionar comentário. Tente mais tarde.",
    });
  }
};

export const getStudyComments = async (req, res) => {
  try {
    const comments = await Comment.find({ study: req.params.id })
      .populate("author", "username userImage")
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Erro inesperado ao buscar comentários. Tente mais tarde.",
    });
  }
};
