'use strict';
const mongoose = require('mongoose');
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
// todos os utilizadores incritos na base de dados
exports.lista_todos_utilizadores = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId, utilizadorRole) => { 
        Utilizador.find({}, function (err, utilizador) {
            if (err)
                res.send(err);
            if (utilizadorRole != 'administrador')
                res.send({message: "User role does not allow this opperation."}).status(403);   
            else if (utilizador)                              
                res.json(utilizador)
             else {
                res.json();
                res.status(404);
            }  
            
            
        });
    });
};


// retorna um utilizador por Id
exports.obtem_um_utilizador = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId, utilizadorRole) => { 

            Utilizador.findById(req.params.id, function (err, utilizador) {
                if (err)
                    res.send(err);  
                if (utilizadorRole != 'administrador')
                    res.send({message: "User role does not allow this opperation."}).status(403);             
                if (utilizador)
                {                    
                    res.json(utilizador);
                } else {
                    res.json();
                    res.status(404);
                }                
            });
        }
    );

    
};


// altera o utilizador na base de dados
exports.alterar_um_utilizador = function (req, res) {
   
    getUtilizador(req, res, 
        (req, res, utilizadorId, utilizadorRole) => { 
        Utilizador.findOneAndUpdate({ _id: req.params.id },
            req.body, { new: true }, function (err, utilizador) {
                if (err)
                    res.send(err);
                if (utilizadorRole != 'administrador')
                    res.send({message: "User role does not allow this opperation."}).status(403);        
                if (utilizador){                    
                    res.json(utilizador).status(204);
                } else {
                    res.json();
                    res.status(404);
                }  
            });

    });

   
};

// aprova o registo do utilizador
exports.aprovar_registo = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId, utilizadorRole) => { 
            
        Utilizador.findOneAndUpdate({ _id: req.params.id },
            {estadoRegisto:"ativo"}, { new: true }, function (err, utilizador) {
                if (err)
                    res.send(err);
                if (utilizadorRole != 'administrador')
                    res.send({message: "User role does not allow this opperation."}).status(403);                
                   
                if (utilizador){   
                    utilizador.estadoRegisto = "ativo";                    
                    Utilizador.update({_id: req.params.id}, utilizador);          
                    res.json(utilizador);
                } else {
                    res.json();
                    res.status(404);
                }  
            });
    });
};

// elimina um utilizador da base de dados
exports.eliminar_um_utilizador = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId, utilizadorRole) => { 


            Utilizador.remove({
                _id: req.params.id
            }, function (err, utilizador) {
                if (err)
                    res.send(err);
                if (utilizadorRole == 'cliente')
                    res.send({message: "User role does not allow this opperation."}).status(403); 
                if (utilizador)                  
                    res.json({ message: 'utilizador eliminado' }).status(204);
                else {
                    res.json();
                    res.status(404);
                }  
                
            });

    });
};