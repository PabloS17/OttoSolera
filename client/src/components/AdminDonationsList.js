// src/components/AdminDonationsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get('/api/admins/donations');
        setDonations(res.data);
      } catch (error) {
        console.error('Error al obtener las donaciones:', error);
      }
    };

    fetchDonations();
  }, []);

  // Función para eliminar una donación
  const deleteDonation = async (id) => {
    try {
      await axios.delete(`/api/admins/donations/${id}`);
      setDonations(donations.filter(donation => donation._id !== id)); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar la donación:', error);
    }
  };

  // Filtrar donaciones según el término de búsqueda
  const filteredDonations = donations.filter(donation =>
    donation.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Formularios Entrantes de Donaciones</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar donaciones por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Lista de donaciones */}
      <ul>
        {filteredDonations.map(donation => (
          <li key={donation._id}>
            {donation.nombre} - {donation.email}
            <button onClick={() => deleteDonation(donation._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDonationsList;
