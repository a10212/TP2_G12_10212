'use strict';
module.exports = function (auth, app) {
    var userCtrl =
        require('../controllers/utilizadoresController');

    // rotas definidas para a API Restful utilizadores    

    // -- rota  /utilizadores    métodos: GET, PUT
    app.route('/utilizadores') 
        .get(auth, userCtrl.lista_todos_utilizadores);
        
    // -- rota  /aprovaregisto    métodos: GET
    app.route('/aprovaregisto/:id') 
        .get(auth, userCtrl.aprovar_registo);

    // -- rota  /utilizadores/:id    métodos: GET, PUT
    app.route('/utilizadores/:id')
        .get(auth, userCtrl.obtem_um_utilizador)
        .put(auth, userCtrl.alterar_um_utilizador)
        .delete(auth, userCtrl.eliminar_um_utilizador);
};