const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Importa el modelo definido arriba.

const secretKey = process.env.JWT_SECRET || 'yourSecretKey'; // Configura tu clave secreta en el archivo .env

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Obtener información del usuario
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Supone que usas un middleware para autenticar y obtener `req.user`.
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }, // Excluir la contraseña.
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Actualizar información del usuario
exports.updateUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const userId = req.user.id;

    const updatedUser = await User.update(
      { username, email },
      { where: { id: userId }, returning: true }
    );

    if (!updatedUser[1][0]) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado', user: updatedUser[1][0] });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const deleted = await User.destroy({ where: { id: userId } });

    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
