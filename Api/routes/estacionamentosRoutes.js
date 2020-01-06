'use strict';
module.exports = function (auth, app) {
    var estCtrl =
        require('../controllers/estacionamentosController');

    // rotas definidas para a API Restful estacionamentos    

    // -- rota  /estacionamentos    métodos: GET, PUT
    app.route('/estacionamentos') 
        .get(auth, estCtrl.lista_todos_estacionamentos);
           
     // -- rota  /pesquisar_estacionamentos    métodos: GET
     //app.route('/pesquisar_estacionamentos/:long/:lat')
     //.get(auth, estCtrl.pesquisar_estacionamentos);

    // -- rota  /estacionamento/:id    métodos: GET, PUT, DELETE
    app.route('/estacionamentos/:id')
        .get(auth, estCtrl.obtem_um_estacionamento)
        .put(auth, estCtrl.alterar_um_estacionamento)
        .delete(auth, estCtrl.eliminar_um_estacionamento);
};