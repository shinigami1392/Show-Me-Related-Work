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
				var domain = {'id':domains[i].id ,'name': domains[i].domainName, 'count': domains[i].papers.length};
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
	var node = getGraphNode(paperId, res);
	console.log("Res:" + node);
}

var getGraphNode = function(paperId, res){
	var driver = GraphNodeModel.getDriver();
	var session = driver.session();
	var resultPromise = session.run('MATCH (p:ResearchPaper {Id:"'+paperId+'"}) return p');
	resultSet = {};
	resultSet['incoming_relations'] = [];
	resultSet['outgoing_relations'] = [];
	resultPromise.then(result => {
		session.close();
		//console.log('result.records.length');
		for (var i = 0; i< result.records.length; i++){
			console.log("id: "+result.records[i].get(0).properties.Id);
			//resultSet.push(result.records[i].get(0));
			resultSet['id'] = result.records[i].get(0).properties.Id;
			console.log("name: "+result.records[i].get(0).properties.Title);
			resultSet['name'] = result.records[i].get(0).properties.Title;
			console.log("author: "+result.records[i].get(0).properties.Author);
			resultSet['author'] = result.records[i].get(0).properties.Author;
			console.log("url: "+result.records[i].get(0).properties.Link);
			resultSet['url'] = result.records[i].get(0).properties.Link;
			console.log("Year: ");
			resultSet['year'] = "";
		}

		driver.close();
		driver = GraphNodeModel.getDriver();
		session = driver.session();
		console.log("result Set: "+ JSON.stringify(resultSet));
		//MATCH p=(p1:ResearchPaper)-[r:HAS_REFERRED]->(p2:ResearchPaper) where p1.Id="1" RETURN r
		//var resultPromise1 = session.run('MATCH (p:ResearchPaper {Id:"'+paperId+'"}) return p');
		var resultPromise1 = session.run('MATCH p=(p1:ResearchPaper)-[r:HAS_REFERRED]->(p2:ResearchPaper) where p1.Id="'+ paperId + '"RETURN r, p2');
		resultPromise1.then(result1 => {
			session.close();
			//console.log('result.records.length');
			for (var i = 0; i< result1.records.length; i++){
				var data ={};
				// console.log("nodes: "+result1.records[i].get(0).properties);
				data['id'] = result1.records[i].get(0).properties.relId;
				data['destination_name'] = result1.records[i].get(1).properties.Title;
				data['destination_id'] = result1.records[i].get(1).properties.Id;
				data['weight'] = result1.records[i].get(0).properties.upvotes - result1.records[i].get(0).properties.downvotes;
				resultSet['outgoing_relations'].push(data);
				//resultSet.push(result.records[i].get(0));
			}

			driver.close();
			driver = GraphNodeModel.getDriver();
			session = driver.session();
			//var resultPromise2 = session.run('MATCH (p:ResearchPaper {Id:"'+paperId+'"}) return p');
			var resultPromise2 = session.run('MATCH p=(p1:ResearchPaper)<-[r:HAS_REFERRED]-(p2:ResearchPaper) where p1.Id="'+ paperId + '"RETURN r, p2');
		//var resultPromise1 = session1.run('MATCH p=(p1:ResearchPaper)-[r:HAS_REFERRED]->(p2:ResearchPaper) where p1.Id="'+ paperId + '"RETURN r');
			resultPromise2.then(function(result2){
				session.close();
				var objects = [];
				//console.log('result.records.length');
				for (var i = 0; i< result2.records.length; i++){
					var data ={};
				// console.log("nodes: "+result1.records[i].get(0).properties);
				data['id'] = result2.records[i].get(0).properties.relId;
				data['source_name'] = result2.records[i].get(1).properties.Title;
				data['source_id'] = result2.records[i].get(1).properties.Id;
				data['weight'] = result2.records[i].get(0).properties.upvotes - result2.records[i].get(0).properties.downvotes;
				console.log("data: "+JSON.stringify(data));
				resultSet['incoming_relations'].push(data);
				}
				driver.close();
				res.send(resultSet);
			});
		});
		
	});
}

