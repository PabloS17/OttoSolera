// src/components/AdminBeneficiariesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBeneficiariesList = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const res = await axios.get('/api/admins/beneficiaries');
        setBeneficiaries(res.data);
      } catch (error) {
        console.error('Error al obtener los beneficiarios:', error);
      }
    };

    fetchBeneficiaries();
  }, []);

  // Filtrar beneficiarios según el término de búsqueda
  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    beneficiary.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para eliminar un beneficiario
  const deleteBeneficiary = async (id) => {
    try {
      await axios.delete(`/api/admins/beneficiaries/${id}`);
      setBeneficiaries(beneficiaries.filter(beneficiary => beneficiary._id !== id)); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar el beneficiario:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Beneficiarios</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar beneficiarios por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Lista de beneficiarios */}
      <ul>
        {filteredBeneficiaries.map(beneficiary => (
          <li key={beneficiary._id}>
            {beneficiary.nombre} {beneficiary.apellidos} - {beneficiary.correo}
            <button onClick={() => deleteBeneficiary(beneficiary._id)}>Eliminar</button>
            <button onClick={() => window.location.href = `/admin/beneficiaries/edit/${beneficiary._id}`}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBeneficiariesList;
