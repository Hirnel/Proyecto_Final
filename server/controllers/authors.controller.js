const author = require('../models/authors.model'); // Importar el modelo de la BBDD

//getEntries
// if(hay email)
//     busca por mail
// else
//     busca todo


// GET http://localhost:3000/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getAuthors = async (req, res) => {
    let authors;
    authors = await author.getAllAuthors();
    
    res.status(200).json(authors); // 
}
const getAuthorByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const authorData = await author.getAuthorByEmail(email);
        if (authorData) {
            res.status(200).json(authorData);
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener autor por email:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



// // Crear entry por email
// const createEntry = async (req, res) => {
//     const newEntry = req.body; // {title,content,email,category}
//     const response = await entry.createEntry(newEntry);
//     res.status(201).json({
//         "items_created": response,
//         data: newEntry
//     });
// }

// const updateEntry = async (req, res) => {
//     const updatedEntry = req.body; // {title, content, category}
//     const originalTitle = req.body.originalTitle; // Título original a buscar
//     try {
//         const response = await entry.updateEntry(updatedEntry, originalTitle);
//         if (response) {
//             res.status(200).json({
//                 message: 'Actualizado correctamente',
//                 data: response
//             });
//         } else {
//             res.status(404).json({ error: 'Entry no encontrada' });
//         }
//     } catch (error) {
//         console.error('Error updating entry:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// const deleteEntry = async (req, res) => {
//     const entryToDelete = req.body.title; // {title} le pasaremos el title por el body del postman
//     try {
//         const response = await entry.deleteEntry(entryToDelete);
//         if (response) {
//             res.status(200).json({
//                 message: `Se ha borrado la entry: ${entryToDelete}`,
//                 data: response
//             });
//         } else {
//             res.status(404).json({ error: 'Entry con ese título no encontrada' });
//         }
//     } catch (error) {
//         console.error('Error deleting entry:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }


module.exports = {
    getAuthors,
    getAuthorByEmail

}