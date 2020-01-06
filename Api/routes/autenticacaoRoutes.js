'use strict';
module.exports = function (app) {
    var authCtrl =
        require('../controllers/autenticacaoController');

    // rotas definidas para a API Restful autenticacao
    
    // -- rota  /registar  métodos: GET
    app.route('/registar')
        .post(authCtrl.registar_utilizador);

    // -- rota  /login    métodos: POST  params: :username :password
    app.route('/login') // autenticar
        .post(authCtrl.autenticar_credencias);    
        
        
  
};