// src/components/AdminApprovedCaregiversList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminApprovedCaregiversList = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const res = await axios.get('/api/admins/caregivers/approved');
        setCaregivers(res.data);
      } catch (error) {
        console.error('Error al obtener los cuidadores aprobados:', error);
      }
    };

    fetchCaregivers();
  }, []);

  // Filtrar cuidadores aprobados según el término de búsqueda
  const filteredCaregivers = caregivers.filter(caregiver =>
    caregiver.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para eliminar (lógicamente) un cuidador
  const deleteCaregiver = async (id) => {
    try {
      await axios.put(`/api/admins/caregivers/delete/${id}`);
      setCaregivers(caregivers.filter(caregiver => caregiver._id !== id)); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar al cuidador:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Cuidadores Aprobados</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar cuidadores por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Lista de cuidadores aprobados */}
      <ul>
        {filteredCaregivers.map(caregiver => (
          <li key={caregiver._id}>
            {caregiver.nombre} {caregiver.apellidos} - {caregiver.email}
            <button onClick={() => deleteCaregiver(caregiver._id)}>Eliminar</button>
            <button onClick={() => window.location.href = `/admin/caregivers/edit/${caregiver._id}`}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminApprovedCaregiversList;
