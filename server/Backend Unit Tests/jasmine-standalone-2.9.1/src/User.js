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

var userSchema = new Schema({
	userId : {type: String, required: true, max:100},
	first_name : {type: String, required: true, max:100},
	last_name : {type: String, required: true, max:100},
	email : {type: String, required: true, max:100}
});

userSchema.virtual('name').get(function(){
	return this.first_name + ' ' + this.last_name;
});

userSchema.virtual('url').get(function(){
	return '/catalog/user/' + this._id;
});

module.exports = mongoose.model('UserModel', userSchema);

var findUser = function(id, res){
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