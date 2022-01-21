const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  //usersLiked: { type: String<userId>, required: true },
  //usersDisliked: { type: String<userId>, required: true }
}, {
  timestamp: true
});

sauceSchema.plugin(uniqueValidator); // on applique le validateur au modèle


module.exports = mongoose.model('Sauce', sauceSchema);