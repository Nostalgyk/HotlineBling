//Cria variável express que contém todas as funcionalidades do módulo do express
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

//Criando variável que armazena/instancia a aplicação
const app = express();

app.use(
  cors()
  //   {
  //   origin: 'http://hotlinebling.com.br'
  // }
);
app.use(express.json());
app.use(routes);

//Fala para a aplicação ouvir essa porta, acessar ela quando for iniciar o projeto
app.listen(3333);
