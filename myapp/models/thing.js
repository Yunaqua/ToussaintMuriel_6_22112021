const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  email: { type: String, required: true, unique =true },
  motdepasse: { type: String, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);