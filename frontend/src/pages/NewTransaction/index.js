import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function NewTransaction() {
  const [title, setTitle] = useState('');
  const [description, setDescripion] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const history = useHistory();

  const userId = localStorage.getItem('userId');

  async function handleNewTransaction(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
      category
    };

    try {
      await api.post('transactions', data, {
        headers: {
          Authorization: userId
        }
      });

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="new-transaction-container">
      <div className="content">
        <section>
          <Link to="/">
            <img src={logoImg} alt="Be The Hero" />
          </Link>

          <h1>Cadastrar nova transação</h1>
          <p>Preencha as informações referente à transação.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewTransaction}>
          <input
            placeholder="Título da transação"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descricao"
            value={description}
            onChange={e => setDescripion(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Valor em reais"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <input
              placeholder="Categoria"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
