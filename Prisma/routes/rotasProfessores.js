const { Router } = require("express");
const {
  getProfessores,
  addProfessor,
} = require("../controllers/professorController");

const rotasProfessores = new Router();

rotasProfessores.route("/professores").get(getProfessores).post(addProfessor);

module.exports = { rotasProfessores };
