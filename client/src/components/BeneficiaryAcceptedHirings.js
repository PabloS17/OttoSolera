import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BeneficiaryAcceptedHirings = () => {
  const [hirings, setHirings] = useState([]);
  const [feedback, setFeedback] = useState({
    comentario: '',
    rating: 1, // Inicializamos con una estrella
  });

  useEffect(() => {
    const fetchHirings = async () => {
      try {
        const res = await axios.get('/api/beneficiaries/beneficiaries/contrataciones-aprobadas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHirings(res.data);
      } catch (error) {
        console.error('Error al obtener las contrataciones aprobadas:', error);
      }
    };

    fetchHirings();
  }, []);

  const handleInputChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const submitFeedback = async (caregiverEmail) => {
    try {
      // Primero obtener el caregiverId a partir del correo electrónico
      const caregiverResponse = await axios.get(`/api/caregivers/by-email/${caregiverEmail}`);
      const caregiverId = caregiverResponse.data._id;

      // Luego enviar el feedback utilizando el caregiverId
      const res = await axios.post(`/api/users/${caregiverId}/feedback`, feedback, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(res.data.message);
      setFeedback({
        comentario: '',
        rating: 1, // Reiniciar el formulario
      });
    } catch (error) {
      console.error('Error al enviar el feedback:', error);
    }
  };

  return (
    <div>
      <h2>Solicitudes Aceptadas</h2>
      <ul>
        {hirings.map((hiring) => (
          <li key={hiring._id}>
            <p><strong>Mensaje:</strong> {hiring.message}</p>
            <p><strong>Correo del cuidador:</strong> {hiring.caregiverEmail}</p>

            {/* Formulario para agregar reseña y puntuación */}
            <h3>Añadir Reseña y Puntuación</h3>
            <textarea
              name="comentario"
              value={feedback.comentario}
              onChange={handleInputChange}
              placeholder="Deja tu reseña"
              required
            />
            <br />
            <label>Puntuación (1-5 estrellas):</label>
            <select name="rating" value={feedback.rating} onChange={handleInputChange}>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>{star} Estrellas</option>
              ))}
            </select>
            <br />
            <button onClick={() => submitFeedback(hiring.caregiverEmail)}>Enviar Reseña</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeneficiaryAcceptedHirings;
