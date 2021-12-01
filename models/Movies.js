const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moviesSchema = new Schema({

    title: { type: String }, //required: true
    director: { type: String },
    year: { type: Number },
    genre: { type: String },

}, {
    //fechas de modificación y creación 
    timestamps: true
});

const Movies = mongoose.model('Movies', moviesSchema);

module.exports = Movies;