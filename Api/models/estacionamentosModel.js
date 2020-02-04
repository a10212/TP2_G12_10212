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
    localizacao: {
        type: {type: String},
        coordinates: [Number]        
    }
   
});
EstacionamentosSchema.index({"localizacao": "2dsphere"});
module.exports = mongoose.model('Estacionamento', EstacionamentosSchema);