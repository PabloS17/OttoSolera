import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CaregiversList = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [favorites, setFavorites] = useState([]); // Para almacenar cuidadores favoritos
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(''); // Mensaje para la solicitud de contratación
  const [showNotification, setShowNotification] = useState(false); // Para mostrar la notificación emergente

  // Obtener la lista de cuidadores
  const fetchCaregivers = useCallback(async () => {
    try {
      const res = await axios.get('/api/caregivers/caregivers', {
        params: { search }
      });
      setCaregivers(res.data);
    } catch (error) {
      console.error('Error al obtener los cuidadores:', error);
    }
  }, [search]);

  // Obtener la lista de favoritos del beneficiario
  const fetchFavorites = useCallback(async () => {
    try {
      const res = await axios.get('/api/beneficiaries/favorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFavorites(res.data.map(fav => fav._id));  // Obtener solo los IDs de los cuidadores favoritos
    } catch (error) {
      console.error('Error al obtener los favoritos:', error);
    }
  }, []);

  useEffect(() => {
    fetchCaregivers();
    fetchFavorites(); // Obtener favoritos al cargar el componente
  }, [search, fetchCaregivers, fetchFavorites]);

  // Enviar solicitud de contratación
  const sendRequest = async (caregiverId) => {
    try {
      const res = await axios.post(`/api/caregivers/caregivers/${caregiverId}/contratacion`, { message });
      alert(res.data.msg);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  // Marcar o desmarcar un cuidador como favorito
  const toggleFavorite = async (caregiverId) => {
    try {
      const isFavorite = favorites.includes(caregiverId);

      if (isFavorite) {
        await axios.delete(`/api/beneficiaries/favorites/${caregiverId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFavorites(favorites.filter(fav => fav !== caregiverId)); // Eliminar de favoritos
      } else {
        await axios.post(`/api/beneficiaries/favorites/${caregiverId}`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFavorites([...favorites, caregiverId]); // Añadir a favoritos
      }
    } catch (error) {
      console.error('Error al gestionar favoritos:', error);
    }
  };

  // Mostrar notificación emergente si el cuidador tiene costo mayor a 0
  const handleCaregiverClick = (costo) => {
    if (costo > 0) {
      setShowNotification(true);
    }
  };

  return (
    <div>
      <h2>Lista de Cuidadores</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar cuidador por nombre, apellidos o especialidades"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de cuidadores */}
      <ul>
        {caregivers.map((caregiver) => (
          <li key={caregiver._id} onClick={() => handleCaregiverClick(caregiver.costo)}>
            <h3>{caregiver.nombre} {caregiver.apellidos}</h3>
            <p>Especialidades: {caregiver.especialidades}</p>
            <p>Experiencia: {caregiver.experiencia}</p>

            {/* Mostrar el costo y el costo adicional si aplica */}
            {caregiver.costo > 0 ? (
              <>
                <p><strong>Costo del servicio:</strong> ₡{caregiver.costo}</p>
                <p><strong>Costo adicional (3%):</strong> ₡{caregiver.costoExtra}</p>
                <p><strong>Total a pagar:</strong> ₡{caregiver.totalCosto}</p>
              </>
            ) : (
              <p><strong>Este cuidador no cobra por sus servicios</strong></p>
            )}

            {/* Campo para enviar un mensaje opcional */}
            <input
              type="text"
              placeholder="Mensaje para el cuidador"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={() => sendRequest(caregiver._id)}>
              Enviar solicitud de contratación
            </button>

            {/* Botón para añadir o eliminar de favoritos */}
            <button onClick={() => toggleFavorite(caregiver._id)}>
              {favorites.includes(caregiver._id) ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
            </button>
          </li>
        ))}
      </ul>

      {/* Notificación emergente */}
      {showNotification && (
        <div className="notification">
          <p>Un 3% del total será destinado a la fundación para ayudar a aquellos cuidadores en necesidad.</p>
          <button onClick={() => setShowNotification(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default CaregiversList;
