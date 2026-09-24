const { Router } = require("express");
const {
  getTurmas,
  addTurma,
  updateTurma,
  deleteTurma,
  getTurmaById
} = require("../controllers/turmaController");

const rotasTurmas = new Router();

rotasTurmas.route("/turmas").get(getTurmas).post(addTurma);
rotasTurmas.route("/turmas/:id").get(getTurmaById).put(updateTurma).delete(deleteTurma);

module.exports = rotasTurmas ;