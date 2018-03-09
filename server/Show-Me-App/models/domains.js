var mongoose = require('mongoose');
var PaperModel = require('./papers.js');
var RelationModel = require('./relations.js')
var Schema = mongoose.Schema;

var domainssSchema = new Schema({
	id : {type: String, required:true},
	domainName : {type: String, required: true, max:100},
	// papers : [{type: Schema.ObjectId, ref:'PaperModel'}]
	papers : [{
		id : {type: String, required: true, max:100},
		title : {type: String, required: true, max:500},
		authors : [String],
		doi: {type: String, required: true, max:50},
		stream: {type: String, required: true, max:50},
		abstract: {type: String, required: false, max:1000},
		reference: [{
			relationTo:{type:String, required:true},
			upvotes: [{type: Schema.ObjectId, ref:'UserModel'}],
			downvotes: [{type: Schema.ObjectId, ref:'UserModel'}],
			comments: [{
				timestamp : {type: String, required:true},
				text: {type: String, required:true},
				userName: {type: String, required: true},
				user : {type: Schema.ObjectId, ref:'UserModel'}
			}]
		}],
		link : {type:String, required:true},
		publicationYear : {type: String, required: true}
	}]
});

domainssSchema.virtual('name').get(function(){
	return this.paperName;
});

domainssSchema.virtual('url').get(function(){
	return '/catalog/domain/' + this._id;
});

module.exports = mongoose.model('DomainModel', domainssSchema);