var express = require('express');
var router = express.Router();
var apis = require('../api.js');

/* GET users listing. */
router.get('/get', function(req, res, next) {
	var relationId = req.query.id;
	var user = req.query.user; 
	console.log(relationId);
	console.log(user);
	apis.findRelationFromId(relationId, user, res);
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

module.exports = router;
