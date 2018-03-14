var UserModel = require('./models/users.js');
var PaperModel = require('./models/papers.js');
var DomainModel = require('./models/domains.js');
var RelationModel = require('./models/relations.js');
var CommentModel = require('./models/comments.js');
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
	// query.populate('papers');
	query.exec(function(err, domain){
		if(err) sendInternalServerError(res);
		else if(domain) {
			var papers = domain.papers;
			// console.log(papers);
			var objects = [];
			for(var i = 0; i < papers.length; i++){
				// console.log('id :' + papers[i].id);
				// console.log('authors : ' + papers[i].authors);
				var object = {'id': papers[i].id, 'title': papers[i].title, 'authors': papers[i].authors, 'publicationYear': papers[i].publicationYear, 'url':papers[i].link};
				objects.push(object);
			}
			res.send({'total': objects.length, 'papers': objects});
		}
		else{
			res.send({'total': 0, 'papers': []});
		}
	})
}

exports.findRelationFromId = function(domain, source, destination, userId, res){
	if(!domain) invalidInput('Please enter domain', res);
	if(!source) invalidInput('Please enter source', res);
	if(!destination) invalidInput('Please enter destination', res);
	if(!userId) invalidInput('Please enter user', res);

	var query = DomainModel.findOne({id:domain});
	query.exec(function(err, currentdomain){
		if(err) sendInternalServerError(res);
		else if(currentdomain){
			var papers = currentdomain.papers;
			var sourcePaper = null;
			for(var i=0; i < papers.length; i++){
				if(papers[i].id == source){
					sourcePaper = papers[i];
					break;
				}
			}
			if(sourcePaper == null) invalidInput('Source paper not found', res);
			else{
				var relations = sourcePaper.references;
				var foundFlag = false;
				var keys = Object.keys(relations);
				if(keys.indexOf(destination) != -1){

					var upvoted = false;
					var downvoted = false;

					var up = relations[destination].upvotes.indexOf(userId);
					if(up != -1) upvoted = true;

					var down = relations[destination].downvotes.indexOf(userId);
					if(down != -1) downvoted = true;

					var result = {'relation':relations[destination], 'upvotedByUser':upvoted, 'downvotedByUser':downvoted};
					res.send(result);
				}
				else{
					invalidInput('There is no relation exists between papers!', res);
				}
			}
		}
	});

	// var query = RelationModel.findOne({relationId:relationId});
	// var userQuery = UserModel.findOne({userId: userId});
	// query.populate('relationFrom relationTo');
	// query.populate('comments', 'text timestamp userName');
	// query.exec(function(err, relation){
	// 	if(err) sendInternalServerError(err, res);
	// 	else if(relation){
	// 		userQuery.exec(function(err, user){
	// 			if(err) sendInternalServerError(err, res);
	// 			else if(user){
	// 				var result = {};
	// 				var object = {};
	// 				object['id'] = relation.relationId;
	// 				object['source_id'] = relation.relationFrom.paperId;
	// 				object['source_name'] = relation.relationFrom.title;
	// 				object['destination_id'] = relation.relationTo.paperId;
	// 				object['destination_name'] = relation.relationTo.title;
	// 				object['upvotes'] = relation.upvotes.length;
	// 				object['downvotes'] = relation.downvotes.length;
	// 				object['comments'] = [];

	// 				for(var i=0; i<relation.comments.length; i++){
	// 					var obj = {};
	// 					obj['text'] = relation.comments[i].text;
	// 					obj['timestamp'] = relation.comments[i].timestamp;
	// 					obj['user_name'] = relation.comments[i].userName;
	// 					object['comments'].push(obj);
	// 				}
									

	// 				result['relation'] = object;
	// 				result['upvotedByUser'] = false;
	// 				result['downvotedByUser'] = false;

	// 				if(relation.upvotes.indexOf(user._id) >= 0) result['upvotedByUser'] = true;
	// 				else if(relation.downvotes.indexOf(user._id) > 0) result['downvotedByUser'] = true;
	// 				res.send(result);
	// 			}
	// 			else invalidInput('Invalid User', res);
	// 		});
	// 	}
	// });
}

exports.addUpvotes = function(domain, source, destination, userId, res){
	if(!domain) invalidInput('Please enter domain', res);
	if(!source) invalidInput('Please enter source', res);
	if(!destination) invalidInput('Please enter destination', res);
	if(!userId) invalidInput('Please enter user', res);

	var query = DomainModel.findOne({id:domain});
	query.exec(function(err, currentdomain){
		if(err) sendInternalServerError(res);
		else if(currentdomain){
			var papers = currentdomain.papers;
			var sourcePaper = null;
			var sourceIndex = null;
			for(var i=0; i < papers.length; i++){
				if(papers[i].id == source){
					sourcePaper = papers[i];
					sourceIndex = i;
					break;
				}
			}
			if(sourcePaper == null) invalidInput('Source paper not found', res);
			else{
				var relations = JSON.parse(JSON.stringify(sourcePaper.references));
				var foundFlag = false;
				var keys = Object.keys(relations);
				if(keys.indexOf(destination) != -1){
		
					relations[destination].upvotes.push(userId);

					var index = relations[destination].downvotes.indexOf(userId);
					if(index > -1)
						relations[destination].downvotes.splice(index,1);
  	
					currentdomain.papers[sourceIndex].references = relations;
	
					currentdomain.save(function(err){
						if(err) sendInternalServerError(err, res);
						else{ 
							res.send({'updated':true});
						}
					});
				}
				else{
					invalidInput('There is no relation exists between papers!', res);
				}
			}
		}
	});
	// var query = DomainModel.findOne({id:domain});
	// var userQuery = UserModel.findOne({userId: userId});

	// query.exec(function(err, domain){
	// 	if(err) sendInternalServerError(err, res);
	// 	else if(relation){
	// 		userQuery.exec(function(err, user){
	// 			if(err) sendInternalServerError(err, res);
	// 			else if(user){
	// 				if(relation.upvotes.indexOf(user._id) == -1)
	// 					relation.upvotes.push(user._id);
	// 				relation.save(function(err){
	// 					if(err) sendInternalServerError(err, res);
	// 					else res.send({'updated':true});
	// 				});
	// 			}
	// 			else invalidInput('Invalid User', res);
	// 		});
	// 	}
	// });
}

exports.removeUpvotes = function(relationId, userId, res){
	if(!relationId) invalidInput('Please enter relationId', res);
	if(!userId) invalidInput('Please enter user', res);

	var query = RelationModel.findOne({relationId:relationId});
	var userQuery = UserModel.findOne({userId: userId});

	query.exec(function(err, relation){
		if(err) sendInternalServerError(err, res);
		else if(relation){
			userQuery.exec(function(err, user){
				if(err) sendInternalServerError(err, res);
				else if(user){
					if(relation.upvotes.indexOf(user._id) != -1)
						relation.upvotes.splice(relation.upvotes.indexOf(user._id),1);
					relation.save(function(err){
						if(err) sendInternalServerError(err, res);
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

	var query = RelationModel.findOne({relationId:relationId});
	var userQuery = UserModel.findOne({userId: userId});

	query.exec(function(err, relation){
		if(err) sendInternalServerError(err, res);
		else if(relation){
			userQuery.exec(function(err, user){
				if(err) sendInternalServerError(err, res);
				else if(user){
					if(relation.upvotes.indexOf(user._id) == -1)
						relation.downvotes.push(user._id);
					relation.save(function(err){
						if(err) sendInternalServerError(err, res);
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
		if(err) sendInternalServerError(err, res);
		else if(relation){
			userQuery.exec(function(err, user){
				if(err) sendInternalServerError(err, res);
				else if(user){
					if(relation.downvotes.indexOf(user._id) != -1)
						relation.downvotes.splice(relation.downvotes.indexOf(user._id),1);
					relation.save(function(err){
						if(err) sendInternalServerError(err, res);
						else res.send({'updated':true});
					});
				}
				else invalidInput('Invalid User', res);
			});
		}
	});
}

exports.addComments = function(relationId, text, userId, res){
	if(!relationId) invalidInput('Please enter relationId', res);
	if(!text) invalidInput('Please enter text', res);
	if(!userId) invalidInput('Please provide user', res);

	var query = RelationModel.findOne({relationId:relationId});
	var userQuery = UserModel.findOne({userId: userId});

	query.exec(function(err, relation){
		if(err) sendInternalServerError(err, res);
		else if(relation){
			userQuery.exec(function(err, user){
				if(err) sendInternalServerError(err, res);
				else if(user){
					//creating a new comment
					var comment = new CommentModel({'user':user._id, 'text':text, 'timestamp':Date.now(), 'userName': user.name});
					comment.save(function(err){
						if(err) sendInternalServerError(err, res);
						else{
							relation.comments.push(comment._id);
							relation.save(function(err){
								if(err) sendInternalServerError(err, res);
								else res.send({'added':true});
							});		
						}
					})
					
				}
				else invalidInput('Invalid User', res);
			});
		}
		else invalidInput('Invalid Relation', res);
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
		for (var i = 0; i< result.records.length; i++){
			resultSet['id'] = result.records[i].get(0).properties.Id;
			resultSet['name'] = result.records[i].get(0).properties.Title;
			resultSet['author'] = result.records[i].get(0).properties.Author;
			resultSet['url'] = result.records[i].get(0).properties.Link;
			resultSet['year'] = "";
		}

		driver.close();
		driver = GraphNodeModel.getDriver();
		session = driver.session();
		var resultPromise1 = session.run('MATCH p=(p1:ResearchPaper)-[r:HAS_REFERRED]->(p2:ResearchPaper) where p1.Id="'+ paperId + '"RETURN r, p2');
		resultPromise1.then(result1 => {
			session.close();
			for (var i = 0; i< result1.records.length; i++){
				var data ={};
				data['id'] = result1.records[i].get(0).properties.relId;
				data['destination_name'] = result1.records[i].get(1).properties.Title;
				data['destination_id'] = result1.records[i].get(1).properties.Id;
				data['weight'] = result1.records[i].get(0).properties.upvotes - result1.records[i].get(0).properties.downvotes;
				resultSet['outgoing_relations'].push(data);
			}

			driver.close();
			driver = GraphNodeModel.getDriver();
			session = driver.session();
			var resultPromise2 = session.run('MATCH p=(p1:ResearchPaper)<-[r:HAS_REFERRED]-(p2:ResearchPaper) where p1.Id="'+ paperId + '"RETURN r, p2');
			resultPromise2.then(function(result2){
				session.close();
				var objects = [];
				for (var i = 0; i< result2.records.length; i++){
					var data ={};
					data['id'] = result2.records[i].get(0).properties.relId;
					data['source_name'] = result2.records[i].get(1).properties.Title;
					data['source_id'] = result2.records[i].get(1).properties.Id;
					data['weight'] = result2.records[i].get(0).properties.upvotes - result2.records[i].get(0).properties.downvotes;
					resultSet['incoming_relations'].push(data);
				}
				driver.close();
				res.send(resultSet);
			});
		});
		
	});
}


