const express = require('express');
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware'); // Verifica si es admin.

const router = express.Router();

// Gestión de usuarios
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.get('/users/:id', authMiddleware, adminMiddleware, adminController.getUserById);
router.put('/users/:id', authMiddleware, adminMiddleware, adminController.updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, adminController.deleteUser);

// Gestión de productos
router.post('/products', authMiddleware, adminMiddleware, adminController.createProduct);
router.put('/products/:id', authMiddleware, adminMiddleware, adminController.updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, adminController.deleteProduct);

module.exports = router;
