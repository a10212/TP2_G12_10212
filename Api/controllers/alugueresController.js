'use strict';
var mongoose = require('mongoose'),
    Aluguer = mongoose.model('AlugueresModel');

// GET alugueres/
exports.lista_todos_alugueres = function (req, res) {
    Aluguer.find()
        .exec()
        .then(result => {
            res.status(200).jsonp(result);
        })
        .catch(err => {
            res.status(500).jsonp({
            error: {message: err.message}
        })
    });
};

// POST checkin/
exports.checkin = function (req, res) {
    var novo = new Aluguer();
    novo.username = req.body.username;
    novo.codVeiculo = req.body.codVeiculo;
    novo.precoEstimado = 10;

    novo.save()
        .then ( result => 
            {res.status(201).jsonp(novo)})
        .catch(err => { res.status(201).jsonp({
            error: {message: err.message}
            })
        });    
};


// GET checkout/
exports.checkout = function (req, res) {
    //TODO: Implement
};

// GET aluguer_por_id/:id 
exports.aluguer_por_id = function (req, res){   

    Aluguer.findById(req.params.id, function (err, ev) {
        if (err)
            res.send(err);                 
                          
        res.status(200).json(ev);                      
    });

};

// GET /custoatual/:id_aluguer
exports.custoAtualAluguer = function (req, res){   

    Aluguer.findById(req.params.id_aluguer, function (err, aluguer) {
        if (err)
            res.send(err);                 
            var result = "";
        try {
            var timeElapsed = aluguer.getTimeElapsed();
            var actualCost = aluguer.calculoCustoAtual();
            
            result = {"aluguerId": aluguer._id, "checkin": aluguer.checkin, "timeElapsed":timeElapsed, "metodoAluguer":aluguer.metodoAluguer, "custoAtualAluguer":actualCost};
 
        } catch (msg) {            
            res.status(401).json({"message": msg})
        }
        res.status(200).json(result);                      
    });

};

