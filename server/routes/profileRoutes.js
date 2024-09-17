// server/routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Beneficiary = require('../models/Beneficiary');
const Caregiver = require('../models/Caregiver');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware para proteger la ruta y verificar el token

// Obtener información del perfil basado en el rol del usuario
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // El ID del usuario autenticado
    const role = req.user.role; // El rol del usuario

    let userProfile;

    if (role === 'admin') {
      userProfile = await Admin.findById(userId).select('-password'); // Excluir el campo de contraseña
    } else if (role === 'beneficiary') {
      userProfile = await Beneficiary.findById(userId).select('-password');
    } else if (role === 'caregiver') {
      userProfile = await Caregiver.findById(userId).select('-password');
    }

    if (!userProfile) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// server/routes/profileRoutes.js
router.put('/profile', authMiddleware, async (req, res) => {
    const { nombre, apellidos, correo, telefono, residencia, especialidades, experiencia } = req.body;
    const userId = req.user.id;
    const role = req.user.role;
  
    try {
      let updatedProfile;
  
      if (role === 'admin') {
        updatedProfile = await Admin.findByIdAndUpdate(
          userId,
          { nombre, apellidos, correo, telefono },
          { new: true }
        );
      } else if (role === 'beneficiary') {
        updatedProfile = await Beneficiary.findByIdAndUpdate(
          userId,
          { nombre, apellidos, correo, telefono, residencia },
          { new: true }
        );
      } else if (role === 'caregiver') {
        updatedProfile = await Caregiver.findByIdAndUpdate(
          userId,
          { nombre, apellidos, correo, telefono, residencia, especialidades, experiencia },
          { new: true }
        );
      }
  
      if (!updatedProfile) {
        return res.status(404).json({ msg: 'Perfil no encontrado' });
      }
  
      res.json({ msg: 'Perfil actualizado con éxito', updatedProfile });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
});

module.exports = router;