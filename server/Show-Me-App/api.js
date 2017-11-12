var UserModel = require('./models/users.js');
var PaperModel = require('./models/papers.js');
var DomainModel = require('./models/domains.js');
var RelationModel = require('./models/relations.js');

var exports = module.exports = {};

var sendInternalServerError = function(err, res){
	res.status(501).send(err);
}

exports.findUser = function(id, res){
	var query = UserModel.findOne({userId:id});
	query.exec(function(err, user){
		if(err) sendInternalServerError(res);
		if(user) {
			res.send({'found':true, 'user':{'first_name': user.first_name, 'last_name': user.last_name,
					'email':user.email}});
		}
		else res.send({'found':false});
	});
}

exports.findAllDomains = function(res){
	var query = DomainModel.find();
	query.select('domainName');
	query.exec(function(err, domains){
		if(err) sendInternalServerError(res);
		if(domains){
			res.send({'found':true, 'domains':domains})
		}
		else res.send({'found':false});
	});
}