// src/components/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenido a Nuestra Plataforma de Asistencia</h1>
      <p>
        Esta plataforma está diseñada para ayudar a conectar cuidadores con beneficiarios que necesitan asistencia.
        También ofrecemos la posibilidad de que patrocinadores y donadores contribuyan para mejorar la calidad de vida
        de las personas que lo necesitan.
      </p>
      <h2>Nuestros Servicios</h2>
      <ul>
        <li>Inscripción para cuidadores profesionales.</li>
        <li>Registro de beneficiarios que requieren asistencia.</li>
        <li>Contribuciones de patrocinadores y donadores.</li>
      </ul>
      <h2>¿Cómo puedes participar?</h2>
      <p>
        Si eres un cuidador interesado en ofrecer tus servicios o un beneficiario que necesita asistencia, puedes
        inscribirte utilizando las opciones en el menú. También invitamos a los patrocinadores y donadores a contribuir
        para que podamos continuar ofreciendo estos valiosos servicios.
      </p>
    </div>
  );
};

export default HomePage;
