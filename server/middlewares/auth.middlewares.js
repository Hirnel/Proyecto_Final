const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Formato: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado, token faltante' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Agrega el usuario decodificado al objeto `req`
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
