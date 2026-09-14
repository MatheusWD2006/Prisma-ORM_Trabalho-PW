import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
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
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});