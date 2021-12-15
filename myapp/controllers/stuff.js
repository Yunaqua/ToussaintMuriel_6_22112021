const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getAllUser('/all-user', (req, res, next) => {
    User.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
    next();
});


exports.signup = () => {

    // Email
    User.findOne({
        email: req.body.email               //verifie que si le mail est present dans la bdb
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        } else {                        //l'email n'existe pas

            bcrypt.hash(req.body.password, 10)      //crypte le motdepasse
                .then(hash => {
                    const user = new User({         //creation de l'utilisateur
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        }//fin else

        next();
    });

};// signup

exports.login = (req, res, next) => {

};