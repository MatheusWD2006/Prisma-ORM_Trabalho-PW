const { Router } = require("express");
const {
  getAlunos,
  addAluno,
  updateAluno,
  deleteAluno,
  getAlunoById
} = require("../controllers/alunoController");

const rotasAlunos = new Router();

rotasAlunos.route("/alunos").get(getAlunos).post(addAluno);
rotasAlunos.route("/alunos/:id").get(getAlunoById).put(updateAluno).delete(deleteAluno);

module.exports = rotasAlunos ;