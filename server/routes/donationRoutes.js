// server/routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const {
  createDonation,
  getDonations,
  deleteDonation
} = require('../controllers/donationController');
//const { adminAuth } = require('../middleware/authMiddleware');

// Ruta pública para enviar donación
router.post('/', createDonation);

// Rutas protegidas (solo administradores)
//router.get('/', adminAuth, getDonations);
//router.delete('/:id', adminAuth, deleteDonation);

module.exports = router;
