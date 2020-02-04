'use strict';
var mongoose = require('mongoose'),
    Veiculo = mongoose.model('VeiculosModel');

exports.lista_todos_veiculos = function (req, res) {
    Veiculo.find()
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

exports.novo_veiculo = function (req, res) {
    var novo = new Veiculo(req.body);
    novo.save()
        .then ( result => 
            {res.status(201).jsonp(novo)})
        .catch(err => { res.status(201).jsonp({
            error: {message: err.message}
            })
        });    
};

// GET veiculos/:lat/:long?raio=200
exports.pesquisar_veiculos = function (req, res){
    let raio = 100; // valor por omissão
    if (req.query.raio){
        raio = req.query.raio
    }
    Veiculo.find( {localizacao: {
                        $near:{
                            $geometry : {
                                type: "Point",
                                coordinates: [req.params.lat, req.params.long]
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

// GET /:id_veiculo 
exports.pesquisar_por_id = function (req, res){   

    Veiculo.findById(req.params.id_veiculo, function (err, ev) {
        if (err)
            res.send(err);                 
                          
        res.status(200).json(ev);                      
    });

};


