// con ésto ya conecto la carpeta db al mongodb (solo lo requiero, por eso aún no le hago variable, ya que no exportará anda aún)
require('./db/data-base');

// defino const express y la requiero, que me la llame
const express = require('express');
const moviesRouter = require('./router/movies.router');
const server = express();
//defino el puerto
const PORT = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// comienzo a crear enrutado
server.use('/movies', moviesRouter); // le digo al servidor que use la contsante que requiere el archivo que he creado

// cualuqier ruta, que me de el error
server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada'); //(control de errores)
    error.status = 404; // (control de errores)
    next(error); //(control de errores)
});
//middleware para llevar el caso de arriba (control de errores)
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Ha ocurrido un error en el servidor');
})


//arranco el servidor
server.listen(PORT, () => {
    console.log(`Sevidor arrancado en el puerto ${PORT}`);
})