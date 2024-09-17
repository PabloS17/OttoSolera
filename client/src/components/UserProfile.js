// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    residencia: '',
    especialidades: '',
    experiencia: '',
  });
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        setProfile(res.data);
        setRole(res.data.role); // Asigna el rol del usuario
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
              type="text"
              name="residencia"
              value={profile.residencia}
              onChange={onChange}
              placeholder="Residencia"
            />
            {role === 'caregiver' && (
              <>
                <input
                  type="text"
                  name="especialidades"
                  value={profile.especialidades}
                  onChange={onChange}
                  placeholder="Especialidades"
                />
                <input
                  type="text"
                  name="experiencia"
                  value={profile.experiencia}
                  onChange={onChange}
                  placeholder="Experiencia"
                />
              </>
            )}
          </>
        )}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default UserProfile;
