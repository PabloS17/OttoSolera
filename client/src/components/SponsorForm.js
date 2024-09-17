// src/components/SponsorForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Importa Link para redirección

const SponsorForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    perteneceCompania: false,
    correo: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const { nombre, apellidos, perteneceCompania, correo } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Validaciones
  const validateForm = () => {
    const newErrors = {};
    if (!nombre || nombre.length < 2) newErrors.nombre = 'El nombre debe tener al menos 2 caracteres.';
    if (!apellidos || apellidos.length < 2) newErrors.apellidos = 'Los apellidos deben tener al menos 2 caracteres.';
    if (!correo || !/\S+@\S+\.\S+/.test(correo)) newErrors.correo = 'El correo electrónico no es válido.';
    return newErrors;
  };

  const onSubmit = async e => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post('/api/donations', formData);
      setSuccessMessage('Su donación ha sido enviada exitosamente.');
      setFormData({
        nombre: '',
        apellidos: '',
        perteneceCompania: false,
        correo: ''
      });
    } catch (error) {
      setErrors({ server: error.response ? error.response.data.message : 'Error al enviar el formulario' });
    }
  };

  return (
    <div>
      {successMessage ? (
        <div>
          <h2>{successMessage}</h2>
          <p>¡Gracias por su donación!</p>
          <Link to="/">Volver a la página principal</Link>  {/* Enlace para volver */}
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <h2>Formulario para Patrocinadores/Donadores</h2>
          <input type="text" name="nombre" value={nombre} onChange={onChange} placeholder="Nombre" required />
          {errors.nombre && <p className="error">{errors.nombre}</p>}
          
          <input type="text" name="apellidos" value={apellidos} onChange={onChange} placeholder="Apellidos" required />
          {errors.apellidos && <p className="error">{errors.apellidos}</p>}
          
          <label>
            <input
              type="checkbox"
              name="perteneceCompania"
              checked={perteneceCompania}
              onChange={() => setFormData({ ...formData, perteneceCompania: !perteneceCompania })}
            />
            ¿Pertenece a una compañía?
          </label>
          
          <input type="email" name="correo" value={correo} onChange={onChange} placeholder="Correo" required />
          {errors.correo && <p className="error">{errors.correo}</p>}
          
          {errors.server && <p className="error">{errors.server}</p>}
          
          <button type="submit">Enviar Formulario</button>
        </form>
      )}
    </div>
  );
};

export default SponsorForm;
