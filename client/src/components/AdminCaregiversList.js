// src/components/AdminCaregiversList.js (modificado para aprobar y rechazar)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCaregiversList = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCaregivers = async () => {
      const res = await axios.get('/api/admins/caregivers/pending');
      setCaregivers(res.data);
    };
    fetchCaregivers();
  }, []);

  const approveCaregiver = async id => {
    await axios.post(`/api/admins/caregivers/approve/${id}`);
    setCaregivers(caregivers.filter(c => c._id !== id));
  };

  const rejectCaregiver = async id => {
    await axios.post(`/api/admins/caregivers/reject/${id}`);
    setCaregivers(caregivers.filter(c => c._id !== id));
  };

  const filteredCaregivers = caregivers.filter(caregiver =>
    caregiver.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Formularios Entrantes de Nuevos Cuidadores</h2>
      <input
        type="text"
        placeholder="Buscar cuidador por nombre"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredCaregivers.map(caregiver => (
          <li key={caregiver._id}>
            {caregiver.nombre} {caregiver.apellidos} - {caregiver.residencia}
            <button onClick={() => approveCaregiver(caregiver._id)}>Aprobar</button>
            <button onClick={() => rejectCaregiver(caregiver._id)}>Rechazar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCaregiversList;
