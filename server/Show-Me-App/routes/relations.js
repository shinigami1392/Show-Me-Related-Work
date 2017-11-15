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

module.exports = router;
