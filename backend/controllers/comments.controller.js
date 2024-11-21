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

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comentário nao encontrado.",
      });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Sem permissão para excluir este comentário.",
      });
    }

    await Study.findByIdAndUpdate(comment.study, {
      $pull: { comments: comment.id },
    });

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comentário excluído.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Erro inesperado ao excluir comentário. Tente mais tarde.",
    });
  }
};
