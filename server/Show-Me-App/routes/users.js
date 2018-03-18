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

/* Route to be seclected when user choose to sign in using LinkedIn */ 
router.get('/oauth/linkedin', function(req, res, next) {
	apis.getLinkedInAuthorizationCode(req,res);
});

/* Redirect API for linkedIn. This API will be called when linkedIn 
   processes the user credentials and sends back the authoriation code */
router.get('/oauth/linkedIn/callback', function(req, res, next) {	
	apis.getLinkedInAccessToken(req,res);
});


module.exports = router;	
