import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CaregiverCertifications = () => {
  const [certificaciones, setCertificaciones] = useState([]);
  const [newCertificacion, setNewCertificacion] = useState({
    nombre: '',
    url: '',
  });

  useEffect(() => {
    const fetchCertificaciones = async () => {
      try {
        const res = await axios.get('/api/certificaciones', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCertificaciones(res.data);
      } catch (error) {
        console.error('Error al obtener las certificaciones:', error);
      }
    };

    fetchCertificaciones();
  }, []);

  const handleInputChange = (e) => {
    setNewCertificacion({ ...newCertificacion, [e.target.name]: e.target.value });
  };

  const submitCertificacion = async () => {
    try {
      const res = await axios.post('/api/certificaciones', newCertificacion, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCertificaciones([...certificaciones, res.data]); // Agregar la nueva certificación a la lista
      setNewCertificacion({ nombre: '', url: '' }); // Limpiar el formulario
    } catch (error) {
      console.error('Error al agregar la certificación:', error);
    }
  };

  const deleteCertificacion = async (id) => {
    try {
      await axios.delete(`/api/certificaciones/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCertificaciones(certificaciones.filter(cert => cert._id !== id)); // Eliminar de la lista
    } catch (error) {
      console.error('Error al eliminar la certificación:', error);
    }
  };

  return (
    <div>
      <h2>Certificaciones y Capacitaciones</h2>
      <ul>
        {certificaciones.map(cert => (
          <li key={cert._id}>
            <strong>{cert.nombre}</strong>
            {cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer"> Ver documento</a>}
            <button onClick={() => deleteCertificacion(cert._id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Añadir Nueva Certificación</h3>
      <input
        type="text"
        name="nombre"
        value={newCertificacion.nombre}
        onChange={handleInputChange}
        placeholder="Nombre de la certificación"
        required
      />
      <input
        type="text"
        name="url"
        value={newCertificacion.url}
        onChange={handleInputChange}
        placeholder="URL del documento (opcional)"
      />
      <button onClick={submitCertificacion}>Agregar Certificación</button>
    </div>
  );
};

export default CaregiverCertifications;
