//------------------------- Creation de l'app------------------------- 

const express = require('express');
const helmet = require('helmet');
const moongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv').config({ encoding: "latin1" });
const User = require('./models/user');

moongoose.connect(process.env.MOONGOOSE_KEY,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>
        console.log("connexion a mongodb reussi")
    ).catch(() =>
        console.log("connexion a mongodb échoué")
    );

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(express.json());

// listen for requests
app.listen(3000);

// mongoose & mongo tests
app.get('/add-user', (req, res) => {
    const user = new User({
        email: 'testuser2',
        password: 'newmot2path'
    })

    user.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});


checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
// Email
User.findOne({
    email: req.body.email
}).exec((err, user) => {
    if (err) {
        res.status(500).send({ message: err });
        return;
    }

    if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
    }

    next();
});

};



app.get('/auth/login', (req, res) => {
    delete req.body._id;
    const user = new User({
        ...req.body
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});


app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    res.sendFile('./views/index.html', { root: __dirname });
});
/*
app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  res.sendFile('./views/about.html', { root: __dirname });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
}); */

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});


module.exports = app;

/* moongoose.connect( process.env.MOONGOOSE_KEY,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => 
        console.log("connexion a mongodb reussi")
     ).catch(() => 
        console.log("connexion a mongodùb échoué")
     );*/