const express = require('express');
const Cinema = require('../models/Cinema')
const router = express.Router();

// get all cionemas

router.get('/', (req, res, next) => {

    Cinema.find().populate('movies') // hago ésto de populate(), para que me muestr ela info
        // completa cada vez que añada 1 movie existente a un cinema expecífico, 
        //le digo empleados ya que es lo que encuntra en url 
        .then((cinemas) => {
            return res.json(cinemas);
        }).catch((error) => {
            next(error);
        });
});
// get cinemas by id

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Cinema.findById(id)
        .then((cinemas) => {
            if (!cinemas) {
                const error = new Error(`Cinema ${id} no encontrado`);
                error.status = 404;
                return next(error);
            }
            return res.json(cinemas);

        }).catch((error) => {
            next(error);
        });
});

// post

router.post('/', (req, res, next) => {
    // creado en memoria
    const nuevoCinema = new Cinema({ // con ésto me ahorro ponerle todos los títulos como en movies req.body, pero lo haremos a al modo oldschool
        name: req.body.name,
        location: req.body.location,
        movies: req.body.movies || [], // caso especial para poder tener contenido del body o el array creado en modules 
    });
    // guardar en mongo
    nuevoCinema.save().then(() => {
        return res.status(201).json(nuevoCinema);
        //devolviendo error 
    }).catch((error) => {
        return next(error); //puedo no poner el return 
    });
});

// put para editar cinema

router.put('/id:', (req, res, next) => {

        const error = new Error('Método no implementado');
        error.status = 405;
        next(error);
    })
    // put para añadir movie a cinema

router.put('/:id/movies', (req, res, next) => {

    const cinemaId = req.params.id;
    const movieId = req.body.moviesAAnadir; // así me da en el array solo el id... y quiero es el nombre = title de la movie (mira en get de find que ahóie stá modificado con populación )

    Cinema.findByIdAndUpdate(
            cinemaId, { $push: { movies: movieId } }, { new: true }
        ) // para que me actualice el cinema con la nueva movie, y me muestre el nuervo y no el viejo
        .then(cinemaActualizado => {
            res.status(200).json(cinemaActualizado)
        })
        .catch(error => {
            next(error);
        });

});
// delete

router.delete('/:id', (req, res, next) => {

    const cinemaId = req.params.id;
    Cinema.findByIdAndDelete(cinemaId)
        .then(() => {
            return res.status(200).json(`Cinema con id ${cinemaId} se ha eliminado`);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;