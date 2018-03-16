var express = require('express');
var router = express.Router();
var apis = require('../api.js');
var passport = require('passport');
var UsersController = require('../controllers/usersController');
var request = require('request');


/* GET users listing. */
router.get('/userId/:id', function(req, res, next) {
	var userId = req.params.id; 
	apis.findUser(userId, res);
});

router.route('/oauth/facebook').post(passport.authenticate('facebookToken', {session: false}, UsersController.facebookOAuth));

module.exports = router;

router.get('/oauth/linkedIn', function(req, res, next) {
	
	var p = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=864gws1gwfmanp&redirect_uri=http://localhost:8080/&state=abcde&scope=r_basicprofile';
		
	request(p, (err, res, body) => {	   
	  if (err) { return console.log(err);
	});
});

router.get('/oauth/linkedIn/callback', function(req, res, next) {	

	var url = req.url;
	var code = url.split("=")[1]
	code = code.substring(0, code.length-6);	
	var query = "https://www.linkedin.com/oauth/v2/"+code;
	var incomingdata;
	request(query, (err, res, body) => {	   
	   	if (res.statusCode == 200) {
			incomingdata = body;	
	    }
		else if (err) { 
			return console.log(err); 
	    }		     
	});	
	
	res.send(incomingdata);
});
