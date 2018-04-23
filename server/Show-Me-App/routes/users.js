var express = require('express');
var router = express.Router();
var apis = require('../api.js');

/* GET users listing. */
router.get('/userId/:id', function(req, res, next) {
	var userId = req.params.id; 
	apis.findUser(userId, res);
});

router.post('/user', function(req, res, next){
	console.log('post user');
	apis.findOrCreateUser(req.body.userId, req.body.first_name, req.body.last_name, req.body.email, res);
});

module.exports = router;
