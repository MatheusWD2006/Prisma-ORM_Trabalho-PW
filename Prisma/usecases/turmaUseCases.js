const { PrismaClient } = require("../generated/prisma/index.js");
const prisma = new PrismaClient();

const getTurmasDB = async () => {
  try {
    return await prisma.turma.findMany({
      orderBy: { nome: "asc" },
      include: { professor: true },
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
      include: { professor: true },
    });
  } catch (err) {
    // P2003 indica que a chave estrangeira (professorId) não existe no banco
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003") {
      throw new Error("O professor informado (professorId) não existe.");
    }
    throw new Error("Erro ao inserir turma: " + err.message);
  }
};

const updateTurmaDB = async (id, body) => {
  try {
    const { nome, professorId } = body;
    
    // Monta o objeto de atualização com base nos campos enviados
    const dataToUpdate = {};
    if (nome) dataToUpdate.nome = nome;
    if (professorId) dataToUpdate.professorId = Number(professorId);

    return await prisma.turma.update({
      where: { id: Number(id) },
      data: dataToUpdate,
      include: { professor: true },
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
      include: { professor: true },
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
};