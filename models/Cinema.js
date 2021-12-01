// obtengo y requiero mongoose
const mongoose = require('mongoose');

// hago squema 
const Schema = mongoose.Schema;

const cinemaSchema = new Schema({

    name: { type: String, required: true }, //required: true
    location: { type: String, required: true },
    //hacemos relación entre los dos modelos, ya que necesito importar las movies a los cines 
    // creamos array con enlace entre 2 conexiones 
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movies' }],
}, {
    //fechas de modificación y creación 
    timestamps: true
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;