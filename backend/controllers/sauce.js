const express = require('express');
const router = express.Router();

const Sauce = require('../models/Sauce');
const fs = require('fs');//file system

exports.createSauce = (req, res, next) => {
  console.log(req.body.sauce);
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; //le front envoie en mauvais ID creer automatiquement par mongodb, on retire ce champs avant qu'il ne soit copié
  const sauce = new Sauce({
    ...sauceObject,  //copie les champs de la requete
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // recupère l'url ou se trouve l'image

    });
    sauce.save() //enregistre l'objet dans la base
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error, message: 'Objet non enregistré !' }));
};


exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? // voir si le dossier existe
    {
      ...JSON.parse(req.body.sauce),// si on a le fichier, on recup la chaine de character et on la parse en objet
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; //sinon on prend le corps de la requete
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //on prends l'id de l'élément qui doit être modifier et on le met à jour
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //trouve l'objet dans la base de donnée
    .then(sauce => { //recup le nom du fichier
      const filename = sauce.imageUrl.split('/images/')[1];//retourne un tableau de 2 éléments, 0 = avant /images/ et 1 = après = nom du fichier
      fs.unlink(`images/${filename}`, () => {//unlink supprime le fichier, et () c'est le callback
        Sauce.deleteOne({ _id: req.params.id })//une fois le fichier supprimer on supprime l'objet de la bdd
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  //chercher en fonction de l'id
  Sauce.findOne({ _id: req.params.id }) //ce qui equivaut a req.params.id
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};


exports.getAllSauce = (req, res, next) => {
  console.log("test");
  Sauce.find().sort({likes : -1 })
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};