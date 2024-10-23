// src/components/HomePage.js
import React from 'react';
import Logo from '../LogoOttoSolera.jpg';
import '../styles/homePageStyles.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="hero-section">
        <h1>Fundación Otto Solera</h1>
      </header>
      <div className="content-container">
        <section className="section-info">
          <h2>Misión</h2>
          <p>
            La Fundación Otto Solera tiene como misión el crear oportunidades para mejorar la calidad de vida de las personas en estado de vulnerabilidad, pobreza extrema e infortunio, esto mediante la realización de programas y proyectos.
          </p>
        </section>

        <section className="section-info">
          <h2>Visión</h2>
          <p>
            Ser la fundación líder en la atención de poblaciones en estado de vulnerabilidad mediante la alianza estratégica con otras organizaciones públicas y privadas que persigan los mismos fines.
          </p>
        </section>

        <section className="section-info">
          <h2>Valores</h2>
          <ul>
            <li>Solidaridad</li>
            <li>Colaboración</li>
            <li>Transparencia</li>
            <li>Pasión</li>
            <li>Honestidad</li>
            <li>Impacto social</li>
            <li>Amor a la familia</li>
            <li>Empatía</li>
          </ul>
        </section>
      </div>

      <div className="roles-container">
        <div className="role-card">
          <h3>Cuidador</h3>
          <p>
            Quieres ser un cuidador? Las personas cuidadoras ofrecen sus servicios de asistencia a personas en condición de discapacidad. Puedes escoger los servicios a ofrecer, si deseas cobrar o trabajar por amor al oficio, con que beneficiarios trabajar, entre muchas otras funciones.
          </p>
        </div>

        <div className="role-card">
          <h3>Donador</h3>
          <p>
            Si quieres realizar una donación o participar como patrocinador de la empresa puedes llenar un formulario con tus datos y serás contactado por un ente especializado de la empresa.
          </p>
        </div>

        <div className="role-card">
          <h3>Beneficiario</h3>
          <p>
            Quieres ser un beneficiario? Los beneficiarios pueden buscar dentro de nuestra lista de cuidadores para encontrar al cuidador que te brinde los servicios exactos que necesites. Puedes buscar por precio, servicios ofrecidos, entre otras características.
          </p>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Fundación Otto Solera</p>
        <div className="footer-logo">
          <img src={Logo} alt="Fundación Otto Solera"/>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
