var express = require('express');
var router = express.Router();
var apis = require('../apis.js');

router.get('/graphNode/:id', function() {
	var paperId = req.params.id;
	apis.getGraphNode(paperId, res);
});

module.exports = router;