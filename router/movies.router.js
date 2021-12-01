const express = require('express');
const router = express.Router();

const Movies = require('../models/Movies');

// get all movies.
router.get('/', (req, res, next) => {
    // obtengo a todas las movies
    Movies.find()
        .then((movies) => {
            return res.json(movies);
        })
        .catch((error) => {

            const errorOcurrido = new Error();
            return next(errorOcurrido);
        })
});

// get usuario by ID

router.get('/:id', (req, res, next) => {

    const id = req.params.id;
    // para buscar en base al id específico
    Movies.findById(id)
        .then(movie => res.json(movie))
        .catch(error => {
            console.error(`Error en get/${id}`, error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        });
});

// para buscar según un titulo, u otro parámetro get == get que devuelva un valor
router.get('/director/:director', (req, res, next) => {
    const directorSolicitado = req.params.director;
    return Movies.find({ director: directorSolicitado }) // meto título entre llaves y su valor en const porque le digo que me filtre el campo de un objeto mas su valor

    // quiero buscar a varios, por eso uso el find... 
    .then((movies) => {
            return res.json(movies);
        })
        .catch((error) => {
            console.error('Error en Get /director/${director}', error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })

});

// me faltaba que me agregue titulo de movie

router.get('/title/:title', (req, res, next) => {
    const titleSolicitado = req.params.title;
    return Movies.find({ title: titleSolicitado }) // meto título entre llaves y su valor en const porque le digo que me filtre el campo de un objeto mas su valor

    // quiero buscar a varios, por eso uso el find... 
    .then((movies) => {
            return res.json(movies);
        })
        .catch((error) => {
            console.error('Error en Get /title/${title}', error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })
});


// get de genre , es lo mismo de arriba 
router.get('/genre/:genre', (req, res, next) => {
    const genreSolicitado = req.params.genre;
    return Movies.find({ genre: genreSolicitado }) // meto título entre llaves y su valor en const porque le digo que me filtre el campo de un objeto mas su valor

    // quiero buscar a varios, por eso uso el find... 
    .then((movies) => {
            return res.json(movies);
        })
        .catch((error) => {
            console.error('Error en Get /genre/${genre}', error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })

});

// get de year, los mas nuevos que una fecha indicada  
router.get('/year/mayorque/:year', (req, res, next) => {
    const yearSolicitado = req.params.year;
    return Movies.find({ year: { $gt: yearSolicitado } })

    // quiero buscar a varios, por eso uso el find... 
    .then((movies) => {
            return res.json(movies);
        })
        .catch((error) => {
            console.error('Error en Get /year/${year}', error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })

});

//post para crear movie Y LEER 
router.post('/', (req, res, next) => {
    // creado en memoria
    const nuevaMovie = new Movies({
        title: req.body.nombre,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre,

    });
    // guardar en mongo
    nuevaMovie.save().then(() => {
        return res.status(201).json(nuevaMovie);
        //devolviendo error 
    }).catch((error) => {
        return next(error); //puedo no poner el return 
    });
});

//PUT DE USUARIO O EDITAR 

router.put('/:id', (req, res, next) => {

    const movieID = req.params.id;
    //creo nuevo documeto con modificación 
    const nuevaMovie = new Movies(req.body); // le paso el body entero (ésto es lo mismo que hice arriba, simplificando)
    //asign a éste nueva movie, el id de la movie modificada 
    nuevaMovie._id = movieID;
    Movies.findByIdAndUpdate(movieID, nuevaMovie, { new: true }) // con new true eso me ayuda que me muestre postman o url las modificaciones actualizads
        .then(movieActualizada => {
            res.status(200).json(movieActualizada);
        })
        .catch(error => {
            next(error);
        });

});

// ahora hacemos la d (delete) del crud

router.delete('/:id', (req, res, next) => {

    const movieID = req.params.id;
    Movies.findByIdAndDelete(movieID)
        .then(() => {
            return res.status(200).json(`Movie con id ${movieID} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});


module.exports = router;