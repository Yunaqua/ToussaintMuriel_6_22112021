const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ //configure le chemin et le nom de fichier pour les fichiers entrants.
  destination: (req, file, callback) => {//explique à multer où enregistrer les fichiers
    callback(null, 'images'); //null -> pas d'erreur, puis le nom du fichier
  },
  filename: (req, file, callback) => { //on nomme le fichier, afin d'eviter d'avoir des fichiers avec le meme nom
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype]; //le type de l'image de notre tableau en fonction de celle de base
    callback(null, name + Date.now() + '.' + extension); //date a à milliseconde près pour rendre le nom unique
  }
});

module.exports = multer({storage: storage}).single('image');// single => fichier unique