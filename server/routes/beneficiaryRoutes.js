// server/routes/beneficiaryRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerBeneficiary,
  loginBeneficiary,
  getBeneficiaries
} = require('../controllers/beneficiaryController');
//const { adminAuth } = require('../middleware/authMiddleware');

// Rutas públicas
router.post('/register', registerBeneficiary);
router.post('/login', loginBeneficiary);

// Rutas protegidas (solo administradores)
//router.get('/', adminAuth, getBeneficiaries);

module.exports = router;
