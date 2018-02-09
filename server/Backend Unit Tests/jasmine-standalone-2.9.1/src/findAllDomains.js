
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./config.json');


var connectToMongo = function(){
	var mongoURL = config.mongoURL;
	
	mongoose.connect(mongoURL,{
  		useMongoClient: true
	});	

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

var getRandom = function(max){
	return Math.floor(Math.random()*max);
}

var createModels = function(){
	connectToMongo();
	console.log('Database connection successful!');
}

var domainssSchema = new Schema({
	id : {type: String, required:true},
	domainName : {type: String, required: true, max:100},
	papers : [{type: Schema.ObjectId, ref:'PaperModel'}]
});

domainssSchema.virtual('name').get(function(){
	return this.paperName;
});

domainssSchema.virtual('url').get(function(){
	return '/catalog/domain/' + this._id;
});

module.exports = mongoose.model('DomainModel', domainssSchema);

var findAllDomains = function(res){
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