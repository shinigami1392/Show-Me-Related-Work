var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	id : {type: String, required: true, max:100},
	first_name : {type: String, required: true, max:100},,
	last_name : {type: String, required: true, max:100},,
	email : {type: String, required: true, max:100}
});

userSchema.virtual('name').get(function(){
	return this.first_name + ' ' + this.last_name;
});

userSchema.virtual('url').get(function(){
	return '/catalog/user/' + this.id;
});

module.exports = mongoose.model('UserModel', userSchema);