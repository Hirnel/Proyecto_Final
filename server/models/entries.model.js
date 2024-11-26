// http://localhost:3000/api/entries

const { Pool } = require('pg');
const queries = require('../queries/entries.queries') // Queries SQL

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432', //por defecto 5432
    database: 'postgres',
    password: '123456'
  });

  // GET
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByEmail, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// CREATE
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createEntry,[title, content, email, category])
        result = data.rowCount //cuenta las filas creadas (expected: 1)
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


//UPDATE
const updateEntry = async (updatedEntry, originalTitle) => {
    const { title, content, category } = updatedEntry; //son los campos que podremos actualizar desde postman
    let client, result;
    try {                                                              //parametros para la query SQL 
        client = await pool.connect();                              //$1       $2       $3       $4
        const data = await client.query(queries.updateEntryByTitle, [title, content, category, originalTitle]);
        result = data.rowCount; // Devuelve la fila actualizada
    } catch (err) {
        console.log('Error updating entry:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};



const deleteEntry = async (entryToDelete) => {
    const title = entryToDelete;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteEntryByTitle, [title]);
        result = data.rowCount
        
    } catch (err) {
        console.log('Error deleting entry:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};


//exportamos las interacciones del 
const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    deleteEntry,
    updateEntry
}

module.exports = entries;

// let updatedEntry = { 
//     "title": "Noticia: SOL59 en Madrid",
//     "content": "Contenido noticia 1",
//     "category": "Hola",
//     "originalTitle": "Noticia: SOL58 en Madrid"

// }

// updateEntry(updatedEntry,updatedEntry.originalTitle)
//     .then(data => console.log(data))
//   deleteEntry("ejemplo3")
//     .then(data=>console.log(data)) 