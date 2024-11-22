import Comment from "../models/comment.model.js";
import Study from "../models/study.model.js";

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

export const studiesCount = async (req, res) => {
  try {
    const totalStudies = await Study.countDocuments({ author: req.params.id });

    res.status(200).json({
      totalStudies,
    });
  } catch (error) {
    console.error("Erro ao buscar métricas do usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const study = await Study.findById(id);

    if (!study) {
      return res.status(404).json({ message: "Estudo nao encontrado" });
    }

    const hasLiked = study.likes.includes(userId);

    if (hasLiked) {
      study.likes = study.likes.filter((like) => like.toString() !== userId);
    } else {
      study.likes.push(userId);
    }

    await study.save();
  } catch (error) {
    res.status(500).json({ message: "Erro ao curtir estudo" });
  }
};
