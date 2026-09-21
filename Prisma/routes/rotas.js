const { Router } = require("express");
const { rotasProfessores } = require("./rotasProfessores");

const rotas = new Router();

rotas.use(rotasProfessores);

module.exports = rotas;
