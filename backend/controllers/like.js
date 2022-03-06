
const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => {
    console.log(req.body);
    /*console.log("im in");
    console.log(req.body.userId);*/

    
    //Cherche la sauce dans la bdd
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            console.log(sauce);
            //like = 1 (likes = +1)

            if (!sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId) && req.body.like === 1) { //userID n'est pas dans userliked BDD
                //console.log(req.body.userId);
                console.log("like 1");

                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc : { likes :1},
                        $push : {usersLiked : req.body.userId} //ajoute l'id de l'utilisateur
                    }
                )
                    .then(() => res.status(201).json({message : "ajout du like"}))
                    .catch((error) => res.status(400).json({ error }));
            }//if
             //like = 0 
            if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) { //userID est dans BDD et like nul
                console.log("like 0");

                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc : { likes :-1},
                        $pull : {usersLiked : req.body.userId} //remove l'userid
                    }
                )
                    .then(() => res.status(201).json({message : "suppression du like"}))
                    .catch((error) => res.status(400).json({ error }));
            }//if
            res.status(200).json(sauce);
            if (!sauce.usersDisliked.includes(req.body.userId) && !sauce.usersLiked.includes(req.body.userId) && req.body.like === -1) { //userID n'est pas dans userliked BDD
                console.log("dislikes 1");

                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc : { dislikes :1},
                        $push : {usersDisliked : req.body.userId} 
                    }
                )
                    .then(() => res.status(201).json({message : "ajout du dislike"}))
                    .catch((error) => res.status(400).json({ error }));
            }//if
             //dislikes = 0 
            if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) { //userID est dans BDD et like nul
                console.log("dislikes 0");

                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc : { dislikes :-1},
                        $pull : {usersDisliked : req.body.userId} //remove l'userid
                    }
                )
                    .then(() => res.status(201).json({message : "suppression du dislike"}))
                    .catch((error) => res.status(400).json({ error }));
            }//if
            res.status(200).json(sauce);
        })
        .catch((error) => res.status(404).json({ error }));

    

   

    //like = -1 (dislikes = +1)

    //like = 0 (dislikes = 0)
};