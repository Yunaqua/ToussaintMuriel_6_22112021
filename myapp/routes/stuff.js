const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.get('/all-user', stuffCtrl.getAllUser);
router.post('/auth/signup', stuffCtrl.signup);
//router.get('/:id', stuffCtrl.getOneThing);

module.exports = router;