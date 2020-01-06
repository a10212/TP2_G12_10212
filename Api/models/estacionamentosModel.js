'use strict';
var mongoose = require('mongoose');
var LocalizacaoSchema = require('./localizacoesModel').schema;
var Schema = mongoose.Schema;
var EstacionamentosSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'nome do parque']
    },
    capacidade: {
        type: Number,
    },
    localizacao: [LocalizacaoSchema]
});

module.exports = mongoose.model('Estacionamento', EstacionamentosSchema);