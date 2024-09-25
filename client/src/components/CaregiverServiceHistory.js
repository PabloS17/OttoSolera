// src/components/CaregiverServiceHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CaregiverServiceHistory = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceHistory = async () => {
      try {
        const res = await axios.get('/api/caregivers/caregivers/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setServices(res.data); // Almacenar los servicios
        setLoading(false);
      } catch (err) {
        setError('Error al obtener el historial de servicios');
        setLoading(false);
      }
    };

    fetchServiceHistory();
  }, []);

  if (loading) {
    return <p>Cargando el historial de servicios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Historial de Servicios como Cuidador</h2>
      {services.length === 0 ? (
        <p>No tienes servicios registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre del Beneficiario</th>
              <th>Correo del Beneficiario</th>
              <th>Fecha de Servicio</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>{service.beneficiaryNombre}</td>
                <td>{service.beneficiaryCorreo}</td>
                <td>{new Date(service.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CaregiverServiceHistory;
