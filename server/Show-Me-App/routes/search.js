var express = require('express');
var router = express.Router();
var apis = require('../api.js');

router.post('/papers', function(req, res, next) {
    apis.search(req.body.text, req.body.draw, req.body.start, req.body.length, res);
});

module.exports = router;