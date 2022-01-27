//------------------------- Creation de l'app------------------------- 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
//const helmet = require('helmet');


//const morgan = require('morgan');
const dotenv = require('dotenv').config({ encoding: "latin1" });
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


//const cors = require('cors');



mongoose.connect(process.env.MOONGOOSE_KEY,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();
const cors = require("cors");

app.use(express.json()); //intercerpte les requetes de type json et donne accès au corps de la req
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // tous le monde à acces à l'api
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // accès a certaines requetes
  next();
});

/*app.use('/api/sauces', (req, res, next) => {
  const sauce = [
    {
      userId: "61ed8819235775be6e997648",
      name: "Sauce fajitas douce",
      manufacturer: "Old el paso",
      description: "d",
      mainPepper: "Poivron",
      imageUrl: "https://media.houra.fr/ART-IMG-XL/53/05/8410076470553-5.jpg",
      heat: "1",
    },
    
  ];
  res.status(200).json(sauce);
});*/

/*app.post('/api/sauces', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});*/
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));


app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});

module.exports = app;