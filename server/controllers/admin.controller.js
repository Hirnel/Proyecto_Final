const User = require('../models/user.model');
const Product = require('../models/product.model'); // Supongamos que ya tienes un modelo de productos.

// Gestión de Usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const [updated] = await User.update({ username, email, role }, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

// Gestión de Productos
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const newProduct = await Product.create({ name, price, description, stock });
    res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const [updated] = await Product.update(
      { name, price, description, stock },
      { where: { id: req.params.id } }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};
