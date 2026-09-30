const { PrismaClient, Prisma } = require("../generated/prisma/index.js");
const prisma = new PrismaClient();

const getTurmasDB = async () => {
  try {
    return await prisma.turma.findMany({
      orderBy: { nome: "asc" },
      include: {
        professor: true,
        alunos: true,
      },
    });
  } catch (err) {
    throw "Erro ao listar turmas: " + err;
  }
};

const addTurmaDB = async (body) => {
  try {
    const { nome, professorId } = body;

    return await prisma.turma.create({
      data: {
        nome,
        professorId: Number(professorId),
      },
      include: {
        professor: true,
        alunos: true,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2003"
    ) {
      throw new Error("O professor informado (professorId) não existe.");
    }
    throw new Error("Erro ao inserir turma: " + err.message);
  }
};

const matricularAlunoDB = async (turmaId, alunoId) => {
  try {
    return await prisma.turma.update({
      where: { id: Number(turmaId) },
      data: {
        alunos: {
          connect: { id: Number(alunoId) },
        },
      },
      include: {
        professor: true,
        alunos: true,
      },
    });
  } catch (err) {
    throw "Erro ao matricular aluno: " + err;
  }
};

const removerAlunoDB = async (turmaId, alunoId) => {
  try {
    return await prisma.turma.update({
      where: { id: Number(turmaId) },
      data: {
        alunos: {
          disconnect: { id: Number(alunoId) },
        },
      },
      include: {
        professor: true,
        alunos: true,
      },
    });
  } catch (err) {
    throw "Erro ao remover aluno: " + err;
  }
};

const updateTurmaDB = async (id, body) => {
  try {
    const { nome, professorId, alunosIds } = body;

    const dataToUpdate = {};

    if (nome) {
      dataToUpdate.nome = nome;
    }
    
    if (professorId) {
      dataToUpdate.professorId = Number(professorId);
    }

  
    if (alunosIds && Array.isArray(alunosIds)) {
      dataToUpdate.alunos = {
        set: alunosIds.map((alunoId) => ({ id: Number(alunoId) })),
      };
    }

    return await prisma.turma.update({
      where: { id: Number(id) },
      data: dataToUpdate,
      include: {
        professor: true,
        alunos: true, 
      },
    });
  } catch (err) {
    throw "Erro ao atualizar turma: " + err;
  }
};
const deleteTurmaDB = async (id) => {
  try {
    return await prisma.turma.delete({
      where: { id: Number(id) },
    });
  } catch (err) {
    throw "Erro ao excluir turma: " + err;
  }
};

const getTurmaByIdDB = async (id) => {
  try {
    return await prisma.turma.findUnique({
      where: { id: Number(id) },
      include: {
        professor: true,
        alunos: true,
      },
    });
  } catch (err) {
    throw "Erro ao buscar turma: " + err;
  }
};

module.exports = {
  getTurmasDB,
  addTurmaDB,
  updateTurmaDB,
  deleteTurmaDB,
  getTurmaByIdDB,
  matricularAlunoDB,
  removerAlunoDB,
};