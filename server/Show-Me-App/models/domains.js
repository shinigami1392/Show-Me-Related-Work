var mongoose = require('mongoose');
var PaperModel = require('./papers.js');
var Schema = mongoose.Schema;

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