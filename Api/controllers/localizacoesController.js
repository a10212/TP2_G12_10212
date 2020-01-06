'use strict';
var mongoose = require('mongoose'),
    Localizacao = mongoose.model('LocalizacoesModel');

// GET localizacoes/
exports.lista_todas_localizacoes = function (req, res) {
    Localizacao.find()
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

// POST localizacoes/
exports.nova_localizacao = function (req, res) {
    var novo = new Localizacao(req.body);
    novo.save()
        .then ( result => 
            {res.status(201).jsonp(novo)})
        .catch(err => { res.status(201).jsonp({
            error: {message: err.message}
            })
        });    
};

// GET localizacoes/:long/:lat?raio=200
exports.pesquisar_localizacoes = function (req, res){
    let raio = 100; // valor por omissão
    if (req.query.raio){
        raio = req.query.raio
    }
    Localizacao.find( {local: {
                        $near:{
                            $geometry : {
                                type: "Point",
                                coordinates: [req.params.long, req.params.lat]
                            },
                            $maxDistance: raio
                        }
                    }
                }).exec()
                    .then(result => {
                        res.status(200).jsonp(result);
                    })
                  .catch(err => { res.status(500).jsonp({
                                    error: {message: err.message}
                                    })
                                }); 

};

// GET /:id_localizacao 
exports.localizacoes_por_id = function (req, res){   

    Localizacao.findById(req.params.id_localizacao, function (err, ev) {
        if (err)
            res.send(err);                 
                          
        res.status(200).json(ev);                      
    });

};

// GET /:codigo 
exports.localizacoes_por_codigo = function (req, res){   

    Localizacao.findById(req.params.id_localizacao, function (err, ev) {
        if (err)
            res.send(err);                 
                          
        res.status(200).json(ev);                      
    });

};


