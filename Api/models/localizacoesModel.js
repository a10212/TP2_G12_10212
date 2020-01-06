'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LocalizacaoSchema = new Schema({
    codigo: {
        type:Number,
        required: [true, 'código da localização'],
    },
    cidade: {
        type: String,
        required: [true, 'cidade']
    },
    rua: {
        type: String,
        required: [true, 'rua']
    },
    zona: {
        type: String,
    },
    coordenadas: {
        type: {type: String},
        coordinates: [Number]
        //required: [true, 'coordenadas GPS da localização do parque']       
    },    
});

module.exports = mongoose.model('LocalizacoesModel', LocalizacaoSchema);