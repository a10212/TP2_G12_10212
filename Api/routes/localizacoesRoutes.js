'use strict';
module.exports = function (auth, app) {
    var localizacao =
        require('../controllers/localizacoesController');
   

    // rotas definidas para a API Restful 

    // -- rota  /localizacoes    métodos: GET, POST
    app.route('/localizacoes')
        .get(localizacao.lista_todas_localizacoes)
        .post(localizacao.nova_localizacao);

    app.route('/localizacoes/:long/:lat')
        .get(localizacao.pesquisar_localizacoes);

    app.route('/:id_localizacao')
        .get(localizacao.localizacoes_por_id);

    app.route('/:codigo')
       .get(localizacao.localizacoes_por_codigo);

};