const { request, response } = require("express");
const {
  getAlunosDB,
  addAlunoDB,
  updateAlunoDB,
  deleteAlunoDB,
  getAlunoByIdDB,
} = require("../usecases/alunoUseCases");

const getAlunos = async (request, response) => {
  await getAlunosDB()
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const addAluno = async (request, response) => {
  await addAlunoDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Aluno criado",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const updateAluno = async (request, response) => {
  const { id } = request.params;
  await updateAlunoDB(id, request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Aluno atualizado",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const deleteAluno = async (request, response) => {
  const { id } = request.params;
  await deleteAlunoDB(id)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Aluno excluído",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const getAlunoById = async (request, response) => {
  const { id } = request.params;
  await getAlunoByIdDB(id)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Aluno encontrado",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

module.exports = { getAlunos, addAluno, updateAluno, deleteAluno, getAlunoById };
