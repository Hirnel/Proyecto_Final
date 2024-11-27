const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas.

const router = express.Router();

// Rutas para usuarios
router.post('/register', userController.registerUser); // Registrar usuario
router.post('/login', userController.loginUser); // Iniciar sesión
router.get('/profile', authMiddleware, userController.getUserProfile); // Obtener perfil del usuario autenticado
router.put('/profile', authMiddleware, userController.updateUser); // Actualizar perfil del usuario autenticado
router.delete('/profile', authMiddleware, userController.deleteUser); // Eliminar usuario autenticado

module.exports = router;
