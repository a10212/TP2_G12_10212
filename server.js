const express = require('express'),
aplicacao = express(),
porta = process.env.PORT || 5000,
bodyParser = require('body-parser');

let BD =  require('./api/config/configBDMongo');

let VeiculoModel =  require('./api/models/VeiculosModel');
let UtilizadorModel =  require('./api/models/UtilizadoresModel');
let EstacionamentoModel =  require('./api/models/EstacionamentosModel');
//let LocalizacoesModel =  require('./api/models/LocalizacoesModel');

const passport = require('passport'); 
require('./api/config/configPassport');

aplicacao.use(bodyParser.urlencoded({ extended:true }));
aplicacao.use(bodyParser.json());

aplicacao.use(passport.initialize());


const jwt = require('express-jwt'); 
const autenticacao = jwt({
      secret: 'esteEoSegredo',
      userProperty: 'payload'
      });

// error handlers
//    Catch unauthorised errors
aplicacao.use((err, req, res, next) => {
      if (err.name === 'UnauthorizedError') { 
      res
       .status(401) 
       .json({"message" : err.name + ": " + err.message});
      }
      });

aplicacao.use('/', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
      res.header('Access-Control-Allow-Headers', 
                 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      next();
      });

// importar rotas
var routesVeiculos =  require('./api/routes/veiculosRoutes'); 
var routesAut =   require('./api/routes/autenticacaoRoutes'); 
var routesUsers =   require('./api/routes/utilizadoresRoutes'); 
//var routesLocalizacoes =   require('./api/routes/localizacoesRoutes'); 
var routesEstacionamentos =   require('./api/routes/estacionamentosRoutes'); 
// registar as rotas
routesAut(aplicacao);
routesUsers(autenticacao, aplicacao);
routesVeiculos(autenticacao, aplicacao);
//routesLocalizacoes(autenticacao, aplicacao);
routesEstacionamentos(autenticacao, aplicacao);

aplicacao.listen(porta);

console.log('TP2 RESTful API a executar em:' + porta);
