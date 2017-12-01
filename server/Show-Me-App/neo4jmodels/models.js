//var async = require('async');

var config = require('../config.json');
var graphNodeModel = require('./graphNode.js');

var neo4j = require('neo4j-driver').v1;

var exports = module.exports = {};

var connectToNeo4j = function() {
	var url = config.neo4jURL;
	var username = config.neo4jUsername;
	var password = config.neo4jPassword;
	var driver = neo4j.driver(url, neo4j.auth.basic(username, password));
	return driver;
}

exports.createNeo4jModel = function(){
	return connectToNeo4j();
}