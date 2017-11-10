var async = require('async');
var mongoose = require('mongoose');

var config = require('../config.json');
var UserModel = require('./users');
var PaperModel = require('./papers');
var DomainModel = require('./domains');

var exports = module.exports = {};
var connectToMongo = function(){
	var mongoURL = config.mongoURL;
	
	mongoose.connect(mongoURL,{
  		useMongoClient: true
	});

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

exports.createModels = function(){
	connectToMongo();
	userDetail = {userId:'abc', first_name:'Apoorv', last_name:'Khairnar', email:'akhairna@asu.edu'};
	var user = new UserModel(userDetail);
	user.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('New user :' + user);
		}
	});
	console.log('Database connection successful!');
}