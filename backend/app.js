//------------------------- Creation de l'app------------------------- 

const express = require('express');
//const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const morgan = require('morgan');
const dotenv = require('dotenv').config({ encoding: "latin1" });
const stuffRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


//const path = require('path');
//const cors = require('cors');



mongoose.connect(process.env.MOONGOOSE_KEY,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json()); //intercerpte les requetes de type json et donne accès au corps de la req
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // tous le monde à acces à l'api
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // accès a certaines requetes
  next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});

module.exports = app;