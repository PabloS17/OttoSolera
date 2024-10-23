// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Página de inicio</Link></li>
        <li><Link to="/inscripcion-cuidadores">Inscripción para Cuidadores</Link></li>
        <li><Link to="/inscripcion-beneficiarios">Inscripción para Beneficiarios</Link></li>
        <li><Link to="/formulario-donadores">Formulario para Patrocinadores/Donadores</Link></li>
        <li><Link to="/login">Inico de sesión</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
