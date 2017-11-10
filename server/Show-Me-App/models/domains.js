var mongoose = require('mongoose');
var PaperModel = require('./papers.js');
var Schema = mongoose.Schema;

var domainssSchema = new Schema({
	name : {type: String, required: true, max:100},
	papers : [{type: Schema.Type.ObjectId, ref:'PaperModel'}]
});

papersSchema.virtual('name').get(function(){
	return this.name;
});

papersSchema.virtual('url').get(function(){
	return '/catalog/domain/' + this.id;
});

module.exports = mongoose.model('DomainModel', domainssSchema);