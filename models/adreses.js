const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const adresSchema = new Schema({
    adress: {
        type: String,
        required: true
    },
});
const Adreses=mongoose.model('Adreses', adresSchema,"adreses");
module.exports =Adreses
