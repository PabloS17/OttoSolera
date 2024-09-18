// src/components/InactiveAccounts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InactiveAccounts = () => {
  const [inactiveCaregivers, setInactiveCaregivers] = useState([]);
  const [inactiveBeneficiaries, setInactiveBeneficiaries] = useState([]);

  useEffect(() => {
    const fetchInactiveAccounts = async () => {
      try {
        const res = await axios.get('/api/admins/inactivas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setInactiveCaregivers(res.data.cuidadoresInactivos);
        setInactiveBeneficiaries(res.data.beneficiariosInactivos);
      } catch (error) {
        console.error('Error al obtener cuentas inactivas:', error);
      }
    };

    fetchInactiveAccounts();
  }, []);

  const reactivateAccount = async (id, tipoUsuario) => {
    try {
      const res = await axios.put(`/api/admins/reactivar/${id}`, {
        tipoUsuario,
        datosActualizados: true,  // Simular que los datos han sido verificados
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(res.data.msg);
    } catch (error) {
      console.error('Error al reactivar la cuenta:', error);
    }
  };

  return (
    <div>
      <h2>Cuidadores Inactivos</h2>
      {inactiveCaregivers.map(caregiver => (
        <div key={caregiver._id}>
          <p>{caregiver.nombre} {caregiver.apellidos}</p>
          <button onClick={() => reactivateAccount(caregiver._id, 'caregiver')}>Reactivar</button>
        </div>
      ))}
      <h2>Beneficiarios Inactivos</h2>
      {inactiveBeneficiaries.map(beneficiary => (
        <div key={beneficiary._id}>
          <p>{beneficiary.nombre} {beneficiary.apellidos}</p>
          <button onClick={() => reactivateAccount(beneficiary._id, 'beneficiary')}>Reactivar</button>
        </div>
      ))}
    </div>
  );
};

export default InactiveAccounts;
