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
    const { title, description, content, category, tags } = req.body;

    if (!title || !content || !category || !description) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos obrigatórios." });
    }

    const newStudy = new Study({
      title,
      content,
      description,
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

export const getStudyById = async (req, res) => {
  try {
    const study = await Study.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!study) {
      return res
        .status(404)
        .json({ message: "Estudo não encontrado ou inexistente." });
    }
    return res.json({ study });
  } catch (error) {
    console.error("Erro no controlador getStudyById:", error);
    res.status(500).json({ message: "Erro no servidor interno" });
  }
};

export const getUserStudies = async (req, res) => {
  try {
    const userId = req.user._id;
    const userStudies = await Study.find({ author: userId }).populate(
      "author",
      "username"
    );

    if (!userStudies.length) {
      return res
        .status(404)
        .json({ message: "Você ainda não criou nenhum estudo." });
    }

    res.status(200).json({ userStudies });
  } catch (error) {
    console.error("Erro no controlador getUserStudies:", error);
    res.status(500).json({ message: "Erro no servidor interno" });
  }
};

export const deleteStudy = async (req, res) => {
  try {
    const study = await Study.findById(req.params.id);
    if (!study) {
      return res
        .status(404)
        .json({ message: "Estudo não encontrado ou inexistente." });
    }

    if (study.author.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Sem permissão para excluir este conteúdo." });
    }

    await Study.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Estudo excluído com sucesso." });
  } catch (error) {
    console.error("Erro no controlador deleteStudy:", error);
    res.status(500).json({ message: "Erro no servidor interno" });
  }
};

export const updateStudy = async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "description",
      "content",
      "category",
      "tags",
    ];

    const updatedData = {};

    for (const field of allowedFields) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }

    // Verifique se o estudo existe
    const study = await Study.findById(req.params.id);
    if (!study) {
      return res.status(404).json({ message: "Estudo não encontrado." });
    }

    // Verifique se o usuário autenticado é o autor do estudo
    if (study.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Sem permissão para editar este estudo." });
    }

    // Atualize o estudo com os novos dados
    const savedStudy = await Study.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.json(savedStudy);
  } catch (error) {
    console.error("Erro ao atualizar estudo:", error);
    res.status(500).json({ error: "Erro ao atualizar estudo" });
  }
};
