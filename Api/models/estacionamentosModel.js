'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EstacionamentosSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'nome do parque']
    },
    capacidade: {
        type: Number,
        required: [true, "capacidade do parque"]
    },
    cod_localizacao: {
        type: Number, //[LocalizacaoSchema],
        required: [true, "código da localização do parque"]
    },
   
});

module.exports = mongoose.model('Estacionamento', EstacionamentosSchema);