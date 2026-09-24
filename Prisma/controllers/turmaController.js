const { request, response } = require("express");
const {
  getTurmasDB,
  addTurmaDB,
  updateTurmaDB,
  deleteTurmaDB,
  getTurmaByIdDB,
  matricularAlunoDB,
  removerAlunoDB,
} = require("../usecases/turmaUseCases");

const getTurmas = async (request, response) => {
  await getTurmasDB()
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const addTurma = async (request, response) => {
  await addTurmaDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Turma criada",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const updateTurma = async (request, response) => {
  const { id } = request.params;
  await updateTurmaDB(id, request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Turma atualizada",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const deleteTurma = async (request, response) => {
  const { id } = request.params;
  await deleteTurmaDB(id)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Turma excluída",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const getTurmaById = async (request, response) => {
  const { id } = request.params;
  await getTurmaByIdDB(id)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Turma encontrada",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const matricularAluno = async (request, response) => {
  const turmaId = Number(request.params.id);
  const { alunoId } = request.body; // Recebe o ID do aluno do Postman

  await matricularAlunoDB(turmaId, alunoId)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Aluno adicionado à turma",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      }),
    );
};

const removerAluno = async (request, response) => {
  const turmaId = Number(request.params.id);
  const { alunoId } = request.body;

  await removerAlunoDB(turmaId, alunoId)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Aluno removido da turma",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      }),
    );
};

module.exports = {
  getTurmas,
  addTurma,
  updateTurma,
  deleteTurma,
  getTurmaById,
  matricularAluno,
  removerAluno,
};
