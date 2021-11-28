import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [transactions, setTransactions] = useState([]);

  const history = useHistory();

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

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

  async function handleDeleteTransaction(id) {
    try {
      await api.delete(`transactions/${id}`, {
        headers: { Authorization: userId }
      });

      setTransactions(
        transactions.filter(transactions => transactions.id !== id)
      );
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo(a), {userName}!</span>

        <Link className="button" to="/transactions/new">
          Cadastrar nova transação
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Transações cadastradas</h1>
      <ul>
        {transactions.map(transactions => (
          <li key={transactions.id}>
            <strong>TRANSAÇÃO:</strong>
            <p>{transactions.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{transactions.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(transactions.value)}
            </p>

            <strong>CATEGORIA:</strong>
            <p>{transactions.category}</p>

            <button
              onClick={() => handleDeleteTransaction(transactions.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
