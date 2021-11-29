import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logoF.png';

import './styles.css';

export default function ChangeTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [setTitle] = useState('');
  const [setDescripion] = useState('');
  const [setValue] = useState('');
  const [setCategory] = useState('');

  const history = useHistory();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: userId
        }
      })
      .then(response => {
        setTransactions(response.data);
      });
  }, [userId]);

  async function handleChangeTransaction(id) {
    try {
      await api.put(`transactions/${id}`, {
        headers: { Authorization: userId }
      });

      setTransactions(
        transactions.filter(transactions => transactions.id !== id)
      );
    } catch (err) {
      alert('Erro ao atualizar transação, tente novamente.');
    }
  }

  return (
    <div className="change-transaction-container">
      <div className="content">
        <section>
          <Link to="/">
            <img src={logoImg} alt="Hotline Billing" />
          </Link>

          <h1>Alterando dados da transação</h1>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#9e06ff" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleChangeTransaction}>
          <input
            placeholder="Título da transação"
            value={transactions.title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descricao"
            value={transactions.description}
            onChange={e => setDescripion(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Valor em reais"
              value={transactions.value}
              onChange={e => setValue(e.target.value)}
            />
            <input
              placeholder="Categoria"
              value={transactions.category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
