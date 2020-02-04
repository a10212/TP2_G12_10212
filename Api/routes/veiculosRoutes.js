'use strict';
module.exports = function (auth, app) {
    var veiculo =
        require('../controllers/veiculosController');
   

    // rotas definidas para a API Restful 

    // -- rota  /veiculos    métodos: GET, POST
    app.route('/veiculos')
        .get(veiculo.lista_todos_veiculos)
        .post(veiculo.novo_veiculo);

    app.route('/veiculos/:lat/:long')
        .get(veiculo.pesquisar_veiculos);

    app.route('/veiculos/:id_veiculo')
        .get(veiculo.pesquisar_por_id);

   
};