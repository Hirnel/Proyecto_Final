const { User } = require('../models/user.model');

// Consultas relacionadas con usuarios
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const findUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const updateUser = async (id, updatedData) => {
  return await User.update(updatedData, {
    where: { id },
    returning: true,
  });
};

const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
