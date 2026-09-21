const { request, response } = require("express");
const {
  getProfessoresDB,
  addProfessorDB,
} = require("../usecases/professorUseCases");

const getProfessores = async (request, response) => {
  await getProfessoresDB()
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

const addProfessor = async (request, response) => {
  await addProfessorDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Professor criado",
        objeto: data,
      }),
    )
    .catch((err) =>
      response.status(400).json({ status: "error", message: err }),
    );
};

module.exports = { getProfessores, addProfessor };
