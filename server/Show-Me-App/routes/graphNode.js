var express = require('express');
var router = express.Router();
var apis = require('../api.js');

router.get('/graphNode/:id', function(req, res, next) {
	var paperId = req.params.id;
	console.log("ID = " + paperId);
	apis.getGraph(paperId,res);
});

module.exports = router;