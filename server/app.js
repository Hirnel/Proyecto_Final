const express = require('express')
const app = express() //inicializar el servidor 
const port = 3000 //puerto para usar por el servidor
//const productsRoutes = require("./routes/products.routes")

app.use(express.json());


const entriesRoutes = require("./routes/entries.routes");
app.use('/api/entries', entriesRoutes);

const authorsRoutes = require("./routes/authors.routes")

app.get('/', (req, res) => {
    res.send('Aqui lloramos')
})


app.use("*", (req, res) => {
    res.status(404).send("Ruta no encontrada");
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

/*
SELECT * FROM entries;

ALTER TABLE entries
ADD CONSTRAINT unique_title UNIQUE (title);




SELECT e.title, e.content, e.date, e.category, a.name, a.surname, a.image
FROM entries AS e
INNER JOIN authors AS a
ON e.id_author = a.id_author;






































*/