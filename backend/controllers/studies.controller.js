import Study from "../models/study.model.js";

export const searchStudy = async (req, res) => {
  const searchQuery = req.query.q?.toString().toLowerCase();

  try {
    if (!searchQuery) {
      return res
        .status(400)
        .json({ message: "O campo de busca é obrigatório." });
    }

    const studies = await Study.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    });

    console.log("Estudos encontrados:", studies);

    return res.json({ studies });
  } catch (error) {
    console.error("Erro no controlador searchStudy:", error);
    res.status(500).json({ message: "Erro no servidor interno" });
  }
};
