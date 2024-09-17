// src/components/AdminRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    identificacion: '',
    correo: '',
    telefono: '',
    password: '',
  });

  const { nombre, apellidos, identificacion, correo, telefono, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admins/register', formData);
      console.log('Registro exitoso:', res.data);
    } catch (error) {
      console.error('Error en el registro:', error.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="nombre"
        value={nombre}
        onChange={onChange}
        placeholder="Nombre"
        required
      />
      <input
        type="text"
        name="apellidos"
        value={apellidos}
        onChange={onChange}
        placeholder="Apellidos"
        required
      />
      <input
        type="text"
        name="identificacion"
        value={identificacion}
        onChange={onChange}
        placeholder="Identificación"
        required
      />
      <input
        type="email"
        name="correo"
        value={correo}
        onChange={onChange}
        placeholder="Correo"
        required
      />
      <input
        type="text"
        name="telefono"
        value={telefono}
        onChange={onChange}
        placeholder="Teléfono"
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
      <button type="submit">Registrar Administrador</button>
    </form>
  );
};

export default AdminRegister;
