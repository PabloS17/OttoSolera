// src/components/AdminReviewFeedbacks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReviewFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('/api/revisions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFeedbacks(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los feedbacks para revisión');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const approveFeedback = async (id) => {
    try {
      await axios.put(`/api/approve/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFeedbacks(feedbacks.filter(fb => fb._id !== id));
    } catch (err) {
      console.error('Error al aprobar feedback:', err);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`/api/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFeedbacks(feedbacks.filter(fb => fb._id !== id));
    } catch (err) {
      console.error('Error al eliminar feedback:', err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Feedbacks en Revisión</h2>
      {feedbacks.length === 0 ? (
        <p>No hay feedbacks en revisión.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Comentario</th>
              <th>Puntuación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback._id}>
                <td>{feedback.comentario}</td>
                <td>{feedback.rating}</td>
                <td>
                  <button onClick={() => approveFeedback(feedback._id)}>Aprobar</button>
                  <button onClick={() => deleteFeedback(feedback._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReviewFeedbacks;
