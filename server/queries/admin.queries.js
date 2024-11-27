const { User } = require('../models/user.model');
const { Product } = require('../models/product.model');

// Consultas relacionadas con usuarios
const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ['password'] }, // Excluir la contraseña
  });
};

const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] }, // Excluir la contraseña
  });
};

const updateUser = async (id, updatedData) => {
  const [updated] = await User.update(updatedData, {
    where: { id },
    returning: true,
  });
  return updated;
};

const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

// Consultas relacionadas con productos
const getAllProducts = async () => {
  return await Product.findAll();
};

const getProductById = async (id) => {
  return await Product.findByPk(id);
};

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const updateProduct = async (id, updatedData) => {
  const [updated] = await Product.update(updatedData, {
    where: { id },
    returning: true,
  });
  return updated;
};

const deleteProduct = async (id) => {
  return await Product.destroy({ where: { id } });
};

module.exports = {
  // Usuarios
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  
  // Productos
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
