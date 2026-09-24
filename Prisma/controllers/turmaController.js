const { request, response } = require("express");
const {
  getTurmasDB,
  addTurmaDB,
  updateTurmaDB,
  deleteTurmaDB,
  getTurmaByIdDB,
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

module.exports = { getTurmas, addTurma, updateTurma, deleteTurma, getTurmaById };
