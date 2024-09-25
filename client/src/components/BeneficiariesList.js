import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BeneficiariesList = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [favorites, setFavorites] = useState([]); // Para almacenar beneficiarios favoritos
  const [search, setSearch] = useState('');

  // Obtener la lista de beneficiarios
  const fetchBeneficiaries = useCallback(async () => {
    try {
      const res = await axios.get('/api/beneficiaries', {
        params: { search }
      });
      setBeneficiaries(res.data);
    } catch (error) {
      console.error('Error al obtener los beneficiarios:', error);
    }
  }, [search]);

  // Obtener la lista de favoritos del cuidador
  const fetchFavorites = async () => {
    try {
      const res = await axios.get('/api/caregivers/favorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFavorites(res.data);
    } catch (error) {
      console.error('Error al obtener los favoritos:', error);
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
    fetchFavorites(); // Obtener favoritos al cargar el componente
  }, [search, fetchBeneficiaries]);

  // Marcar o desmarcar un beneficiario como favorito
  const toggleFavorite = async (beneficiaryId) => {
    try {
      const isFavorite = favorites.some(fav => fav._id === beneficiaryId);

      if (isFavorite) {
        await axios.delete(`/api/caregivers/favorites/${beneficiaryId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFavorites(favorites.filter(fav => fav._id !== beneficiaryId)); // Eliminar de favoritos
      } else {
        await axios.post(`/api/caregivers/favorites/${beneficiaryId}`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFavorites([...favorites, beneficiaries.find(b => b._id === beneficiaryId)]); // Añadir a favoritos
      }
    } catch (error) {
      console.error('Error al gestionar favoritos:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Beneficiarios</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar beneficiario por nombre, apellidos o correo"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de beneficiarios */}
      <ul>
        {beneficiaries.map((beneficiary) => (
          <li key={beneficiary._id}>
            <h3>{beneficiary.nombre} {beneficiary.apellidos}</h3>
            <p>Correo: {beneficiary.correo}</p>

            {/* Botón para añadir o eliminar de favoritos */}
            <button onClick={() => toggleFavorite(beneficiary._id)}>
              {favorites.some(fav => fav._id === beneficiary._id) ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeneficiariesList;
