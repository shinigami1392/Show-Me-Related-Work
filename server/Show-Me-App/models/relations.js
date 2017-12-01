var mongoose = require('mongoose');
var PaperModel = require('./papers.js');
var UserModel = require('./users.js');
var CommentModel = require('./comments.js');
var Schema = mongoose.Schema;

var relationsSchema = new Schema({
	relationId: {type: String, required:true},
	relationFrom : {type: Schema.Types.ObjectId, ref:'PaperModel'},
	relationTo : {type: Schema.Types.ObjectId, ref:'PaperModel'},
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