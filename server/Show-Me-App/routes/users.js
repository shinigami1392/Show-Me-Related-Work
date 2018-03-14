var express = require('express');
var router = express.Router();
var apis = require('../api.js');
var passport = require('passport');
var UsersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/userId/:id', function(req, res, next) {
	var userId = req.params.id; 
	apis.findUser(userId, res);
});

router.route('/oauth/facebook').post(passport.authenticate('facebookToken', {session: false}, UsersController.facebookOAuth));

module.exports = router;
