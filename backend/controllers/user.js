const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

/*
exports.signup = (req, res, next) => {

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

};// signup */

exports.signup = (req, res, next) => {
    console.log(req);
    bcrypt.hash(req.body.password,10)
    .then( hash => { 
        const user = new User({
            email:req.body.email,
            password:hash
        });
        user.save()
        .then( () => res.status(201).json({message :" utilisateur crée"}))
        .catch( error => res.status(400).json({ error}))
    })
    .catch( error => res.status(500).json({ error}))

}//signup

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé!' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect!' });
                    }
                    res.status(200).json({
                        userId: user._id,
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
                