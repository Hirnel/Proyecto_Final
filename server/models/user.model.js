const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de tener una configuración de conexión a tu base de datos.

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre de usuario no puede estar vacío' },
      len: { args: [3, 50], msg: 'El nombre de usuario debe tener entre 3 y 50 caracteres' },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Debes proporcionar un email válido' },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [6, 100], msg: 'La contraseña debe tener al menos 6 caracteres' },
    },
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
}, {
  timestamps: true, // Crea automáticamente createdAt y updatedAt.
  tableName: 'users', // Nombre de la tabla en la base de datos.
});

module.exports = User;
