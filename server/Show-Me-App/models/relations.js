	var mongoose = require('mongoose');
var PaperModel = require('./papers.js');
var UserModel = require('./users.js');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
	comment : {type: String, required:true},
	commentBy : {type: Schema.ObjectId, ref:'UserModel'}
});

var CommentModel = mongoose.model('CommentModel', commentsSchema);

var relationsSchema = new Schema({
	relationId: {type: String, required:true},
	relationFrom : {type: Schema.ObjectId, ref:'PaperModel'},
	relationTo : {type: Schema.ObjectId, ref:'PaperModel'},
	upvotes : [{type: Schema.ObjectId, ref:'UserModel'}],
	downvotes : [{type: Schema.ObjectId, ref:'UserModel'}],
	comments : [{type: Schema.ObjectId, ref:'CommentModel'}]
});

relationsSchema.virtual('name').get(function(){
	return this.relationFrom + ' to ' + relationTo;
});

relationsSchema.virtual('url').get(function(){
	return '/catalog/relation/' + this._id;
});

module.exports = mongoose.model('RelationModel', relationsSchema);