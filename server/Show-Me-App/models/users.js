var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

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