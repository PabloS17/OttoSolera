// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    nombre: '',
    apellidos: '',
    identificacion: '',
    correo: '',
    telefono: '',
    residencia: '',
    edad: '',
    especialidades: '',
    experiencia: '',
    necesidades: '', // Solo para beneficiarios
  });
  
  const [role, setRole] = useState('');
  const [averageRating, setAverageRating] = useState(null); // Medidor de satisfacción

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        setProfile(res.data);
        setRole(res.data.role); // Asigna el rol del usuario

        // Si es beneficiario o cuidador, obtener el promedio de calificaciones
        if (res.data.role === 'beneficiary' || res.data.role === 'caregiver') {
          const ratingRes = await axios.get(`/api/users/${res.data._id}/feedback/average`);
          setAverageRating(ratingRes.data.averageRating);
        }
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  const onChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile', profile);
      alert('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div>
      <h2>Perfil del Usuario</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="nombre"
          value={profile.nombre}
          onChange={onChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="apellidos"
          value={profile.apellidos}
          onChange={onChange}
          placeholder="Apellidos"
          required
        />
        <input
          type="text"
          name="identificacion"
          value={profile.identificacion}
          onChange={onChange}
          placeholder="Identificación"
          required
        />
        <input
          type="email"
          name="correo"
          value={profile.correo}
          onChange={onChange}
          placeholder="Correo"
          required
        />
        <input
          type="text"
          name="telefono"
          value={profile.telefono}
          onChange={onChange}
          placeholder="Teléfono"
          required
        />

        {role !== 'admin' && (
          <>
            <input
              type="number"
              name="edad"
              value={profile.edad}
              onChange={onChange}
              placeholder="Edad"
              required
            />
            <input
              type="text"
              name="residencia"
              value={profile.residencia}
              onChange={onChange}
              placeholder="Lugar de Residencia"
              required
            />

            {role === 'beneficiary' && (
              <textarea
                name="necesidades"
                value={profile.necesidades}
                onChange={onChange}
                placeholder="Necesidades"
                required
              />
            )}

            {role === 'caregiver' && (
              <>
                <textarea
                  name="especialidades"
                  value={profile.especialidades}
                  onChange={onChange}
                  placeholder="Especialidades"
                />
                <textarea
                  name="experiencia"
                  value={profile.experiencia}
                  onChange={onChange}
                  placeholder="Experiencia"
                />
              </>
            )}

            {/* Mostrar el medidor de satisfacción solo para beneficiarios y cuidadores */}
            {averageRating !== null && (
              <p>Calificación Promedio: {averageRating.toFixed(1)} / 5 estrellas</p>
            )}
          </>
        )}

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default UserProfile;
