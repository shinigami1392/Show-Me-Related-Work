var express = require('express');
var router = express.Router();
var apis = require('../api.js');

/* GET users listing. */
router.get('/userId/:id', function(req, res, next) {
	var userId = req.params.id; 
	apis.findUser(userId, res);
});

module.exports = router;
