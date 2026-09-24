const { Router } = require('express');
const todasAsRotas = require('./indexRoutes');

const rotas = new Router();


todasAsRotas.forEach(rota => rotas.use(rota));

module.exports = rotas;