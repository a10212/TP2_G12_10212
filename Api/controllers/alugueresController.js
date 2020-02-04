'use strict';
var mongoose = require('mongoose'),
    Aluguer = mongoose.model('AlugueresModel');
    const Utilizador = mongoose.model('Utilizador');

    // função auxiliar para obter o _id do utilizador a partir do JWT enviado no pedido
const getUtilizador = (req, res, callback) => {
    if (req.payload && req.payload.username) { // validar que os dados do JWT estão no request
        Utilizador
            .findOne({ username: req.payload.username }) // procurar um utilizador pelo seu "username"
            .exec((err, utilizador) => {
                if (!utilizador) {
                    return res
                        .status(404)
                        .json({ "message": "Utilizador não encontrado!" });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                // executar o "callback", indicando qual é o utilizador
                callback(req, res, utilizador._id, utilizador.role); 
            });
    } else {
        return res
            .status(404)
            .json({ "message": "Utilizador não encontrado!"  });
    }
};


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
    novo.userId = req.body.userId;
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


// checkin de uma reserva
exports.checkin = function (req, res) {
   
    getUtilizador(req, res, 
        (req, res, utilizadorId, utilizadorRole) => { 
            var novo = new Aluguer();
            novo.userId = utilizadorId;
            novo.codVeiculo = req.body.codVeiculo;
            novo.metodoAluguer = req.body.metodoAluguer;
            novo.precoEstimado = 10;
        
            novo.save()
                .then ( result => 
                    {res.status(201).jsonp(novo)})
                .catch(err => { res.status(201).jsonp({
                    error: {message: err.message}
                    })
                });    

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

// GET /custoatual/:id/custoatual
exports.custoAtualAluguer = function (req, res){   

    Aluguer.findById(req.params.id, function (err, aluguer) {
        if (err)
            res.send(err);                 
            var result = "";
        try {
            var timeElapsed = aluguer.getTimeElapsed();
            var actualCost = aluguer.calculoCustoAtual();
            
            result = {"aluguerId": aluguer._id, "checkout": aluguer.checkout, "checkin": aluguer.checkin, "timeElapsed":timeElapsed, "metodoAluguer":aluguer.metodoAluguer, "custoAtualAluguer":actualCost};
 
        } catch (msg) {            
            res.status(401).json({"message": msg})
        }
        res.status(200).json(result);                      
    });

};

