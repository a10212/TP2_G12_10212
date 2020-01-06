'use strict';
var mongoose = require('mongoose');
var LocalizacaoSchema = require('./localizacoesModel').schema;
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
    },
    zona: {
        type: String,
    },
    coordenadas: {
        type: {type: String},
        coordinates: [Number]        
    },
    raio: {
        type:Number,
    },
});

module.exports = mongoose.model('Localizacao', LocalizacaoSchema);