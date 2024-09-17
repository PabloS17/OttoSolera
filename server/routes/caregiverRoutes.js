// server/routes/caregiverRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerCaregiver,
  loginCaregiver,
  getPendingCaregivers,
  approveCaregiver,
  rejectCaregiver
} = require('../controllers/caregiverController');
/*
const { adminAuth } = require('../middleware/authMiddleware');
*/
// Rutas públicas
router.post('/register', registerCaregiver);
router.post('/login', loginCaregiver);

// Rutas protegidas (solo administradores)
/*
router.get('/pending', adminAuth, getPendingCaregivers);
router.put('/approve/:id', adminAuth, approveCaregiver);
router.delete('/reject/:id', adminAuth, rejectCaregiver);
*/
module.exports = router;
