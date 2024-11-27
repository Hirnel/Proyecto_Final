
const entry = require('../models/entries.model'); // Importar el modelo de la BBDD

// GET http://localhost:3000/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getEntries = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email); //en el controlador invocamos a las queries
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}


// Crear entry por email
const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
        "items_created": response,
        data: newEntry
    });
}

const updateEntry = async (req, res) => {
    const updatedEntry = req.body; // {title, content, category, originalTitle} //el body del objeto json que pasaremos por Postman
    const originalTitle = req.body.originalTitle; // Título original a actualizar, ejemplo como el de clase
    try {
        const response = await entry.updateEntry(updatedEntry, originalTitle);
        if (response) {
            res.status(200).json({
                message: 'Actualizado correctamente',
                data: response
            });
        } else {
            res.status(404).json({ error: 'Entry no encontrada' });
        }
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteEntry = async (req, res) => {
    const entryToDelete = req.body.title; // {title: "titulo"} le pasaremos el title por el body del postman. delete es como una peticion post
    try {
        const response = await entry.deleteEntry(entryToDelete);
        if (response) {
            res.status(200).json({
                message: `Se ha borrado la entry: ${entryToDelete}`,
                data: response
            });
        } else {
            res.status(404).json({ error: 'Entry con ese título no encontrada' });
        }
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//exportamos las funciones o métodos del controller
module.exports = {
    getEntries,
    createEntry,
    deleteEntry,
    updateEntry
}