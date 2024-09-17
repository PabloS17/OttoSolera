// src/components/EditBeneficiary.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditBeneficiary = () => {
  const { id } = useParams();
  const [beneficiary, setBeneficiary] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    residencia: '',
    edad: '',
    necesidades: ''
  });

  useEffect(() => {
    const fetchBeneficiary = async () => {
      try {
        const res = await axios.get(`/api/admins/beneficiaries/${id}`);
        setBeneficiary(res.data);
      } catch (error) {
        console.error('Error al obtener los datos del beneficiario:', error);
      }
    };

    fetchBeneficiary();
  }, [id]);

  const onChange = (e) => setBeneficiary({ ...beneficiary, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admins/beneficiaries/${id}`, beneficiary);
      alert('Beneficiario actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el beneficiario:', error);
    }
  };

  return (
    <div>
      <h2>Editar Beneficiario</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="nombre"
          value={beneficiary.nombre}
          onChange={onChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="apellidos"
          value={beneficiary.apellidos}
          onChange={onChange}
          placeholder="Apellidos"
          required
        />
        <input
          type="email"
          name="correo"
          value={beneficiary.correo}
          onChange={onChange}
          placeholder="Correo"
          required
        />
        <input
          type="text"
          name="telefono"
          value={beneficiary.telefono}
          onChange={onChange}
          placeholder="Teléfono"
          required
        />
        <input
          type="text"
          name="residencia"
          value={beneficiary.residencia}
          onChange={onChange}
          placeholder="Residencia"
          required
        />
        <input
          type="number"
          name="edad"
          value={beneficiary.edad}
          onChange={onChange}
          placeholder="Edad"
          required
        />
        <input
          type="text"
          name="necesidades"
          value={beneficiary.necesidades}
          onChange={onChange}
          placeholder="Necesidades"
          required
        />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditBeneficiary;
