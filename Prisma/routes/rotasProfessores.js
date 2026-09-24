const { Router } = require("express");
const {
  getProfessores,
  addProfessor,
  updateProfessor,
  deleteProfessor,
  getProfessorById
} = require("../controllers/professorController");

const rotasProfessores = new Router();

rotasProfessores.route("/professores").get(getProfessores).post(addProfessor);
rotasProfessores.route("/professores/:id").get(getProfessorById).put(updateProfessor).delete(deleteProfessor);

module.exports = rotasProfessores ;
