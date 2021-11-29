import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiEye } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logoF.png';

export default function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [salary, setSalary] = useState('');
  const [office, setOffice] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      password,
      age,
      email,
      whatsapp,
      city,
      uf,
      salary,
      office
    };

    try {
      const response = await api.post('users', data);

      alert(
        `Cadastro realizado com sucesso! Sua ID de acesso: ${response.data.id}`
      );

      history.push('/profile');
    } catch (err) {
      alert('Erro no cadastro. Revise os dados e tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <Link to="/">
            <img src={logoImg} alt="Hotline Billing" />
          </Link>

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e comece a gerenciar melhor e
            de forma mais inteligente suas despesas!
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#9e06ff" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Seu nome"
            value={name}
            required="true"
            onChange={e => setName(e.target.value)}
          />
          <div id="pass">
            <input
              placeholder="Sua senha"
              value={password}
              type={passwordShown ? 'text' : 'password'}
              required="true"
              onChange={e => setPassword(e.target.value)}
            />
            <button id="eye" onClick={togglePassword}>
              <FiEye size={20} color="#a8a8b6" />
            </button>
          </div>
          <input
            placeholder="Sua idade"
            value={age}
            required="true"
            onChange={e => setAge(e.target.value)}
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            required="true"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            required="true"
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              required="true"
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              value={uf}
              required="true"
              maxLength="2"
              onChange={e => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>

          <div className="input-group">
            <input
              placeholder="Salário"
              value={salary}
              required="true"
              onChange={e => setSalary(e.target.value)}
            />
            <input
              placeholder="Ocupação"
              value={office}
              required="true"
              onChange={e => setOffice(e.target.value)}
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
