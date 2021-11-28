import React from 'react';

import './global.css';

import Routes from './routes';

// O html escrito num arquivo Javascript se chama JSX (JavaScript XML (sintaxe do html))
//Um componente, no React, é uma função que retorna HTML. Pode ter funcinalidades JS e CSS.
//Verificar o que é o conceito de ESTADO e IMUTABILIDADE no REACT

function App() {
  return <Routes />;
}

export default App;
