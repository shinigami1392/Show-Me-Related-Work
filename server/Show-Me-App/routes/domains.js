var express = require('express');
var router = express.Router();
var apis = require('../api.js');

/* GET users listing. */
router.get('/all', function(req, res, next) {
	apis.findAllDomains(res);
});

router.get('/:id', function(req, res, next){
	var id = req.params.id;
	apis.findPapersforDomain(id, res);
});

router.post('/papers', function(req, res, next){
	apis.findPapersForDomainPaginated(req.body.draw, req.body.start, req.body.length, req.body.areaid, res);
});
module.exports = router;
