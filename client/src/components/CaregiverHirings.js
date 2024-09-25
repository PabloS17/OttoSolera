// src/components/CaregiverHirings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CaregiverHirings = () => {
  const [hirings, setHirings] = useState([]);

  useEffect(() => {
    const fetchHirings = async () => {
      try {
        const res = await axios.get('/api/caregivers/caregivers/contrataciones', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHirings(res.data);
      } catch (error) {
        console.error('Error al obtener las contrataciones:', error);
      }
    };

    fetchHirings();
  }, []);

  // Aceptar solicitud
  const acceptHiring = async (hiringId) => {
    try {
      const res = await axios.put(`/api/caregivers/caregivers/contrataciones/${hiringId}/aceptar`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(res.data.msg);
      // Recargar la lista
      const updatedHirings = hirings.map(hiring => hiring._id === hiringId ? { ...hiring, estado: 'aprobado' } : hiring);
      setHirings(updatedHirings);
    } catch (error) {
      console.error('Error al aceptar la contratación:', error);
    }
  };

  // Rechazar solicitud
  const rejectHiring = async (hiringId) => {
    try {
      const res = await axios.put(`/api/caregivers/caregivers/contrataciones/${hiringId}/rechazar`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(res.data.msg);
      // Recargar la lista
      const updatedHirings = hirings.map(hiring => hiring._id === hiringId ? { ...hiring, estado: 'rechazado' } : hiring);
      setHirings(updatedHirings);
    } catch (error) {
      console.error('Error al rechazar la contratación:', error);
    }
  };

  return (
    <div>
      <h2>Contrataciones Recibidas</h2>
      <ul>
        {hirings.map((hiring) => (
          <li key={hiring._id}>
            <p><strong>Mensaje:</strong> {hiring.message}</p>
            <p><strong>Estado:</strong> {hiring.estado}</p>
            {hiring.estado === 'pendiente' && (
              <>
                <button onClick={() => acceptHiring(hiring._id)}>Aceptar</button>
                <button onClick={() => rejectHiring(hiring._id)}>Rechazar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaregiverHirings;
