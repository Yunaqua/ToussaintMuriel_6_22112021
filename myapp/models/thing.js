const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  email: { type: String, required: true, unique =true },
  motdepasse: { type: String, required: true },
}); 

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body 
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});
module.exports = mongoose.model('Thing', thingSchema);

//<button _ngcontent-kec-c2="" color="primary" mat-raised-button="" class="mat-raised-button mat-button-base mat-primary" disabled="true"><span class="mat-button-wrapper">LOGIN</span><div class="mat-button-ripple mat-ripple" matripple=""></div><div class="mat-button-focus-overlay"></div></button>