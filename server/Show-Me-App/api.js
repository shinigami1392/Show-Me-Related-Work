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
	// query.select('domainName papers');
	query.exec(function(err, domains){
		if(err) sendInternalServerError(res);
		if(domains){
			obj = [];
			for(var i = 0; i < domains.length; i++){
				var domain = {'name': domains[i].domainName, 'count': domains[i].papers.length};
				obj.push(domain);
			}
			res.send({'found':true, 'domains':obj});
		}
		else res.send({'found':false});
	}); 
}

exports.findPapersforDomain = function(title, res){
	console.log('in function');
	var query = DomainModel.findOne({domainName:title});
	query.populate('papers');
	query.exec(function(err, domain){
		if(err) sendInternalServerError(res);
		if(domain) {
			var papers = domain.papers;
			var objects = [];
			for(var i = 0; i < papers.length; i++){
				var object = {'id': papers[i].paperId, 'title': papers[i].title, 'authors': papers[i].authors, 'date': papers[i].date};
				objects.push(object);
			}
			res.send({'total': objects.length, 'papers': objects});
		}
		else{
			res.send({'total': 0, 'papers': []});
		}
	})
}


