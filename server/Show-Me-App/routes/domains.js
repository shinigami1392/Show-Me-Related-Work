var express = require('express');
var router = express.Router();
var apis = require('../api.js');

/* GET users listing. */
router.get('/all', function(req, res, next) {
	apis.findAllDomains(res);
});

router.get('/:title', function(req, res, next){
	var title = req.params.title;
	console.log(title);
	apis.findPapersforDomain(title, res);
});

module.exports = router;
