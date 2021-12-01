// se ejecuta siempre una vez, la primera 

// llamo mongoose
const mongoose = require('mongoose');
// llamo el archivo y requiero de los modulos patrón 
const Movies = require('../models/Movies');
//llamo base de datos en carpeta db 
const dbConnection = require('../db/data-base');

const movies = [{
        title: 'The Matrix',
        director: 'Hermanas Wachowski',
        year: 1999,
        genre: 'Acción',
    },
    {
        title: 'The Matrix Reloaded',
        director: 'Hermanas Wachowski',
        year: 2003,
        genre: 'Acción',
    },
    {
        title: 'Buscando a Nemo',
        director: 'Andrew Stanton',
        year: 2003,
        genre: 'Animación',
    },
    {
        title: 'Buscando a Dory',
        director: 'Andrew Stanton',
        year: 2016,
        genre: 'Animación',
    },
    {
        title: 'Interestelar',
        director: 'Christopher Nolan',
        year: 2014,
        genre: 'Ciencia ficción',
    },
    {
        title: '50 primeras citas',
        director: 'Peter Segal',
        year: 2004,
        genre: 'Comedia romántica',
    },
];

const moviesDocuments = movies.map(movie => new Movies(movie));

//conectar a mongodb
//creo dinámica, que se ejecuta 1 sóla vez
dbConnection
// 1. Eliminar el contenido de esta colección en Mongo
    .then(async() => {
        const allMovies = await Movies.find();
        if (allMovies.length > 0) {
            await Movies.collection.drop();
        }
    })
    .catch((error) => console.error('Error eliminando colección Movies:', error))
    // 2. Añadir los usuarios de la semilla a la colección
    .then(async() => {
        await Movies.insertMany(moviesDocuments)
    })

// como puede generar errores, los buscamos capturar 
.catch((error) => console.error('Error al insertar Movies:', error))
    // 3. Desconectarnos
    .finally(() => mongoose.disconnect());