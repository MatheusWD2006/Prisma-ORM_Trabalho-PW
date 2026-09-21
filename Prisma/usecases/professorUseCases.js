const { PrismaClient } = require("../generated/prisma/index.js");
const prisma = new PrismaClient();

const getProfessoresDB = async () => {
  try {
    return await prisma.professor.findMany({
      orderBy: { nome: "asc" },
    });
  } catch (err) {
    throw "Erro ao listar professores: " + err;
  }
};

const addProfessorDB = async (body) => {
  try {
    const { nome, email } = body;
    return await prisma.professor.create({
      data: { nome, email },
    });
  } catch (err) {
    throw "Erro ao inserir professor: " + err;
  }
};

module.exports = { getProfessoresDB, addProfessorDB };
