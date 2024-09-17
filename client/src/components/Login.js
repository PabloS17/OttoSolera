// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthToken }) => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { correo, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/login', formData);
      const token = res.data.token;

      // Guardar el token y redirigir al dashboard del administrador
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/'); // Redirigir al homepage
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="correo"
          value={correo}
          onChange={onChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
