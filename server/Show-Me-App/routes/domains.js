var express = require('express');
var router = express.Router();
var apis = require('../api.js');

/* GET users listing. */
router.get('/all', function(req, res, next) {
	apis.findAllDomains(res);
});

router.get('/:id', function(req, res, next){
	var id = req.params.id;
	console.log(id);
	apis.findPapersforDomain(id, res);
});

router.post('/papers', function(req, res, next){
	console.log("Here");
	console.log(req.body);
	apis.findPapersforDomain(1, res);
});
module.exports = router;
