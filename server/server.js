import express from "express";
import dotenv from "dotenv";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = process.env.PORT || 3003;

app.get("/", (req, res) => {
  res.send("Servidor rodando com sucesso!");
});

app.get("/alunos", async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});