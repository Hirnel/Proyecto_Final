const { Pool } = require('pg');
const queries = require('../queries/authors.queries') // Queries SQL

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432', //por defecto 5432
    database: 'Proyecto_Final',
    password: '123456'
  });



// GET
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//GET AUTHOR BY EMAIL
const getAuthorByEmail = async (email) => {
        let client, result;
        try {
            client = await pool.connect(); // Espera a abrir conexion
            const data = await client.query(queries.getAuthorByEmail, [email])
            result = data.rowCount;
            
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            client.release();
        }
        return result
    }

// // CREATE
// const createEntry = async (entry) => {
//     const { title, content, email, category } = entry;
//     let client, result;
//     try {
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(queries.createEntry,[title, content, email, category])
//         result = data.rowCount
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result
// }

// // DELETE
// //UPDATE
// const updateEntry = async (updatedEntry, originalTitle) => {
//     const { title, content, category } = updatedEntry;
//     let client, result;
//     try {
//         client = await pool.connect();
//         const data = await client.query(queries.updateEntryByTitle, [title, content, category, originalTitle]);
//         result = data.rows[0]; // Devuelve la fila actualizada
//     } catch (err) {
//         console.log('Error updating entry:', err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result;
// };

// const deleteEntry = async (entryToDelete) => {
//     const title = entryToDelete;
//     let client, result;
//     try {
//         client = await pool.connect();
//         const data = await client.query(queries.deleteEntryByTitle, [title]);
//         result = data.rowCount
        
//     } catch (err) {
//         console.log('Error deleting entry:', err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result;
// };



const authors = {
    
    getAllAuthors,
    getAuthorByEmail
    
}

module.exports = authors;