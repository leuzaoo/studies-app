import Comment from "../models/comment.model.js";
import Study from "../models/study.model.js";

export const newComment = async (req, res) => {
  const { content } = req.body;

  try {
    const newComment = new Comment({
      study: req.params.id,
      author: req.user._id,
      content,
    });

    await newComment.save();
    await Study.findByIdAndUpdate(req.params.id, {
      $push: { comments: newComment.id },
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

export const getStudyCommentsById = async (req, res) => {
  try {
    const comments = await Comment.find({ study: req.params.id })
      .populate("author", "username userImage name")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Erro inesperado ao buscar comentários. Tente mais tarde.",
    });
  }
};

export const getStudyCommentsCount = async (req, res) => {
  try {
    const study = await Study.findById(req.params.id);
    if (!study) {
      return res.status(404).json({ message: "Estudo não encontrado" });
    }

    const commentsCount = await Comment.countDocuments({ study });
    res.status(200).json({ count: commentsCount });
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    res.status(500).json({ message: "Erro ao buscar comentários" });
  }
};
