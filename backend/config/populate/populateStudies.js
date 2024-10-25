import mongoose from "mongoose";

import Study from "../../models/study.model.js";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://leuzaoo:A60dcJ6pcoJRjaaN@cluster0.crnfp.mongodb.net/studies-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};

const populateStudies = async () => {
  const studies = [
    {
      title: "Corinthians: A História de um Time Gigante",
      content:
        "O Corinthians é um dos times mais populares do Brasil, com uma rica história de conquistas e uma enorme torcida.",
      category: "Esportes",
      tags: ["futebol", "Corinthians", "esporte"],
      author: "671ba94d4c7bc99e378bb01f",
      isPublished: true,
      views: 0,
      rating: 5,
    },
    {
      title: "Nazismo: Um Estudo sobre uma Ideologia Perigosa",
      content:
        "O nazismo foi um regime totalitário que governou a Alemanha de 1933 a 1945, caracterizado pela perseguição a minorias e pela guerra.",
      category: "Política",
      tags: ["nazismo", "história", "política"],
      author: "671ba94d4c7bc99e378bb01f",
      isPublished: true,
      views: 0,
      rating: 4,
    },
  ];

  try {
    await Study.insertMany(studies);
    console.log("Estudos populados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular estudos:", error);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  await connectDB();
  await populateStudies();
};

run();
