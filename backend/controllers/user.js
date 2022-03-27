const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//require('dotenv').config({ path: './.env' });
const reMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const str = 'yyooo@live.te';
const regex = new RegExp(reMail);
//console.log(regex.test(str));

  exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
          if((regex.test(req.body.email)) == true){
            const user = new User({
              email: req.body.email,
              password: hash
            });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
          }else{
            console.log("Ce n'est pas un email");
          }
          
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {

  User.findOne({ email: req.body.email }) //vu que l'email est unique
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) //comparaison du mot de passe
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,//id de l'utilisateur dans la base
            token: jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};