import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Banco de dados conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar com o MongoDB: ${error.message}`);
    process.exit(1);
  }
};
