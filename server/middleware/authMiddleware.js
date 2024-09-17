// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Asegúrate de que el token sea correcto
    req.user = decoded.user; // Añadir la información del usuario a la solicitud
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no es válido' });
  }
};

module.exports = authMiddleware;
