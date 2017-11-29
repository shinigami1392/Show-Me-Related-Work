var UserModel = require('./models/users.js');
var PaperModel = require('./models/papers.js');
var DomainModel = require('./models/domains.js');
var RelationModel = require('./models/relations.js');
var GraphNodeModel = require('./neo4jmodels/graphNode.js');
var resultSet = [];

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
				var domain = {'id': domains[i].id, 'name': domains[i].domainName, 'count': domains[i].papers.length};
				obj.push(domain);
			}
			res.send({'found':true, 'domains':obj});
		}
		else res.send({'found':false});
	}); 
}

exports.findPapersforDomain = function(id, res){
	var query = DomainModel.findOne({id:id});
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

					if(relation.upvotes.indexOf(user._id) >= 0) result['upvotedByUser'] = true;
					else if(relation.downvotes.indexOf(user._id) > 0) result['downvotedByUser'] = true;
					res.send(result);
				}
				else invalidInput('Invalid User', res);
			});
		}
	});
}

exports.addUpvotes = function(relationId, userId, res){
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
					if(relation.upvotes.indexOf(user._id) == -1)
						relation.upvotes.push(user._id);
					relation.save(function(err){
						if(err) sendInternalServerError(res);
						else res.send({'updated':true});
					});
				}
				else invalidInput('Invalid User', res);
			});
		}
	});
}

exports.removeUpvotes = function(relationId, userId, res){
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
					if(relation.upvotes.indexOf(user._id) != -1)
						relation.upvotes.splice(relation.upvotes.indexOf(user._id),1);
					relation.save(function(err){
						if(err) sendInternalServerError(res);
						else res.send({'updated':true});
					});
				}
				else invalidInput('Invalid User', res);
			});
		}
	});
}

exports.addDownvotes = function(relationId, userId, res){
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
					if(relation.upvotes.indexOf(user._id) == -1)
						relation.downvotes.push(user._id);
					relation.save(function(err){
						if(err) sendInternalServerError(res);
						else res.send({'updated':true});
					});
				}
				else invalidInput('Invalid User', res);
			});
		}
	});
}

exports.removeDownvotes = function(relationId, userId, res){
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
					if(relation.downvotes.indexOf(user._id) != -1)
						relation.downvotes.splice(relation.downvotes.indexOf(user._id),1);
					relation.save(function(err){
						if(err) sendInternalServerError(res);
						else res.send({'updated':true});
					});
				}
				else invalidInput('Invalid User', res);
			});
		}
	});
}

exports.getGraph = function(paperId, res){
	var response = {};
	getGraphNode(paperId);
	console.log("Res:" + resultSet);
}

var getGraphNode = function(paperId){
	var driver = GraphNodeModel.getDriver();
	var session = driver.session();
	var resultPromise = session.run('MATCH (p:ResearchPaper {Id:"'+paperId+'"}) return p');
	resultSet = [];
	resultPromise.then(result => {
		session.close();
		//console.log('result.records.length');
		for (var i = 0; i< result.records.length; i++){
			//console.log(result.records[i].get(0));
			resultSet.push(result.records[i].get(0));
		}
		driver.close();
	});
	//return resultSet;
}

