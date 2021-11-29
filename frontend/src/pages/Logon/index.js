import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logoF.png';
import herosImg from '../../assets/coin.png';

export default function Logon() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id, password });

      localStorage.setItem('userId', id);
      localStorage.setItem('userPass', password);
      localStorage.setItem('userName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <Link to="/">
          <img src={logoImg} alt="Hotline Billing" />
        </Link>

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            required="true"
            onChange={e => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            required="true"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#9e06ff" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <div className="logon-image-container">
        <img src={herosImg} alt="Heroes" />
      </div>
    </div>
  );
}
