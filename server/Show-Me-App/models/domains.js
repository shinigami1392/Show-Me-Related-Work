var mongoose = require('mongoose');
var PaperModel = require('./papers.js');
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
		reference: [String],
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