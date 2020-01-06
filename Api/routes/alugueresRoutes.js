'use strict';
module.exports = function (auth, app) {
    var aluguer =
        require('../controllers/alugueresController');
   

    // rotas definidas para a API Restful 

    // -- rota  /alugueres    métodos: GET
    app.route('/alugueres')
        .get(aluguer.lista_todos_alugueres)    
    
    // checkin /checkin    métodos: POST
    app.route('/checkin')       
        .post(aluguer.checkin);

     // checkin /checkout    métodos: POST
     app.route('/checkout/:id')       
     .get(aluguer.checkout);

    // -- rota /alugueres/:id
    app.route('/alugueres/:id')
        .get(aluguer.aluguer_por_id);
   

};