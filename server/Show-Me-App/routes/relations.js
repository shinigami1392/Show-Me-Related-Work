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
	var relationId = req.query.id;
	var user = req.query.user;
	apis.addUpvotes(relationId, user, res);
});

router.put('/downvote/add', function(req, res, next){
	var relationId = req.query.id;
	var user = req.query.user;
	apis.addDownvotes(relationId, user, res);
});

router.put('/upvote/remove', function(req, res, next){
	var relationId = req.query.id;
	var user = req.query.user;
	apis.removeUpvotes(relationId, user, res);
});

router.put('/downvote/remove', function(req, res, next){
	var relationId = req.query.id;
	var user = req.query.user;
	apis.removeDownvotes(relationId, user, res);
});

router.put('/comment/add', function(req, res, next){
	var relationId = req.query.relationId;
	var text = req.query.text;
	var user_name = req.query.user_name;
	apis.addComments(relationId, text, user_name, res);
});

module.exports = router;
