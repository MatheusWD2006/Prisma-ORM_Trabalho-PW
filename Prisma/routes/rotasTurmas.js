const { Router } = require("express");
const {
  getTurmas,
  addTurma,
  updateTurma,
  deleteTurma,
  getTurmaById,
  matricularAluno,
  removerAluno,
} = require("../controllers/turmaController");

const rotasTurmas = new Router();

rotasTurmas.route("/turmas").get(getTurmas).post(addTurma);
rotasTurmas
  .route("/turmas/:id")
  .get(getTurmaById)
  .put(updateTurma)
  .delete(deleteTurma);
rotasTurmas.route("/turmas/:id/matricular").post(matricularAluno);
rotasTurmas.route("/turmas/:id/remover-aluno").post(removerAluno);

module.exports = rotasTurmas;
