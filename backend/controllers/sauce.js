const express = require('express');
const router = express.Router();

const Sauce = require('../models/Sauce');
  console.log("là");

exports.createSauce = (req, res, next) => {
  console.log("ici");
  console.log(req.body._id);
    console.log(req.body);

    delete req.body._id; //le front envoie en mauvais ID creer automatiquement par mongodb, on retire ce champs avant qu'il ne soit copié
    const sauce = new Sauce({
      ...req.body  //copie les champs de la requete
    });
    sauce.save() //enregistre l'objet dans la base
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error , message: 'Objet non enregistré !'}));
};

exports.getOneSauce = (req, res, next) => {
     //chercher en fonction de l'id
     Sauce.findOne({ _id: req.params.id }) //ce qui equivaut a req.params.id
     .then(sauce => res.status(200).json(sauce))
     .catch(error => res.status(404).json({ error }));
};

exports.modifySauce  = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //on prends l'id de l'élément qui doit être modifier et on le met à jour
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce  = (req, res, next) => {
    
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getAllStuff  = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};