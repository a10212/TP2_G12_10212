const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Utilizador = mongoose.model('Utilizador');

passport.use(new LocalStrategy( 
    { usernameField: 'username'  },
    
    (username, password, done) => {
        Utilizador.findOne({ username: username }, (err, user) => { 
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'username incorreto.' }); 
            }
            if (user.estadoRegisto == "ativo")
            {
                if (!user.validarPassword(password)) {
                    return done(null, false, { message: 'Palavra chave incorreta!'}); 
               }
            }
            else{
                return done(null, false, { message: 'Não é possivel autenticar. Estado de registo do utilizador: ' + user.estadoRegisto}); 
            }
            
            return done(null, user); 
          });
    }
  ));


  