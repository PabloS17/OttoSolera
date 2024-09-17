// src/components/AdminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ logout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Página de inicio</Link></li>
        <li><Link to="/admin/caregivers">Formularios entrantes de nuevos cuidadores</Link></li>
        <li><Link to="/admin/caregivers/approved">Lista de cuidadores aprobados</Link></li>
        <li><Link to="/admin/beneficiaries">Lista de beneficiarios</Link></li>
        <li><Link to="/admin/donations">Lista de donaciones</Link></li>
        <li><Link to="/profile">Perfil</Link></li>
        <li><button onClick={logout}>Cerrar sesión</button></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
