'use strict';
const mongoose = require('mongoose');
const Estacionamento = mongoose.model('Estacionamento');
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


// ------------------------------------
// todos os estacionamentos gravados na base de dados
exports.lista_todos_estacionamentos = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId, utilizadorRole) => { 
        Estacionamento.find({}, function (err, estacionamento) {
            if (err)
                res.send(err);            
            else if (estacionamento)                              
                res.json(estacionamento)
             else {
                res.json();
                res.status(404);
            }  
            
            
        });
    });
};


// retorna um parque de estacionamento por Id
exports.obtem_um_estacionamento = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId, utilizadorRole) => { 

            Estacionamento.findById(req.params.id, function (err, estacionamento) {
                if (err)
                    res.send(err);                              
                if (estacionamento)
                {                    
                    res.json(estacionamento);
                } else {
                    res.json();
                    res.status(404);
                }                
            });
        }
    );

    
};


// altera o parque de estacionamento na base de dados
exports.alterar_um_estacionamento = function (req, res) {
   
    getUtilizador(req, res, 
        (req, res, utilizadorId, utilizadorRole) => { 
            Estacionamento.findOneAndUpdate({ _id: req.params.id },
            req.body, { new: true }, function (err, estacionamento) {
                if (err)
                    res.send(err);
                if (utilizadorRole == 'cliente')
                    res.send({message: "User role does not allow this opperation."}).status(403);      
                if (estacionamento){                    
                    res.json(estacionamento);
                } else {
                    res.json();
                    res.status(404);
                }  
            });

    });

   
};



// elimina um parque de estacionamenbto da base de dados
exports.eliminar_um_estacionamento = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId) => { 


            Estacionamento.remove({
                _id: req.params.id
            }, function (err, estacionamento) {
                if (err)
                    res.send(err);

                if (utilizadorRole == 'cliente')
                    res.send({message: "User role does not allow this opperation."}).status(403); 
                if (estacionamento)                  
                    res.json({ message: 'parque de estacionamento eliminado' });
                else {
                    res.json();
                    res.status(404);
                }  
                
            });

    });
};