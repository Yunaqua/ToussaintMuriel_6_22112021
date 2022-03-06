//------------------------- Creation de l'app------------------------- 
/*
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
//const helmet = require('helmet');

require('dotenv').config();

//const morgan = require('morgan');
//const dotenv = require('dotenv').config({ encoding: "latin1" });
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


//const cors = require('cors');
*/
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// import des routeurs
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

mongoose.connect(process.env.MOONGOOSE_KEY,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();
//app.use(cors());

app.use(express.json()); //intercerpte les requetes de type json et donne accès au corps de la req
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // tous le monde à acces à l'api
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // accès a certaines requetes
  next();
});


app.use('/images', express.static(path.join(__dirname, 'images'))); // dit à Express de gérer la ressource image de manière statique

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});

module.exports = app;