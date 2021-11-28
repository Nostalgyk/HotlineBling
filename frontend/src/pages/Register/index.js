import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [salary, setSalary] = useState('');
  const [office, setOffice] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
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

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro. Revise os dados e tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <Link to="/">
            <img src={logoImg} alt="Be The Hero" />
          </Link>

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e comece a gerenciar melhor e
            de forma mais inteligente suas despesas!
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="Sua idade"
            value={age}
            onChange={e => setAge(e.target.value)}
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>

          <div className="input-group">
            <input
              placeholder="Salário"
              value={salary}
              onChange={e => setSalary(e.target.value)}
            />
            <input
              placeholder="Ocupação"
              value={office}
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
