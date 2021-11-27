const express = require('express');

const UsersController = require('./controllers/UsersController');
const TransactionsController = require('./controllers/TransactionsController');
const ProfileController = require('./controllers/ProfileController');
const SessionsController = require('./controllers/SessionController');

const routes = express.Router();

//Cria rotas da aplicação que recebe a rota e parâmetros de requisição e resposta
routes.post('/sessions', SessionsController.create);

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.create);

routes.get('/profile', ProfileController.index);

routes.get('/transactions', TransactionsController.index);
routes.post('/transactions', TransactionsController.create);
routes.delete('/transactions/:id', TransactionsController.delete);

module.exports = routes;
