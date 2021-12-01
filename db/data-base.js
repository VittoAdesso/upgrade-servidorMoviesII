const mongoose = require('mongoose');

// mongodb://localhost:27017/ por defecto siempre ésa ruta 
// nombre de la base de datos :servidor-moviesI
const DB_URL = "mongodb://localhost:27017/servidor-moviesI";

// VITTORIO, PARA EJECUTAR MONGODB COMPASS, DEBES ABRIR PRIMERO EL ARCHIVO MONGOD Y LUEGO EL COMPASS CONECTARLO CON mongodb://localhost:27017/
// SINO, OLVÍDATE... 

// así se coloca... plantilla para conectar contra mongoDB 
const dbConnection = mongoose.connect(DB_URL, {
    useNewUrlParser: true, // para conectar contra mongo , nos da todas acciones necesarias
    useUnifiedTopology: true, // distribuida la base de datos, siempre TRUE 
});

module.exports = dbConnection;