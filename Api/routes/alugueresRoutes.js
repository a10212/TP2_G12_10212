'use strict';
module.exports = function (auth, app) {
    var aluguer =
        require('../controllers/alugueresController');
   

    // rotas definidas para a API Restful 

    // -- rota  /reservas    métodos: GET, POST
    app.route('/reservas')
        .get(aluguer.lista_todos_alugueres)    
        .post(auth, aluguer.checkin);

    // -- rota /alugueres/:id
    app.route('/reservas/:id')
    .get(aluguer.aluguer_por_id);

    // /checkout    métodos: POST
    app.route('/reservas/:id/checkout')       
        .get(aluguer.checkout);  
        
    // -- rota /custoatual/:id/custoatual
    app.route('/reservas/:id/custoatual')
        .get(aluguer.custoAtualAluguer);
   

};