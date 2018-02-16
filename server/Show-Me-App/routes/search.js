var express = require('express');
var router = express.Router();
var apis = require('../api.js');

router.get('/text', function(req, res, next) {
    var val = req.query.val;
    console.log("val: "+val);
    apis.search(val, res);
});

module.exports = router;