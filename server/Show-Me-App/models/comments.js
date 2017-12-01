var mongoose = require('mongoose');
var UserModel = require('./users.js');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
	timestamp : {type: String, required:true},
	text: {type: String, required:true},
	userName: {type: String, required: true},
	user : {type: Schema.ObjectId, ref:'UserModel'}
});

commentsSchema.virtual('name').get(function(){
	return this.text + ' by ' + this.user;
});

commentsSchema.virtual('url').get(function(){
	return '/catalog/comment/' + this._id;
});

var CommentModel = mongoose.model('CommentModel', commentsSchema);

module.exports = mongoose.model('CommentModel', commentsSchema);