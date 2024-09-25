// src/components/ServiceRequests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);

  // Obtener solicitudes de servicio para el cuidador autenticado
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/hiring/caregivers/contrataciones', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setRequests(res.data);
        setFilteredRequests(res.data);
      } catch (error) {
        console.error('Error al obtener solicitudes de servicio:', error);
      }
    };

    fetchRequests();
  }, []);

  // Manejar la búsqueda y filtrar las solicitudes
  useEffect(() => {
    setFilteredRequests(
      requests.filter(
        (request) =>
          request.message.toLowerCase().includes(search.toLowerCase()) ||
          request.beneficiaryId.nombre.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, requests]);

  // Aprobar solicitud de servicio
  const approveRequest = async (requestId) => {
    try {
      const res = await axios.put(`/api/caregivers/caregivers/contrataciones/${requestId}/aceptar`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert(res.data.msg);
      // Refrescar las solicitudes
      setRequests(requests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error('Error al aprobar la solicitud:', error);
    }
  };

  // Rechazar solicitud de servicio
  const rejectRequest = async (requestId) => {
    try {
      const res = await axios.put(`/api/caregivers/caregivers/contrataciones/${requestId}/rechazar`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert(res.data.msg);
      // Refrescar las solicitudes
      setRequests(requests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
    }
  };

  return (
    <div>
      <h2>Solicitudes de Servicio</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por mensaje o nombre del beneficiario"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de solicitudes */}
      {filteredRequests.length > 0 ? (
        <ul>
          {filteredRequests.map((request) => (
            <li key={request._id}>
              <h3>Mensaje: {request.message}</h3>
              <p>Beneficiario: {request.beneficiaryId.nombre} {request.beneficiaryId.apellidos}</p>
              <p>Correo del Beneficiario: {request.beneficiaryId.correo}</p>
              <p>Fecha de Solicitud: {new Date(request.createdAt).toLocaleDateString()}</p>

              <button onClick={() => approveRequest(request._id)}>Aprobar</button>
              <button onClick={() => rejectRequest(request._id)}>Rechazar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes solicitudes de servicio pendientes.</p>
      )}
    </div>
  );
};

export default ServiceRequests;
