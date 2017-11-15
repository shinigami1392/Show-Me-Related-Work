var UserModel = require('./models/users.js');
var PaperModel = require('./models/papers.js');
var DomainModel = require('./models/domains.js');
var RelationModel = require('./models/relations.js');

var exports = module.exports = {};

var sendInternalServerError = function(err, res){
	res.status(501).send(err);
}

var invalidInput = function(err, res){
	res.status(400).send(err);
}

exports.findUser = function(id, res){
	var query = UserModel.findOne({userId:id});
	query.exec(function(err, user){
		if(err) sendInternalServerError(res);
		else if(user) {
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
		else if(domains){
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
	var query = DomainModel.findOne({domainName:title});
	query.populate('papers');
	query.exec(function(err, domain){
		if(err) sendInternalServerError(res);
		else if(domain) {
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

exports.findRelationFromId = function(relationId, userId, res){
	if(!relationId) invalidInput('Please enter relationId', res);
	if(!userId) invalidInput('Please enter user', res);

	var query = RelationModel.findOne({_id:relationId});
	var userQuery = UserModel.findOne({userId: userId});

	query.exec(function(err, relation){
		if(err) sendInternalServerError(res);
		else if(relation){
			userQuery.exec(function(err, user){
				if(err) sendInternalServerError(res);
				else if(user){
					var result = {};
					var object = {};
					object['relationFrom'] = relation.relationFrom;
					object['relationTo'] = relation.relationTo;
					object['upvotes'] = relation.upvotes.length;
					object['downvotes'] = relation.downvotes.length;
					object['comments'] = relation.comments;					

					result['relation'] = object;
					result['upvotedByUser'] = false;
					result['downvotedByUser'] = false;

					if(relation.upvotes.indexOf(user.userId) > 0) result['upvotedByUser'] = true;
					else if(relation.downvotes.indexOf(user.userId) > 0) result['downvotedByUser'] = true;
					res.send(result);
				}
				else invalidInput('Invalid User', res);
			});
		}
	});
}



