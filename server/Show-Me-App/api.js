var UserModel = require('./models/users.js');
var PaperModel = require('./models/papers.js');
var DomainModel = require('./models/domains.js');
var RelationModel = require('./models/relations.js');
var CommentModel = require('./models/comments.js');
var GraphNodeModel = require('./neo4jmodels/graphNode.js');
var resultSet = [];

var exports = module.exports = {};


var sendInternalServerError = function (err, res) {
	res.status(501).send(err);
}

var invalidInput = function (err, res) {
	res.status(400).send(err);
}

exports.findUser = function (id, res) {
	var query = UserModel.findOne({ userId: id });
	query.exec(function (err, user) {
		if (err) sendInternalServerError(res);
		else if (user) {
			res.send({
				'found': true, 'user': {
					'userId' : user.userId,
					'first_name': user.first_name, 
					'last_name': user.last_name,
					'email': user.email
				}
			});
		}
		else res.send({ 'found': false });
	});
}

exports.findAllDomains = function (res) {
	var query = DomainModel.find();
	query.exec(function(err, domains){
		if(err) sendInternalServerError(res);
		else if(domains){
			obj = [];
			for (var i = 0; i < domains.length; i++) {
				var domain = { 'id': domains[i].id, 'name': domains[i].domainName, 'count': domains[i].papers.length };
				obj.push(domain);
			}
			res.send({ 'found': true, 'domains': obj });
		}
		else res.send({ 'found': false });
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
			res.send({ 'total': objects.length, 'papers': objects });
		}
		else {
			res.send({ 'total': 0, 'papers': [] });
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
				}
				if(papers[i].id == destination){
					destinationPaper = papers[i];
				}
			}
			if(sourcePaper == null) invalidInput('Source paper not found', res);
			else if(destinationPaper == null) invalidInput('Destination paper not found', res);
			else{
				var relations = sourcePaper.references;
				var sourceTitle = sourcePaper.title;
				var destinationTitle = destinationPaper.title;
				var foundFlag = false;
				var keys = Object.keys(relations);
				if(keys.indexOf(destination) != -1){

					var upvoted = false;
					var downvoted = false;

					var up = relations[destination].upvotes.indexOf(userId);
					if(up != -1) upvoted = true;

					var down = relations[destination].downvotes.indexOf(userId);
					if(down != -1) downvoted = true;

					// var result = {'relation':relations[destination], 'upvotedByUser':upvoted, 'downvotedByUser':downvoted};
					var result = {'relation':{
										'upvotes':relations[destination].upvotes.length,
										'downvotes': relations[destination].downvotes.length,
										'comments': relations[destination].comments
									},
									'destinationTitle': destinationTitle,
									'sourceTitle': sourceTitle,
								 	'upvotedByUser':upvoted,
								 	'downvotedByUser':downvoted
								 };
					res.send(result);
				}
				else{
					invalidInput('There is no relation exists between papers!', res);
				}
			}
		}
	});
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
					
					var index = relations[destination].upvotes.indexOf(userId);
					if (index == -1) {
						relations[destination].upvotes.push(userId);	
						updateNeo4j( 'add' ,'upvotes', sourcePaper.id, destination );
					}
					
					// var index = relations[destination].downvotes.indexOf(userId);
					// if(index > -1) {						
					// 	relations[destination].downvotes.splice(index,1);
					// }
						
  	
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
}




exports.removeUpvotes = function(domain, source, destination, userId, res){
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
					
					var index = relations[destination].upvotes.indexOf(userId);
					if (index > -1) {
						relations[destination].upvotes.splice(index, 1);						
						updateNeo4j( 'remove' ,'upvotes', sourcePaper.id, destination );
					}					
  	
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
}

exports.addDownvotes = function(domain, source, destination, userId, res){
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
					
					var index = relations[destination].downvotes.indexOf(userId);
					if (index == -1) {
						relations[destination].downvotes.push(userId);					
						updateNeo4j( 'add' ,'downvotes', sourcePaper.id, destination );
					}
						

					// var index = relations[destination].upvotes.indexOf(userId);
					// if(index > -1) {
					// 	relations[destination].upvotes.splice(index,1);
					// }
						
  	
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
}

exports.removeDownvotes = function(domain, source, destination, userId, res){
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
					
					var index = relations[destination].downvotes.indexOf(userId);
					if (index > -1) {
						relations[destination].downvotes.splice(index, 1);						
						updateNeo4j( 'remove' ,'downvotes', sourcePaper.id, destination );
					}
						
  	
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
}

var updateNeo4j = function( action, choice, source, destination  ) {
	driver = GraphNodeModel.getDriver();
	session = driver.session();
	var upvotesCount = 0, downvotesCount = 0;	
	var relation = session.run('MATCH p=(p1:ResearchPaper)-[r:HAS_REFERRED]->(p2:ResearchPaper) where p1.Id="' + source + '" AND p2.Id="'+ destination  +'" RETURN r');
	relation.then(result => {
		session.close();
		upvotesCount = result.records[0].get(0).properties.upvotes
		downvotesCount = result.records[0].get(0).properties.downvotes							
		driver.close();		

		if (action === 'add') {
			if (choice === 'upvotes') {
				upvotesCount = (Number(upvotesCount) + 1).toString();					
				updateUpvoteDownvote(upvotesCount, choice , source, destination );
			}
			else if (choice === 'downvotes') {
				downvotesCount = (Number(downvotesCount) + 1).toString();	
				updateUpvoteDownvote(downvotesCount, choice , source, destination );
			}
		}
		else if (action === 'remove') {			
			if (choice === 'upvotes') {
				upvotesCount = (Number(upvotesCount) - 1).toString();					
				updateUpvoteDownvote(upvotesCount, choice , source, destination );
			}
			else if (choice === 'downvotes') {
				downvotesCount = (Number(downvotesCount) - 1).toString();	
				updateUpvoteDownvote(downvotesCount, choice, source, destination );
			}
		}									
	  });

}

var updateUpvoteDownvote = function(value, property, sourceid, destination){
		driver = GraphNodeModel.getDriver();
		session = driver.session();			
		if (property === 'upvotes') {			
			var update = session.run('MATCH p=(p1:ResearchPaper)-[r:HAS_REFERRED]->(p2:ResearchPaper) where p1.Id= "' + sourceid +'" AND p2.Id= "'+ destination +'" SET r.upvotes = "'+  value +'"')
			update.then(result => {
				session.close();
				//console.log(result)		
				driver.close();
			  }).catch(err => {			  
			  })
		}
		else {			
			var update = session.run('MATCH p=(p1:ResearchPaper)-[r:HAS_REFERRED]->(p2:ResearchPaper) where p1.Id= "' + sourceid +'" AND p2.Id= "'+ destination +'" SET r.downvotes = "'+  value +'"')
			update.then(result => {
				session.close();
				//console.log(result)		
				driver.close();
			  }).catch(err => {			  
			  })	
		}
		
}


exports.addComments = function(domain, source, destination, userId, text, res){
	if(!domain) invalidInput('Please enter domain', res);
	if(!source) invalidInput('Please enter source', res);
	if(!destination) invalidInput('Please enter destination', res);
	if(!userId) invalidInput('Please enter user', res);
	if(!text) invalidInput('Please enter text', res);

	var query = DomainModel.findOne({id:domain});
	var userquery = UserModel.findOne({userId:userId});
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
					userquery.exec(function(err, user){
						if (err) sendInternalServerError(res);
						else if(user){
							var obj = {'comment':text, 'userId':userId, 'username': user.first_name + ' ' + user.last_name};
							obj['timestamp'] = new Date();
							relations[destination].comments.push(obj);
							currentdomain.papers[sourceIndex].references = relations;
							currentdomain.save(function(err){
								if(err) sendInternalServerError(err, res);
								else{ 
									res.send({'updated':true});
								}
							});		
						}
						else invalidInput('Send a valid user', res);
					});
				}
				else{
					invalidInput('There is no relation exists between papers!', res);
				}
			}
		}
	});
}

exports.getGraph = function (paperId, res) {
	var response = {};
	var node = getGraphNode(paperId, res);
	console.log("Res:" + node);
}

var getGraphNode = function (paperId, res) {
	var driver = GraphNodeModel.getDriver();
	var session = driver.session();
	var resultPromise = session.run('MATCH (p:ResearchPaper {Id:"' + paperId + '"}) return p');
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
			resultSet['year'] = result.records[i].get(0).properties.Link;
		}

		driver.close();
		driver = GraphNodeModel.getDriver();
		session = driver.session();
		var resultPromise1 = session.run('MATCH p=(p1:ResearchPaper)-[r:HAS_REFERRED]->(p2:ResearchPaper) where p1.Id="' + paperId + '"RETURN r, p2');
		resultPromise1.then(result1 => {
			session.close();
			for (var i = 0; i < result1.records.length; i++) {
				var data = {};
				data['id'] = result1.records[i].get(0).properties.relId;
				data['destination_name'] = result1.records[i].get(1).properties.Title;
				data['destination_id'] = result1.records[i].get(1).properties.Id;
				data['weight'] = result1.records[i].get(0).properties.upvotes - result1.records[i].get(0).properties.downvotes;
				resultSet['outgoing_relations'].push(data);
			}

			driver.close();
			driver = GraphNodeModel.getDriver();
			session = driver.session();
			var resultPromise2 = session.run('MATCH p=(p1:ResearchPaper)<-[r:HAS_REFERRED]-(p2:ResearchPaper) where p1.Id="' + paperId + '"RETURN r, p2');
			resultPromise2.then(function (result2) {
				session.close();
				var objects = [];
				for (var i = 0; i < result2.records.length; i++) {
					var data = {};
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

exports.findOrCreateUser = function(id, first_name, last_name, email, res){
	var query = UserModel.findOne({ userId: id });
	query.exec(function (err, user) {
		if (err) sendInternalServerError(res);
		else if (user) {
			res.send({
				'found': true, 'user': {
					'first_name': user.first_name, 'last_name': user.last_name,
					'email': user.email, 'userId' : user.userId
				}
			});
		}
		else {
			console.log('not found trying to create...');
			var newUser = {'userId' : id, 'first_name' : first_name, 'last_name' : last_name, 'email' : email};
			var data = new UserModel(newUser);
			data.save();
			res.send({ 'found': false , 'user': {
				'first_name': first_name, 'last_name': last_name,
				'email': email, 'userId' : id
			}});
		}
	});
}

exports.findPapersForDomainPaginated = function(draw, start, length, areaid, res){
	var totalPapersForDomainQuery =  DomainModel.aggregate([
		  { $match: { id: areaid } },
		  { $project: {
				  id: "$id",
				  paperCount: { $size: "$papers" }
			}
		  }  
		])
	var totalRecords;
	totalPapersForDomainQuery.exec(function(err, result){
		if(err) sendInternalServerError(err, result);
		if(result === undefined || result.length == 0 || result[0] == null){
			res.send({"draw": draw, "recordsTotal": 0, "recordsFiltered":0, "data":[]});
		}
		else{
			totalRecords = result[0].paperCount;
			query = DomainModel.findOne({id:areaid}, {papers:{$slice: [ start, length]}});
			query.exec(function(err, domain){
				if(err) sendInternalServerError(res);
				else if(domain) {
					var papers = domain.papers;
					var dttable = [];
					for(var i = 0; i < papers.length; i++){
						var object = [];
						object.push(papers[i].id);
						object.push(papers[i].title);
						object.push(papers[i].authors.toString().slice(0,-1)); 
						dttable.push(object);
					}
					res.send({"draw": draw, "recordsTotal": totalRecords, "recordsFiltered":totalRecords, "data":dttable});
				}
				else{
					res.send({"draw": draw, "recordsTotal": 0, "recordsFiltered":0, "data":[]});
				}
			})
		}	
	});
}
exports.search = function (text, draw, start, length, res) {

	var countQuery = PaperModel.find(
		{ $text: { $search: text } },
		{ score: { $meta: "textScore" } }
	).sort({ score: { $meta: 'textScore' } }).count();

	var paginatedQuery = PaperModel.find(
		{ $text: { $search: text } },
		{ score: { $meta: "textScore" } }
	).sort({ score: { $meta: 'textScore' } }).skip(start).limit(length);
	
	
	countQuery.exec(function(err, count){
		var totalRecords = count;
		paginatedQuery.exec(function (err, papers) {
			if (err) sendInternalServerError(res);
			else if (papers) {
				var dttable = [];
				for (var i = 0; i < papers.length; i++) {
					var object = [];
					object.push(papers[i].id);
					object.push(papers[i].title);
					object.push(papers[i].authors.toString().slice(0,-1)); 
					object.push(papers[i].publicationYear);
					object.push(papers[i].domainId);
					object.push(papers[i].stream);
					dttable.push(object);
				}
				
				res.send({"draw": draw, "recordsTotal": totalRecords, "recordsFiltered":totalRecords, "data":dttable});
				
			}
			else {
				res.send({"draw": draw, "recordsTotal": 0, "recordsFiltered":0, "data":[]});
			}
		});	
	});		

	


}


