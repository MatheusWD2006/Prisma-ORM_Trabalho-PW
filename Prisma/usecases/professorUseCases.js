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

const updateProfessorDB = async (id, body) => {
  try {
    const { nome, email } = body;
    return await prisma.professor.update({
      where: { id },
      data: { nome, email },
    });
  } catch (err) {
    throw "Erro ao atualizar professor: " + err;
  }
};

const deleteProfessorDB = async (id) => {
  try {
    return await prisma.professor.delete({
      where: { id },
    });
  } catch (err) {
    throw "Erro ao excluir professor: " + err;
  }
};

const getProfessorByIdDB = async (id) => {
  try {
    return await prisma.professor.findUnique({
      where: { id },
    });
  } catch (err) {
    throw "Erro ao buscar professor: " + err;
  }
};

module.exports = { getProfessoresDB, addProfessorDB, updateProfessorDB, deleteProfessorDB, getProfessorByIdDB };
