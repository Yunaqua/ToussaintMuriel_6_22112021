const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //la partie du tableau qui contient l'authentification
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //la clé doit correspondre à la fonction login
    const userId = decodedToken.userId;
    //req.auth = { userId };  //{ userId : userId};  raccourci js quand la clé et la variable ont le meme nom
    if (req.body.userId && req.body.userId !== userId) { //si le corps de la requete a un user.id, verifie que l'id correspond avec celui du token
      throw 'Invalid user ID';
    } else {
      next(); //le token est valable
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};