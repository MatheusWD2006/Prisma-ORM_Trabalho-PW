const { PrismaClient } = require("../generated/prisma/index.js");
const prisma = new PrismaClient();

const getAlunosDB = async () => {
  try {
    return await prisma.aluno.findMany({
      orderBy: { nome: "asc" },
      include: { turmas: true },
    });
  } catch (err) {
    throw "Erro ao listar Alunos: " + err;
  }
};

const addAlunoDB = async (body) => {
  try {
    const { nome, matricula } = body;
    return await prisma.aluno.create({
      data: { nome, matricula },
    });
  } catch (err) {
    throw "Erro ao inserir Aluno: " + err;
  }
};

const updateAlunoDB = async (id, body) => {
  try {
    const { nome, matricula } = body;
    return await prisma.aluno.update({
      where: { id: Number(id) },
      data: { nome, matricula },
    });
  } catch (err) {
    throw "Erro ao atualizar Aluno: " + err;
  }
};

const deleteAlunoDB = async (id) => {
  try {
    return await prisma.aluno.delete({
      where: { id: Number(id) },
    });
  } catch (err) {
    throw "Erro ao excluir Aluno: " + err;
  }
};

const getAlunoByIdDB = async (id) => {
  try {
    const resp = await prisma.aluno.findUnique({
      where: { id: Number(id) },
      include: { turmas: true },
    });

    if (resp == null) {
      throw new Error("Aluno não encontrado");
    }

    return resp;
  } catch (err) {
    throw "Erro ao buscar Aluno: " + err;
  }
};

module.exports = {
  getAlunosDB,
  addAlunoDB,
  updateAlunoDB,
  deleteAlunoDB,
  getAlunoByIdDB,
};
