var express = require('express');
var router = express.Router();
var apis = require('../api.js');

/* GET users listing. */
router.get('/get', function(req, res, next) {
	var domain = req.query.domain;
	var source = req.query.source;
	var destination = req.query.destination;
	var user = req.query.user; 
	apis.findRelationFromId(domain, source, destination, user, res);
});

router.put('/upvote/add', function(req, res, next){
	var domain = req.query.domain;
	var source = req.query.source;
	var destination = req.query.destination;
	var user = req.query.user; 
	apis.addUpvotes(domain, source, destination, user, res);
});

router.put('/downvote/add', function(req, res, next){
	var domain = req.query.domain;
	var source = req.query.source;
	var destination = req.query.destination;
	var user = req.query.user; 
	// apis.addUpvotes(domain, source, destination, user, res);
	apis.addDownvotes(domain, source, destination, user, res);
});

router.put('/upvote/remove', function(req, res, next){
	var domain = req.query.domain;
	var source = req.query.source;
	var destination = req.query.destination;
	var user = req.query.user;
	apis.removeUpvotes(domain, source, destination, user, res);
});

router.put('/downvote/remove', function(req, res, next){
	var domain = req.query.domain;
	var source = req.query.source;
	var destination = req.query.destination;
	var user = req.query.user;
	apis.removeDownvotes(domain, source, destination, user, res);
});

router.put('/comment/add', function(req, res, next){
	var domain = req.query.domain;
	var source = req.query.source;
	var destination = req.query.destination;
	var user = req.query.user;
	var text = req.query.text;
	apis.addComments(domain, source, destination, user, text, res);
});

module.exports = router;
