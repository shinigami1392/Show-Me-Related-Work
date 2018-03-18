var UserModel = require('./models/users.js');
var PaperModel = require('./models/papers.js');
var DomainModel = require('./models/domains.js');
var RelationModel = require('./models/relations.js');
var CommentModel = require('./models/comments.js');
var GraphNodeModel = require('./neo4jmodels/graphNode.js');
var resultSet = [];
var http = require('http');
var https = require('https');
var url = require('url');

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
	query.populate('papers');
	query.exec(function(err, domain){
		if(err) sendInternalServerError(res);
		else if(domain) {
			var papers = domain.papers;
			var objects = [];
			for(var i = 0; i < papers.length; i++){
				var object = {'id': papers[i].paperId, 'title': papers[i].title, 'authors': papers[i].author, 'date': papers[i].date, 'url':papers[i].url};
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

	var query = RelationModel.findOne({relationId:relationId});
	var userQuery = UserModel.findOne({userId: userId});
	query.populate('relationFrom relationTo');
	query.populate('comments', 'text timestamp userName');
	query.exec(function(err, relation){
		if(err) sendInternalServerError(err, res);
		else if(relation){
			userQuery.exec(function(err, user){
				if(err) sendInternalServerError(err, res);
				else if(user){
					var result = {};
					var object = {};
					object['id'] = relation.relationId;
					object['source_id'] = relation.relationFrom.paperId;
					object['source_name'] = relation.relationFrom.title;
					object['destination_id'] = relation.relationTo.paperId;
					object['destination_name'] = relation.relationTo.title;
					object['upvotes'] = relation.upvotes.length;
					object['downvotes'] = relation.downvotes.length;
					object['comments'] = [];

					for(var i=0; i<relation.comments.length; i++){
						var obj = {};
						obj['text'] = relation.comments[i].text;
						obj['timestamp'] = relation.comments[i].timestamp;
						obj['user_name'] = relation.comments[i].userName;
						object['comments'].push(obj);
					}
									

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

	var query = RelationModel.findOne({relationId:relationId});
	var userQuery = UserModel.findOne({userId: userId});

	query.exec(function(err, relation){
		if(err) sendInternalServerError(err, res);
		else if(relation){
			userQuery.exec(function(err, user){
				if(err) sendInternalServerError(err, res);
				else if(user){
					if(relation.upvotes.indexOf(user._id) == -1)
						relation.upvotes.push(user._id);
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

exports.getLinkedInAuthorizationCode = function(req, res){
	var client_id = "864gws1gwfmanp";
	var callbackURL = "http://localhost:8081/users/oauth/linkedin/callback";
	var state = "1234567"
	var scope = 'r_basicprofile ';
	
	if (req.url !='/favicon.ico') {
		/* calling linkedIn API to generate authorization code and send it on registered redirect API */
		res.writeHead(302, {
			'Location': 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + client_id + '&scope=' + scope + '&state=' + state + '&redirect_uri=' + callbackURL
		});
		res.end();		
	}
}

/* This function is invoked from getAccessToken when access token is successfully  returned by 
   linkedIn API	it calls linkedIn API to fetch user details. Type of data to be retrived can be 
   changed by changing the parameter requstingAPI */
var fetchData = function(request, response, access_token, requstingAPI, callback) {
	var options = {
		host: 'api.linkedin.com',
		port: 443,
		path: '/v1/' + requstingAPI + "?format=json&oauth2_access_token=" + access_token
	};

	var req = https.request(options, function(res) {
		res.on('data', function(d) {
			response.end(d);
		});
	});

	req.on('error', function(e) {		
		response.end("Got error while fetching user data");
	});
	req.end();
};

/* This function get client_id, client_secret key, callbackURL and authorization_code and calls 
   linkedIn	API which returns the access token. it internally calls function to fetch the user data */
var getAccessToken = function(client_id, client_secret, callbackURL, request, response, authorization_code, requstingAPI) {	

	var options = {
		host: 'api.linkedin.com',
		port: 443,
		path: "/uas/oauth2/accessToken?grant_type=authorization_code&code=" + authorization_code + "&redirect_uri=" + callbackURL + "&client_id=" + client_id + "&client_secret=" + client_secret
	};

	/* Calling API to get access token */
	var req = https.request(options, function(res) {
		res.on('data', function(d) {		
			access_token = JSON.parse(d).access_token;		
			fetchData(request, response, access_token, requstingAPI );
		});
	});

	req.on('error', function(e) {		
		response.end("Got error generating the access token");
	});
	req.end();
};

exports.getLinkedInAccessToken = function(req, res){
	var client_id = "864gws1gwfmanp";
	var client_secret = "GnRfsHdnQrxkAI2P";
	var callbackURL = "http://localhost:8081/users/oauth/linkedin/callback";
	var requstingAPI = 'people/~:(first-name,last-name,headline,picture-url)';
	var query_object = url.parse(req.url, true).query;
	var authorization_code = query_object.code;

	var options = {
		host: 'api.linkedin.com',
		port: 443,
		path: "/uas/oauth2/accessToken?grant_type=authorization_code&code=" + authorization_code + "&redirect_uri=" + callbackURL + "&client_id=" + client_id + "&client_secret=" + client_secret
	};
	
	/* Calling function to generate access token using authorization code */
	getAccessToken(client_id, client_secret, callbackURL, req, res, authorization_code, requstingAPI); 
}
