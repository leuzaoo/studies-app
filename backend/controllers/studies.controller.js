import Study from "../models/study.model.js";

export const allStudies = async (req, res) => {
  try {
    const studies = await Study.find({}).populate("author", "username");
    return res.json({ studies });
  } catch (error) {
    console.error("Erro no controlador allStudies:", error);
    res.status(500).json({ message: "Erro no servidor interno" });
  }
};

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
        { content: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } },
      ],
    }).populate("author", "username");

    return res.json({ studies });
  } catch (error) {
    console.error("Erro no controlador searchStudy:", error);
    res.status(500).json({ message: "Erro no servidor interno" });
  }
};

export const createStudy = async (req, res) => {
  try {
    const { title, content, category, tags = [] } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos obrigatórios." });
    }

    const newStudy = new Study({
      title,
      content,
      category,
      tags,
      author: req.user._id,
    });

    await newStudy.save();

    return res.status(201).json({ message: "Estudo criado com sucesso." });
  } catch (error) {
    console.error("Erro no controlador createStudy:", error);
    res.status(500).json({ message: "Erro no servidor interno" });
  }
};
