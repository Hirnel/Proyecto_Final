const pool = require('../config/db_pgSQL'); // Configuración de la conexión a la base de datos
const queries = require('../utils/queries.js'); // Archivo que contiene las consultas SQL
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Conectar a la base de datos
        const data = await client.query(queries.getAllUsers);
        result = data.rows; // Obtener todas las filas
    } catch (err) {
        console.error('Error obteniendo usuarios:', err);
        throw err;
    } finally {
        client.release(); // Liberar el cliente
    }
    return result;
};

// Obtener un usuario por su email
const getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getUserByEmail, [email]);
        result = data.rows[0]; // Obtener el primer resultado
    } catch (err) {
        console.error('Error obteniendo usuario por email:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// Crear un nuevo usuario
const createUser = async (user) => {
    const { username, email, password, img } = user;
    let client, result;

    // Generar un nombre de usuario por defecto si no se proporciona
    const finalUsername = username || email.split('@')[0];
    try {
        client = await pool.connect();
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        const data = await client.query(queries.createUser, [finalUsername, email, hashedPassword, img]);
        result = data.rowCount; // Número de filas afectadas
    } catch (err) {
        console.error('Error creando usuario:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// Actualizar un usuario por email
const updateUserByEmail = async (updatedUser, currentEmail) => {
    const { username, email, password, img } = updatedUser;
    let client, result;
    try {
        client = await pool.connect();
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        const data = await client.query(queries.updateUserByEmail, [username, email, hashedPassword, img, currentEmail]);
        result = data.rowCount; // Número de filas afectadas
    } catch (err) {
        console.error('Error actualizando usuario:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// Eliminar un usuario por email
const deleteUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUserByEmail, [email]);
        result = data.rowCount; // Número de filas eliminadas
    } catch (err) {
        console.error('Error eliminando usuario:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// Exportar todas las funciones como un objeto
const Users = {
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUserByEmail,
    deleteUserByEmail,
};

module.exports = Users;
