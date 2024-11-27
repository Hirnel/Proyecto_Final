const express = require('express')
const app = express() //inicializar el servidor 
const port = 3000 //puerto para usar por el servidor
const sequelize = require('./config/database');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const authorsRoutes = require("./routes/authors.routes")

//const productsRoutes = require("./routes/products.routes")

app.use(express.json());


const entriesRoutes = require("./routes/entries.routes");
app.use('/api/entries', entriesRoutes);

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

































*/