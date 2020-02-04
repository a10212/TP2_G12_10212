'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VeiculosSchema = new Schema({
    designacao: {
        type: String,
        required: [true, 'designação do veiculo']
    },
    codigo: {
        type: String
    },
    SOCBateria: {
        type: Number
    },         
    localizacao: {
        type: {type: String},
        coordinates: [Number]        
    }
});
VeiculosSchema.index({"localizacao": "2dsphere"});
module.exports = mongoose.model('VeiculosModel', VeiculosSchema);