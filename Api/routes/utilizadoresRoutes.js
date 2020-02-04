'use strict';
module.exports = function (auth, app) {
    var userCtrl =
        require('../controllers/utilizadoresController');

    // rotas definidas para a API Restful utilizadores    

    // -- rota  /utilizadores    métodos: GET
    app.route('/utilizadores') 
        .get(auth, userCtrl.lista_todos_utilizadores);      
  

    // -- rota  /utilizadores/:id    métodos: GET, PUT, DELETE
    app.route('/utilizadores/:id')
        .get(auth, userCtrl.obtem_um_utilizador)
        .put(auth, userCtrl.alterar_um_utilizador)
        .delete(auth, userCtrl.eliminar_um_utilizador);

    // -- rota  /utilizadores/:id/aprovaregisto    métodos: GET
    app.route('/utilizadores/:id/aprovaregisto') 
        .get(auth, userCtrl.aprovar_registo);
};