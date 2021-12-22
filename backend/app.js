//------------------------- Creation de l'app------------------------- 

const express = require('express');
//const helmet = require('helmet');
const moongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv').config({ encoding: "latin1" });
const User = require('./models/user');
const userRoute = require('./routes/user');
const path = require('path');
const cors = require('cors');
const app = express();


moongoose.connect(process.env.MOONGOOSE_KEY,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>
        console.log("connexion a mongodb reussi")
    ).catch(() =>
        console.log("connexion a mongodb échoué")
    );

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//app.use(helmet());





// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});

app.use(express.json());
app.use('/api/auth', userRoute);

module.exports = app;