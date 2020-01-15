'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const aluguerSchema = new Schema({
    dataCheckin : {
        type: Date,
        default: Date.now()
    }, 
    dataCheckout : {
        type: Date
    },
    codVeiculo: {
        type: String,
        required: 'código do veiculo'
    },
    username: {
        type: String,
        required: true
    },
    metodoAluguer: {
        type: [ {type: String,
                enum: ['minuto', 'hora', 'prePago1Hora', 'prePago2Horas', 'prePagoDia']
                }],
        default: ['hora']   
    },
    precoEstimado: {
        type: Number
    },
}  );
// --------------------------------------------------
// - definition of Schema Methods


// --------
// - getTimeElapsed(): Schema method to calculate the time elapsed in minutes between now (or checkout date) and the checkin date
aluguerSchema.methods.getTimeElapsed = function () {
    var diff = 0;
    //if (this.dataCheckout == null)
    {
        var now = new Date();
        var checkin = this.dataCheckin;
        console.log(now);
        console.log(checkin);
        diff = (now.getTime() - checkin.getTime());
        //cosole.log(diff);
    }
    /*else
    {
        diff = this.dataCheckout.getTime() - this.dataCheckin.getTime();
    }*/
    return Math.round(diff / 60000); 
}

// --------
// - calculoCustoAtual(): Schema method to calculate the actual cost of the rent
aluguerSchema.methods.calculoCustoAtual = function () {
    
    //constants declaration
    const activationFee = 0.50; // 1€
    const pricePerMin = 0.15; // 15 cents
    var result = 0;

    //check the payment method
    if (this.metodoAluguer == "hora")
    {       
        result = activationFee + this.getTimeElapsed() * pricePerMin;        
    }
    
    return result;
};  


// --------------------------------------------------
// - export the aluguer Schema 
module.exports = mongoose.model('AlugueresModel', aluguerSchema);