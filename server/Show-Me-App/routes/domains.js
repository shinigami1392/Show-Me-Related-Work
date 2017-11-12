var express = require('express');
var router = express.Router();
var apis = require('../api.js');

/* GET users listing. */
router.get('/all', function(req, res, next) {
	apis.findAllDomains(res);
});

module.exports = router;
